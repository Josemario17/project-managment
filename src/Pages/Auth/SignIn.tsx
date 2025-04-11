
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
import { toast } from "sonner";
import { Input } from "../../components/ui/input";
import FormLayout from "../../components/layouts/FormLayout";
import { Link } from "react-router-dom";
import { FormSchemaSignIn } from "./utils/validations";

export function InputForm() {
    const form = useForm<z.infer<typeof FormSchemaSignIn>>({
        resolver: zodResolver(FormSchemaSignIn),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchemaSignIn>) {
        toast(`Entrada com Sucesso!`)
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
                                <Input className="h-10" type="email" placeholder="example@mail.com" {...field} />
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
                                <Input className="h-10" type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-700" />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-white text-black w-full" size={"lg"}>Entrar</Button>
            </form>
        </Form>
    )
}

export const FormTitle = ({text}: {text: string}) => {
    return (
        <h1 className="w-2/3 text-3xl font-bold text-center text-white">{text}</h1>
    )
}

export const FormDescription = ({text}: {text: string}) => {
    return (
        <p className="w-2/3 text-center text-sm text-gray-500">{text}</p>
    )
}

export const FormLink = ({text, link, GoToText}: {text: string, link: string, GoToText: string}) => {
    return (
        <p className="text-sm text-gray-500">{text} <Link to={link} className="text-blue-100 hover:underline">{GoToText}</Link></p>
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
