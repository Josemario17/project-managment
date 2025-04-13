
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form"
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import FormLayout from "../../components/layouts/FormLayout";
import { Link, useNavigate } from "react-router-dom";
import { FormSchemaSignIn } from "./utils/validations";
import { getDataOfUser, LoginWithGoogle, signInUser } from "./utils/auth";
import { toast } from "sonner";
import { useState } from "react";
import Cookies from 'js-cookie'
import { handleSuccess } from "./SignUp";
import Spin from "../../components/Common/Spin";
import GoogleButton from "../../components/Common/GoogleButton";
import { useUserStore } from "../../store/UserStore";

export function InputForm() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof FormSchemaSignIn>>({
        resolver: zodResolver(FormSchemaSignIn),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function authenticateUser(data: z.infer<typeof FormSchemaSignIn>) {
        const token = await signInUser(data);
        if (!token) throw new Error("Authentication failed");
        return token;
    }

    async function fetchUserData(token: string) {
        const user = await getDataOfUser(token);
        if (!user) throw new Error("Failed to fetch user data");
        return {user};
    }

    function persistUser(userData: any) {
        if(!userData) return;
        Cookies.set("user_data", JSON.stringify(userData), { expires: 7 });
        useUserStore.getState().setUserData(userData.user);
    }

    function successHandler() {
        toast.success("Login realizado com sucesso");
        handleSuccess(navigate, "/Dashboard");
    }

    function handleError(error: any) {
        toast.error("Falha no login");
        console.log(error);
    }

    const onSubmit = async (data: z.infer<typeof FormSchemaSignIn>) => {
        try {
            setLoading(true);
            const token = await authenticateUser(data);
            const user = await fetchUserData(token);
            persistUser(user);
            successHandler();
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const GoogleSubmit = async () => {
        try {
            setLoading(true);
            const token = await LoginWithGoogle();
            const user = await fetchUserData(token);
            persistUser(user);
            successHandler();
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 mb-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="example@mail.com" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-700" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-700" />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-blue-950 text-white w-full h-12" size={"lg"}>{
                    loading ? <Spin /> : "Entrar"
                }</Button>
                <GoogleButton handleExecute={GoogleSubmit} Text="Login com Google" />
            </form>
        </Form>
    )
}

export const FormTitle = ({ text }: { text: string }) => {
    return (
        <h1 className="w-2/3 text-3xl font-bold text-center">{text}</h1>
    )
}

export const FormDescription = ({ text }: { text: string }) => {
    return (
        <p className="w-2/3 text-center text-sm mb-6">{text}</p>
    )
}

export const FormLink = ({ text, link, GoToText }: { text: string, link: string, GoToText: string }) => {
    return (
        <p className="text-sm text-gray-500 mt-4">{text} <Link to={link} className="text-blue-800 hover:underline">{GoToText}</Link></p>
    )
}

export default function SignIn() {
    return (
        <FormLayout>
            <FormTitle text="Inicie a Sessão"></FormTitle>
            <FormDescription text="Entre com sua conta"></FormDescription>
            <InputForm></InputForm>
            <FormLink text="Não tem uma conta?" link="/signup" GoToText="Criar Conta"></FormLink>
        </FormLayout>
    )
}
