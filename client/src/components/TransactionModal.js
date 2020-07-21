import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement("#root");

export default function TransactionModal({modalOpen, transaction, handleSaveTransaction, closeModal}){
    const title = transaction === undefined || transaction === null ? "Adicionar lançamento" : "Editar lançamento";
    let description, category, value, yearMonthDay, type = "";
    if(transaction !== undefined && transaction !== null){
        ({description, category, value, yearMonthDay, type} = transaction);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        let formData = new FormData(e.target);
        if(transaction !== undefined && transaction !== null){
            formData.append("type", transaction.type);
            formData.append("id", transaction._id);
        }

        let newTransaction = {};
        formData.forEach((value, key) => {
            let objKey = key;
            if(key === "transactionType"){
                objKey = "type";
            }

            newTransaction[objKey] = value;
        })
        
        handleSaveTransaction(newTransaction);
    }

    return (
        <Modal isOpen={modalOpen} style={styles}>
            <div className="modal-container" >
                <div className="row">
                    <div className="col l11">
                        <h5 style={styles.modalTitle}>{title}</h5>
                    </div>
                    <div className="col l1">
                        <button className="btn-small red wave-effect wave-light lighten-1" onClick={closeModal}>
                            <i className="material-icons">close</i>
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col offset-l3 l3">
                            <label className="label-despesa">
                                <input type="radio" name="transactionType" value="-" defaultChecked={type === "-" || type === ""} disabled={transaction !== null && transaction !== undefined}/>
                                <span>Despesa</span>
                            </label>
                        </div>
                        <div className="col l3">
                            <label className="label-receita">
                                <input type="radio" name="transactionType" value="+" defaultChecked={type === "+"} disabled={transaction !== null && transaction !== undefined} />
                                <span>Receita</span>
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col l10 offset-l1 input-field">
                            <input type="text" placeholder="" name="description" defaultValue={description} required={true} />
                            <label className="active">Descrição</label>
                        </div>
                        <div className="col l10 offset-l1 input-field">
                            <input type="text" placeholder="" name="category" defaultValue={category} required={true} />
                            <label className="active">Categoria</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col l5 offset-l1 input-field">
                            <input type="number" min="0" name="value" defaultValue={value} required={true} />
                            <label className="active">Valor</label>
                        </div>
                        <div className="col l5 input-field">
                            <input type="date" name="yearMonthDay" defaultValue={yearMonthDay} required={true} />
                            <label className="active">Data</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col l1">
                            <button className="waves-effect waves-light btn">
                                Salvar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

const styles = {
    "overlay": {
        "display": "flex",
        "justifyContent": "center",
        "flexDirection": "row",
        "alignItems": "center"
    },
    "content": {
        "position": "relative",
        "flexBasis": "30%",
        "inset": "unset"
    },
    "modalTitle": {
        "marginTop": "0"
    }
}