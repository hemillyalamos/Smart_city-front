import React from 'react';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import estilos from './CriarUsuario.module.css';
import fundo from '../assets/Vector 2.png';
import robo from '../assets/roboSenai.png';
import logo from '../assets/Logo.png';

const schemaCadastro = z.object({
    usuario: z.string().min(5, 'Mínimo de 5 caracteres').max(20, 'Máximo de 20 caracteres'),
    senha: z.string().min(8, 'Mínimo de 8 caracteres').max(8, 'Máximo de 8 caracteres'),
    email: z.string().email('E-mail inválido'),

});

export function Cadastro() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaCadastro)
    });

    async function obterDadosFormulario(data) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/create_user', {
                username: data.usuario,
                email: data.email,
                password: data.senha
                
                
            });

            console.log('Cadastro bem-sucedido!');
            navigate('/'); // Redireciona para a tela de login após o cadastro
        } catch (error) {
            console.error('Erro ao cadastrar usuário', error);
        }
    }

    return (
        <div className={estilos.container} style={{ position: 'relative' }}>
            <img className={estilos.fundo} src={fundo}  style={{ position: 'absolute', zIndex: '-1' }}/>
            <img className={estilos.robo} src={robo} style={{ position: 'absolute', zIndex: '-1' }} />
            <img className={estilos.logo} src={logo}  />

            <form className={estilos.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
                <p className={estilos.titulo}>Cadastro</p>
                <input
                    {...register('usuario')}
                    className={estilos.campo}
                    placeholder="Usuário"
                />
                {errors.usuario && (
                    <p className={estilos.mensagem}>{errors.usuario.message}</p>
                )}
                <input
                    {...register('email')}
                    className={estilos.campo}
                    placeholder="E-mail"
                />
                {errors.email && (
                    <p className={estilos.mensagem}>{errors.email.message}</p>
                )}
                <input
                    {...register('senha')}
                    type="password"
                    className={estilos.campo}
                    placeholder="Senha"
                />
                {errors.senha && (
                    <p className={estilos.mensagem}>{errors.senha.message}</p>
                )}

                
                <button className={estilos.botao}>Cadastrar</button>
            </form>
        </div>
    );
}