
import { get, getDatabase, ref, set } from "firebase/database";
import { db } from "../Config/conection";
import { projectType } from "../lib/types";

export const addProjectInServer = (data: projectType) =>{
  const db = getDatabase();
  try {
    set(ref(db, 'projects/' + data.id), {
      id: data.id,
      title: data.title,
      description: data.description,
      host: data.host,
      members: data.members,
      startedAt: data.startedAt,
      endedAt: data.endedAt,
      status: data.status,
      taskList: data?.taskList || []  
    })
  }
    catch (error) {
        throw new Error("Error while adding project in server")
    }
}

export const getProjectsInDb = async (projectId?: string) => {
    const useRef = ref(db, `projects/${projectId || ""}`)
    const snapshot = await get(useRef)
    const data = snapshot.val()
    return data
}
