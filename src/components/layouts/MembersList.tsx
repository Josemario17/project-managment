import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetProjects } from '../../hooks/getProjects'
import { X } from 'lucide-react'
import Spin from '../Common/Spin'
import { addProjectInServer } from '../../api/Projects'
import { projectType, User } from '../../lib/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useUserStore } from '../../store/UserStore'
import { getUsers } from '../../api/users'

interface Member {
  id: string
  name?: string
}

interface Project extends projectType {
  members: Member[]
}

interface MemberButtonProps {
  member: Member
  onRemove: (member: Member) => void
  variant?: string;
}

interface MembersListProps {
  members: Member[]
  onRemoveMember: (member: Member) => void
}

interface HeaderProps {
  onAddMember: (memberId: string) => void
  availableMembers: Member[]
  title?: boolean
}

interface MemberManagerProps {
  project: Project
  onUpdate: (updatedMembers: Member[]) => void
  availableMembers: Member[]
  setAvailableMembers: (members: Member[]) => void
  
}

export const MemberButton = ({ member, onRemove, variant }: MemberButtonProps) => (
  <button
    type="button"
    onClick={() => onRemove(member)}
    className={`${variant ? 'min-w-12' : 'min-w-44'} h-12 rounded-full bg-blue-950 text-white flex items-center justify-around hover:bg-blue-900 transition-colors`}
  >
    <span className="text-sm">{member.name}</span>
    <X />
  </button>
)

export const MembersList = ({ members, onRemoveMember }: MembersListProps) => (
  <ul className='flex gap-2 border border-gray-200 p-4 rounded-lg bg-white'>
    {members.length > 0 ? members?.map(member => (
      <MemberButton
        key={member.id}
        member={member}
        onRemove={onRemoveMember}
      />
    )) : <li className='text-center text-sm'>Sem Membros, além de você.</li>}
  </ul>
)

export const Header = ({ onAddMember, availableMembers, title }: HeaderProps) => (
  <div className="flex items-center justify-between w-full mb-2">
    {!title && <h2 className="text-lg font-semibold px-2">Membros</h2>}
    <Select onValueChange={onAddMember}>
      <SelectTrigger className={title ? 'w-44' : 'w-[200px]'}>
        <SelectValue placeholder="Adicionar Membro" />
      </SelectTrigger>
      <SelectContent className="w-full bg-white">
        {availableMembers?.map((member) => (
          <SelectItem key={member.id} value={member.id}>
            {member.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)

const LoadingState = () => (
  <div className="flex justify-center items-center p-4">
    <Spin color='text-blue-950' />
  </div>
)

const useMemberManager = ({ project, onUpdate, availableMembers, setAvailableMembers }: MemberManagerProps) => {
  const handleRemoveMember = async (member: Member) => {
    try {
      const updatedMembers = project.members.filter(m => m.id !== member.id)
      onUpdate(updatedMembers)
      addProjectInServer({
        ...project,
        members: updatedMembers
      })
    } catch (error) {
      console.error('Erro ao remover membro:', error)
      onUpdate(project.members)
    }
  }

  const handleAddMember = async (memberId: string) => {
    try {
      const selectedUser = availableMembers.find(member => member.id === memberId)
      
      if (selectedUser) {
        const newMember = { 
          id: selectedUser.id, 
          name: selectedUser.name 
        }
        
        const memberExists = project.members.some(member => member.id === selectedUser.id)
        if (!memberExists) {
          const updatedProject = {
            ...project,
            members: [...project.members, newMember]
          }
          addProjectInServer(updatedProject)
          onUpdate(updatedProject.members)
          const updatedAvailableMembers = availableMembers.filter(member => member.id !== selectedUser.id)
          setAvailableMembers(updatedAvailableMembers)
        }
      }
    } catch (error) {
      console.error('Erro ao adicionar membro:', error)
    }
  }

  return { handleRemoveMember, handleAddMember }
}

const useProjectData = (projectId: string | undefined) => {
  const { projectData, loading } = GetProjects(projectId)
  const [members, setMembers] = useState<Member[]>([])
  const [availableMembers, setAvailableMembers] = useState<Member[]>([])
  const uniqueItem = 0
  const myId = useUserStore.getState().userData

  useEffect(() => {
    if (projectData[uniqueItem]?.members) {
      const uniqueMembers = projectData[uniqueItem].members.reduce((exist: Member[], current: Member) => {
        const exists = exist.find(member => member.id === current.id)
        if (!exists) {
          exist.push(current)
        }
        return exist
      }, [])
      setMembers(uniqueMembers)
    }
  }, [projectData])

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers()
      if (users) {
        const allUsers = Object.values(users) as User[]
        const filteredUsers = allUsers.filter(user => 
          user.id !== myId?.id && 
          !members.some(member => member.id === user.id)
        )
        setAvailableMembers(filteredUsers)
      }
    }
    fetchUsers()
  }, [members, myId?.id])

  return {
    members,
    setMembers,
    loading,
    project: projectData[uniqueItem] as Project,
    availableMembers,
    setAvailableMembers
  }
}

export default function MembersListContainer() {
  const { id } = useParams<string>()
  const { members, setMembers, loading, project, availableMembers, setAvailableMembers } = useProjectData(id)
  
  const { handleRemoveMember, handleAddMember } = useMemberManager({
    project,
    onUpdate: setMembers,
    availableMembers,
    setAvailableMembers
  })

  return (
    <div className='rounded-lg bg-white'>
      <Header onAddMember={handleAddMember} availableMembers={availableMembers} />
      {loading ? (
        <LoadingState />
      ) : (
        <MembersList
          members={members}
          onRemoveMember={handleRemoveMember}
        />
      )}
    </div>
  )
}
