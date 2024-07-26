import estilos from './Cabecalho.module.css'
import logo from '../assets/Logo.png'


export function Cabecalho(){
    return(
        <header className={estilos.conteiner}>
            <img className={estilos.log} src={logo}></img>            
                        
        </header>
    )
}
