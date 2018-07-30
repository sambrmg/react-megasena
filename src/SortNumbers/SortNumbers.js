import React, { Component } from 'react';

const _verificarAcerto = (i, numeros) => {
    if( numeros.indexOf(i) !== -1 ){
        return 'acerto'
    }
    return ''
}
export default class SortNumbers extends Component{
    constructor(props) {
        super(props);
        this.state = {
            numeros: [],
            jogados: [1,2,3,4,5,6]
        }
    }
    componentWillMount(){
        const _self = this;

        var maxInterval = 6;

        function getRandomArbitrary(min, max) {
            return parseInt(Math.random() * ((max+1) - min) + min);
        }

        var interval = setInterval(function(){
            let numRandom = getRandomArbitrary(1, 60);
            if( _self.state.numeros.indexOf( numRandom ) === -1 ){
                _self.setState({
                    numeros: [..._self.state.numeros, numRandom]
                });
                if( maxInterval === 1 ){
                    clearInterval(interval)
                }else{
                    maxInterval--;
                }
            }
        }, 1000);
        
    }
    render(props){
        const _self = this;

        return (
            <div className="megasena">
                <p>Meus jogos</p>
                <ul>
                    {_self.state.jogados.sort((a, b) => a > b).map(i => {
                        return (<li key={i} className={`${ _verificarAcerto(i, _self.state.numeros) }`}>{i}</li>)
                    })}
                </ul>
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