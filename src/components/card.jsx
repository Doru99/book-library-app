import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

function Card(props) {
    const { title, desc, rating1, rating2, onLike, onNeutral, onDislike, onBookDelete, onChange} = props;
    var isOpen = false;
    function onTriggerLike(e) {
        onLike({title});
    }

    function onTriggerNeutral(e) {
        onNeutral({title});
    }

    function onTriggerDislike(e) {
        onDislike({title});
    }

    function onTriggerDelete(e) {
        onBookDelete({title});
    }

    function onSubmit(e) {
        console.log("Modifica");
    }

    function onTriggerChange(e) {
        console.log("Modifica");
    }
    return(
        <React.Fragment>
            <div className="card text-white bg-primary mx-4 my-1 p-4" style={{maxWidth: '20rem', display:'inline-block'}}>
                <div className="card-header">
                    <button type="button" onClick={onTriggerDelete} className="btn btn-danger p-1"><i className="fa fa-times" aria-hidden="true"></i></button>
                    <button type="button" onClick={() => {isOpen=true;}} className="btn btn-info p-1 mx-1"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                </div>
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text">{desc}</p>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" onClick={onTriggerLike} className={"btn btn-success" + ((rating1 === '1') ? "" : " disabled")}><i className="fa fa-thumbs-up"></i></button>
                        <button type="button" onClick={onTriggerNeutral} className={"btn btn-warning" + ((rating1 === '0') ? "" : " disabled")}><i className="fa fa-minus"></i></button>
                        <button type="button" onClick={onTriggerDislike} className={"btn btn-danger" + ((rating1 === '-1') ? "" : " disabled")}><i className="fa fa-thumbs-down"></i></button>
                    </div>
                </div>
            </div>
            <Modal show={isOpen} onHide={() => {isOpen=false;}}>
                <form onSubmit={onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Edit Book
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <fieldset>
                            <label htmlFor="title">Title:</label>
                            <input type="text" className="form-control" onChange={onTriggerChange} id="title" />
                            <label htmlFor="description">Description:</label>
                            <input type="text" className="form-control" onChange={onTriggerChange} id="description" />
                        </fieldset>
                    </Modal.Body>
                    <Modal.Footer>
                    <button type="submit" className="btn btn-primary" onClick={() => {isOpen=false;}}>Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => {isOpen=false;}}>Close</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </React.Fragment>
    )
}

export default Card;