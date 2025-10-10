import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Inputs = {
    nome: string
    email: string
    senha: string
    senha2: string
}

const apiUrl = import.meta.env.VITE_API_URL

export default function CadPaciente() {
    const { register, handleSubmit } = useForm<Inputs>()

    async function cadastraPaciente(data: Inputs) {

        if (data.senha != data.senha2) {
            toast.error("Erro... Senha e Confirme Senha precisam ser iguais")
            return
        }

        const response = await
            fetch(`${apiUrl}/pacientes`, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({
                    nome: data.nome,
                    email: data.email,
                    senha: data.senha
                })
            })

        console.log(response)
        if (response.status == 201) {
            toast.success("Ok! Cadastro realizado com sucesso...")
        } else {
            toast.error("Erro... Não foi possível realizar o cadastro")
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Cadastro de paciente
                        </h1>
                        <form className="space-y-4 md:space-y-6" 
                          onSubmit={handleSubmit(cadastraPaciente)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome:</label>
                                <input type="text" id="nome" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Seu nome completo" required 
                                    {...register("nome")} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail:</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nome@gmail.com" required 
                                    {...register("email")} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha de Acesso:</label>
                                <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
                                      {...register("senha")} />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirme a Senha:</label>
                                <input type="password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
                                      {...register("senha2")} />
                            </div>
                            <button type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-400 dark:hover:bg-amber-500 dark:focus:ring-amber-800">Criar sua Conta</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}