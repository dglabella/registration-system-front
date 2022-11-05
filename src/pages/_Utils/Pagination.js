import React, { useState, useContext } from 'react';
import { Pagination, Button, ButtonGroup, Form } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faAngleDoubleLeft, faAngleDoubleRight, faAngleRight,faAngleLeft, faArrowAltCircleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { faGofore } from '@fortawesome/free-brands-svg-icons';

const CristianPagination = (props) => {
    const pageSize=10;
    const { totalResults=0, totalPages=2, size = "md", findPersonal, activePage } = props;

    const onPrevItem = () => {
        /*
            Si es posible retroceder
                setActualPage--
                Buscar(actualPage)
        */
        if(activePage>0){
            findPersonal({size:pageSize, page:(activePage-1) });
        }
    };

    const onNextItem = (totalPages) => {
        /*
            Si es posible retroceder
                setActualPage++
                Buscar(actualPage)
        */
        if(activePage<totalPages){
            findPersonal({size:pageSize, page:(activePage+1) });
        }
    };

    return (
        <div className="btn-toolbar justify-content-center d-lg-flex  flex-wrap flex-md-nowrap  ">
            <Pagination size={size} className="mt-0">

                <Pagination.Prev className=" me-1 ms-4 mt-1 button-small-font" onClick={onPrevItem} >
                    <FontAwesomeIcon icon={faAngleDoubleLeft} /> <span> Anterior </span> 
                </Pagination.Prev>

                <Form.Control className="w-25 button-small-font" type="text" id="numberPage" name="numberPage" disabled={true}  value={`Pagina: ${activePage}`} />
                <Button className="m-1 button-small-font" variant="primary" size="sm" onClick={() => { }}>
                    <FontAwesomeIcon variant="primary" icon={faArrowRight} />
                </Button>

                <Pagination.Next className="ms-1 me-4 mt-1 button-small-font" variant="primary" onClick={() => onNextItem(totalPages)}>
                    <span> Siguiente </span> <FontAwesomeIcon  icon={faAngleDoubleRight} />
                </Pagination.Next>
            </Pagination>
        </div>
    );

    /* 
        <div className="btn-toolbar justify-content-center d-lg-flex  flex-wrap flex-md-nowrap  ">

            <Row className='align-items-center mt-2 mb-2'>
                <Col>
                    <Button className="mx-4 mt-1 button-small-font" size="sm" disabled={disablePrev} onClick={onPrevItem} >
                        <FontAwesomeIcon icon={faAngleDoubleLeft} /> <span> Anterior </span>
                    </Button>
                </Col>
                <Col>
                    <div className="btn-toolbar justify-content-center d-lg-flex  flex-wrap flex-md-nowrap  ">
                        <Form.Control className="" type="text" id="numberPage" name="numberPage" />
                        <Button className="m-1" variant="primary" size="sm" onClick={() => { }}>
                            <FontAwesomeIcon variant="primary" icon={faArrowRight} />
                        </Button>
                    </div>
                </Col>
                <Col>
                    <Button className="mx-4 mt-1 button-small-font" size="sm" variant="primary" onClick={() => onNextItem(totalPages)}>
                        <span> Siguiente </span> <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </Button>
                </Col>
            </Row>    
 
        </div>
    */

    /*const [items, setItems]=useState([]);
    const getLetters=()=>{
        let letters=[];
        for(let i = 'A'.charCodeAt(); i <= 'Z'.charCodeAt(); i++){
            letters=[...letters, String.fromCharCode(i)];
        }  
        return(letters);
    }

    useEffect(()=>{
        setItems(getLetters());
    },[]);
    
    return(
        <ButtonGroup>
            {items.map((i)=>(
                <Button variant="outline-primary"  className="very-small-font" size="sm">{i}</Button>
            ))}
        </ButtonGroup>
    );*/
}

export default CristianPagination;