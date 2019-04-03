import swal  from 'sweetalert2';

export class MessageAlertsService {

    static customMessage(titulo: string, msg: string, tipoMessage: String){
        switch (tipoMessage) {
            case 'success':
                this.sucessMessage(titulo, msg);
            break;
            case 'warning':
                this.warningMessage(titulo, msg);
            break;
            case 'error':
                this.errorMessage(titulo, msg); 
            break;
            case 'info':
                this.infoMessage(titulo, msg); 
            break;
            default:
                swal({
                    type: 'error',
                    title: 'Tipo de Mensagem Inválido',
                    text: 'Erro de Aplicação no envio da requisição, contate o suporte!',
                })
            break;
        } 
    }

    static errorMessage(titulo: string, msgErro: string){
        swal({
            type: 'error',
            title: titulo,
            text: msgErro,
        })
    }

    static sucessMessage(titulo: string, msgSuccess: string){
        swal({
            type: 'success',
            title: titulo,
            text: msgSuccess,
        })
    }

    static warningMessage(titulo: string, msgWarning: string){
        swal({
            type: 'warning',
            title: titulo,
            text: msgWarning,
        })
    }

    static infoMessage(titulo: string, msgInfo: string){
        swal({
            type: 'info',
            title: titulo,
            text: msgInfo,
        })
    }
}