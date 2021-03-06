import React, { Component } from 'react';

const _verificarAcerto = (i, numeros) => {
    if( numeros.indexOf(i) !== -1 ){
        return true
    }
    return false
}
export default class SortNumbers extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sorteioIniciado: false,
            valores: [],
            numeros: [],
            jogos: [ 
                [1,2,3,4,5,6], 
                [7,8,9,10,11,12],
                [7,18,24,32,44,56] ]
        }
        // this.handleChange = this.handleChange.bind(this);
        this.handleClickRegistrar = this.handleClickRegistrar.bind(this);
        this.handleIniciarSorteio = this.handleIniciarSorteio.bind(this);
    }
    handleIniciarSorteio(){
        if(this.state.sorteioIniciado) return;

        const _self = this;
        _self.setState({sorteioIniciado: true});

        _self.state.numeros = [];
        var maxInterval = 6;

        function getRandomArbitrary(min, max) {
            return parseInt(Math.random() * ((max+1) - min) + min);
        }
        // @todo retornar valor sem precisar de 1000 ms
        var interval = setInterval(function(){
            let numRandom = getRandomArbitrary(1, 60);
            if( _self.state.numeros.indexOf( numRandom ) === -1 ){
                _self.setState({
                    numeros: [..._self.state.numeros, numRandom]
                });
                if( maxInterval === 1 ){
                    clearInterval(interval);
                    _self.setState({sorteioIniciado: false});

                }else{
                    maxInterval--;
                }
            }
        }, 1000);
        
    }
    
    handleClickRegistrar(){
        if(this.state.sorteioIniciado) return;

        this.setState({jogos: [...this.state.jogos, [
            this.state.valores.p1,
            this.state.valores.p2,
            this.state.valores.p3,
            this.state.valores.p4,
            this.state.valores.p5,
            this.state.valores.p6] ] });
    }
    handleChange(propertyName, event) {
        const valores = this.state.valores;
        valores[propertyName] = parseInt(event.target.value);
        this.setState({ valores: valores });
    }
    render(props){
        const _self = this;

        return (
            <div className="megasena">
                <div className="fm-column">
                    <div>
                        <input maxLength="2" onChange={this.handleChange.bind(this, 'p1')}/>
                        <input maxLength="2" onChange={this.handleChange.bind(this, 'p2')}/>
                        <input maxLength="2" onChange={this.handleChange.bind(this, 'p3')}/>
                        <input maxLength="2" onChange={this.handleChange.bind(this, 'p4')}/>
                        <input maxLength="2" onChange={this.handleChange.bind(this, 'p5')}/>
                        <input maxLength="2" onChange={this.handleChange.bind(this, 'p6')}/>
                    </div>
                    <div>
                        <button onClick={this.handleClickRegistrar} className={this.state.sorteioIniciado ? 'disabled' : ''}>Registrar</button>
                    </div>
                    <div>
                        <button onClick={this.handleIniciarSorteio} className={this.state.sorteioIniciado ? 'disabled' : ''}>Iniciar Sorteio</button>
                    </div>
                </div>
                <p>Meus jogos</p>
                {_self.state.jogos.map( (el) => {
                    return(
                    <ul key={el}>
                        {el.map(elm => {
                            return (<li key={elm} className={`${ _verificarAcerto(elm, _self.state.numeros)? 'acerto': '' }`}>{elm}</li>)
                        })}
                    </ul>)
                })}
                
                <p>Sorteio</p>
                <ul>
                    {_self.state.numeros.sort((a, b) => a > b).map(i => {
                        return (<li key={i}>{i}</li>)
                    })}
                </ul>
            </div>
        )
    }
}