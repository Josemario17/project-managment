import { onValue, ref, set } from "firebase/database";
import { db } from "../Config/conection";
import { v4 as uuid4 } from 'uuid'
import { TaskData } from "../lib/types";

export const addTaskList = (projectId: string, title: string) => {
    const idGenerated = uuid4()
    try {
        set(ref(db, 'projects/' + projectId + '/taskList/' + idGenerated), {
            id: idGenerated,
            title,
            tasks: []
        })
        return idGenerated
    }
    catch (error) {
        throw new Error("Error while adding project in server")
    }
}

export const addTask = (projectId: string, taskListId: string, data: TaskData) => {
    try {
        set(ref(db, 'projects/' + projectId + '/taskList/' + taskListId + '/tasks/' + data.id), {
            id: data.id,
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            comments: [],
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            endedAt: data.endedAt,
        })
    }
    catch (error) {
        throw new Error("Error while adding project in server")
    }
}

export const updateTask = async (projectId: string, taskListId: string, taskId: string, data: TaskData) => {
    try {
       await set(ref(db, 'projects/' + projectId + '/taskList/' + taskListId + '/tasks/' + taskId), {
            id: taskId,
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            comments: data.comments || [],
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            endedAt: data.endedAt,
            members: data.members || [],
        })
    }
    catch (error) {
        console.log(error)
        throw new Error("Error while updating task in server")
    }
}

export const removeTask = async (projectId: string, taskListId: string, taskId: string)=>{
    try{
        await set(ref(db, `projects/${projectId}/taskList/${taskListId}/tasks/${taskId}`), null);
    }
    catch (error) {
        console.log(error)
        throw new Error("Error while removing task in server")
    }
}

export const GetTaskListInDb = async (projectId: string) => {
    const starCountRef = ref(db, `projects/${projectId}/taskList`);
    let data
    onValue(starCountRef, (snapshot) => {
        data = snapshot.val();
    });
    return data
}


export const getTasksInDb = async (projectId: string, taskListId: string, taskId?: string) => {
    const starCountRef = ref(db, `projects/${projectId}/taskList/${taskListId}/tasks${taskId ? `/${taskId}` : ''}`);
    let data
    onValue(starCountRef, (snapshot) => {
        data = snapshot.val();
    });
    return data
}
