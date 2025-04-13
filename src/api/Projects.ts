
import { get, getDatabase, ref, set } from "firebase/database";
import { v4 as uuid4 } from 'uuid'
import { db } from "../Config/conection";
import { projectType } from "../lib/types";

export const addProjectInServer = (data: projectType) =>{
  const db = getDatabase();
  const idGenerated = uuid4()
  try {
    set(ref(db, 'projects/' + idGenerated), {
      id: idGenerated,
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

export const getProjectsInDb = async (projectId?: string) => {
    const useRef = ref(db, `projects/${projectId || ""}`)
    const snapshot = await get(useRef)
    const data = snapshot.val()
    return data
}
