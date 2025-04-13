
import { get, getDatabase, ref, set } from "firebase/database";
import { v4 as uuid4 } from 'uuid'
import { db } from "../Config/conection";

export interface ProjectData {
    title: string;
    description: string;
    host: string | {};
    members: any[]; 
    startedAt: string;
    endedAt: string;
    status: 'in_progress' | 'completed' | 'delayed';
}

export const addProjectInServer = (data: ProjectData) =>{
  const db = getDatabase();
  try {
    set(ref(db, 'projects/' + uuid4()), {
      id: uuid4(),
      title: data.title,
      description: data.description,
      host: data.host,
      members: data.members,
      startedAt: data.startedAt,
      endedAt: data.endedAt,
      status: data.status
    })
  }
    catch (error) {
        throw new Error("Error while adding project in server")
    }
}

export const getProjects = async (projectId?: string) => {
    const useRef = ref(db, `projects/${projectId || ""}`)
    const snapshot = await get(useRef)
    return snapshot.val()
}