import { useEffect, useState } from "react"
import { getProjectsInDb } from "../api/Projects"
import { projectType, TaskData } from "../lib/types"
import { GetTaskListInDb, getTasksInDb } from "../api/tasks"
import { useUserStore } from "../store/UserStore"

export const GetProjects = (ProjectId?: string) => {
    const myID = useUserStore.getState().userData
    const [projectData, setProjectData] = useState<projectType[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getProjectsfunc = async () => {
            setLoading(true)
            const Data = await getProjectsInDb(ProjectId);
            if(Data !== undefined && Data !== null && Object.keys(Data).length > 0){
                const filteredProjects = Object.values(Data).filter((project: any) => 
                    project?.host?.id === myID?.id || 
                    (project?.members && Array.isArray(project.members) && 
                     project.members.some((member: any) => member?.id === myID?.id))
                );
                setProjectData(ProjectId ? [Data] : filteredProjects || []);
            }
            setLoading(false)
        }
        getProjectsfunc()
    }, [])
    
    return { projectData, loading }
}

export const GetTaskList = (projectId: string) => {
    const [loading, setLoading] = useState(false)
    const [taskListData, setTaskListData] = useState<any[]>([])
    
    useEffect(()=>{
        const getTasksFunc = async ()=>{
            setLoading(true)
            const Data = await GetTaskListInDb(projectId)
            if(Data !== undefined && Data !== null){
                setTaskListData(Object.values(Data) || []);
            }
            setLoading(false)
        }
        getTasksFunc();
    }, [projectId])

    return {loading, taskListData}
}

export const GetTaskInner = ( projectId: string, taskListId: string, taskId?: string) => {
    const [loading, setLoading] = useState(false)
    const [taskData, setTaskData] = useState<TaskData[]>([])
    
    useEffect(()=>{
        const getTasksFunc = async ()=>{
            setLoading(true)
            const Data = await getTasksInDb(projectId, taskListId, taskId)
            if(Data !== undefined && Data !== null){
                setTaskData(taskId ? [Data] : Object.values(Data) || []);
            }
            setLoading(false)
        }
        getTasksFunc();
    }, [taskListId, projectId, taskId])
    return {loading, taskData}
}