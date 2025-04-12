
import FormLayout from '../../components/layouts/FormLayout'
import { FormDescription, FormLink, FormTitle } from './SignIn'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { FormSchemaSignUp } from './utils/validations'
import { useState } from 'react'
import Spin from '../../components/Common/Spin'
import { CreatUser } from './utils/create'
import { useNavigate } from 'react-router-dom'


export function handleSuccess(navigate: ReturnType<typeof useNavigate>, url: string) {
    navigate(url); 
}

export function InputForm() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate(); 
    const form = useForm<z.infer<typeof FormSchemaSignUp>>({
        resolver: zodResolver(FormSchemaSignUp),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const SendToServer = async ({data}: {data: z.infer<typeof FormSchemaSignUp>}) => {
        const result = await CreatUser(data)
        if (result) {
            toast.success("Conta criada com sucesso!")
            handleSuccess(navigate,"/")
        }
        else {
            toast.error("Erro ao criar conta.")
        }
    }

    function onSubmit(data: z.infer<typeof FormSchemaSignUp>) {
        setLoading(true)
        SendToServer({data})
        setLoading(false)
        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 mb-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Seu nome" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-700" />
                        </FormItem>
                    )}
                />
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
                <Button type="submit" className="bg-blue-950 text-white w-full h-12" size={"lg"}>
                    {loading ? <Spin /> : "Criar Conta"}
                </Button>
            </form>
        </Form>
    )
}

export default function SignUp() {
    return (
        <FormLayout>
            <FormTitle text='Criar uma Conta'></FormTitle>
            <FormDescription text='Começe com uma nova conta'></FormDescription>
            <InputForm></InputForm>
            <FormLink text='Já tem uma conta?' link='/' GoToText='Entrar'></FormLink>
        </FormLayout>
    )
}
