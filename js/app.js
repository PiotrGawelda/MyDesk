import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './../scss/style.scss';
import './../css/animate.css';

import {
    HashRouter,
    Route,
    Link,
    Switch,
} from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <>
                <Section/>
            </>
        );
    }
}

class Header extends Component {
    render(){
        return(
            <header>
                <div className="row container menu">
                    <div className="header-box col-2">
                        <Link to ="/"><i className="fas fa-pen-fancy fa-4x"></i></Link>
                    </div>
                    <div className="header-box col-2">
                        <Link to="/"><h1>MyDesk</h1></Link>
                    </div>
                    <div className="header-box col-8">
                        <ul className="animated pulse">
                            <li><Link to="/quotes">Cytaty<i className="fas fa-quote-right"></i></Link></li>
                            <li><Link to="/calendar">Kalendarz<i className="far fa-calendar-alt"></i></Link></li>
                            <li><Link to="/notes">Notatki<i className="far fa-sticky-note"></i></Link></li>
                            <li><Link to="/calculator">Kalkulator<i className="fas fa-calculator"></i></Link></li>
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}

class Section extends Component{
    render(){
        return(
            <section>
                <div className="row container">
                    <div className="col-12">
                        <aside className="section-box ">
                            <i>Witaj w MyDesk!</i>
                            <p className="desk-text">Rozgość się jak u siebie na biurku☺</p>
                            <img src="../assets/section-image.jpg"/>
                        </aside>
                    </div>
                </div>
            </section>
        )
    }
}

class Footer extends Component{
    render(){
        return(
            <footer>
                <div className="row container">
                    <div className="col-12">
                        <div className="footer-box">
                            <p>Created by Piotr Gawełda</p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

class Quotes extends Component{
        state = {
            value: ""
    };

    componentWillMount() {

        fetch('https://api.chucknorris.io/jokes/random',{
            method: "GET"
        })  .then(res => res.json())
            .then(res => this.setState({value: res.value}))
    }

    render(){
        return(
            <section>
                <div className="quotes-section">
                    <img src="../assets/light-buld-section.jpg"/>
                    <div className="quotes-box animated bounceIn">
                        <p className="animated bounceIn">{this.state.value}</p>
                    </div>
                </div>
            </section>
        )
    }
}

class Calendar extends Component{
    state = {
        datetime: new Date()
    };

    componentDidMount() {
        this.timer = setInterval( () => {
            this.setState({
                datetime: new Date()
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render(){
        return(
            <section>
                <div className="calendar-section">
                    <img src="../assets/calendar-section.jpg"/>
                    <div className="calendar-box">
                        <div className="date">
                            <ClockDate date={this.state.datetime}/>
                        </div>
                        <div className="clock">
                            <ClockTime date={this.state.datetime}/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

class ClockDate extends Component{
    render() {
        const {date} = this.props;
        return(
            <span className="date">
            <ClockDateDay date={date}/>
            <ClockDateMonth date={date}/>
            <ClockDateYear date={date}/>
        </span>
        )
    }
}


class ClockTime extends Component{
    render() {
        const {date} = this.props;
        return(
            <span>
            <ClockTimeHour date={date}/>
            <ClockTimeMinute date={date}/>
            <ClockTimeSecond date={date}/>
        </span>
        )
    }
}

class ClockTimeHour extends Component{
    render(){
        const {date} = this.props;
        return <span>{date.getHours()}:</span>
    }
}

class ClockTimeMinute extends Component{
    render() {
        const {date} = this.props;
        return <span>{date.getMinutes()}:</span>
    }
}

class ClockTimeSecond extends Component{
    render(){
        const {date} = this.props;
        return <span>{date.getSeconds()}</span>
    }
}

class ClockDateYear extends Component{
    render(){
        const {date} = this.props;
        return <span>{date.getFullYear()} </span>
    }
}

class ClockDateMonth extends Component{
    render(){
        const {date} = this.props;
        const months = ["Styczeń" , "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"]
        return <span className="months"><strong>{months[date.getMonth()] }</strong></span>
    }
}

class ClockDateDay extends Component{
    render(){
        const {date} = this.props;
        return <span>{date.getDate()} </span>
    }
}

class Notes extends Component{

    state = {
        text: []
    };

    spongeRemove = (e) => {
        e.preventDefault;
        const removeText = this.state.text.slice(+1);
        this.setState({
            text: removeText
        })
    };

    chalkDraw = (e) => {
        e.preventDefault;
        const newText = this.state.text.slice();
        newText.push("Szybko bo zapomnisz! ☺");
        this.setState({
            text: newText,
        })
    };

    handleClickEdit = (e) => {
      e.preventDefault;
      // console.log(e.currentTarget.dataset.id);
      e.target.setAttribute("contenteditable", true);
      const editText = this.state.text;
      this.setState({
          text: editText
      })
    };

    render(){
        return(
            <section>
                <div className="notes-section">
                    <img src="../assets/notes-section.jpg"/>
                    <div className="inputs-notes">
                        <div className="sticker-position">
                            {this.state.text.map((item, index) =><div data-id={index} className="sticker dot-sticker" onClick={this.handleClickEdit}><p>{item}</p></div>)}
                        </div>
                        <button id="sponge" onClick={this.spongeRemove}><img src="../assets/sponge.png"/></button>
                        <button id="chalk" onClick={this.chalkDraw}><img src="../assets/chalk.png"/></button>
                    </div>
                </div>
            </section>
        )
    }
}

class Calculator extends Component{

    state = {
        result: "0"
    };


    handleClickCalc = (e) => {
      const {result} = this.state;
      this.setState({
          result: (result==="0")?String(e) : result + e
      })
    };

    handleClickReset = () => {
        this.setState({
            result: "0"
        })
    };

    handleClickDot = () => {
        const {result} = this.state;
        if(result.indexOf("." === -1)){
            this.setState({
                result: result + "."
            })
        }
    };

    handleClickCalculate = () => {
        const {result} = this.state;
        this.setState({
            result: eval(result)
        })
    };


    render() {
        return (
            <section>
                <div className="calculator-section">
                    <img src="../assets/calculator-quotes.jpg"/>
                    <div className="clac-box">
                        <input type="text" value={this.state.result}/>
                        <table>
                            <thead>
                            <tr>
                                <th><button onClick={()=>this.handleClickReset()}>c</button></th>
                                <th><button onClick={()=>this.handleClickCalc("+")}>+</button></th>
                                <th><button onClick={()=>this.handleClickCalc("-")}>-</button></th>
                                <th><button onClick={()=>this.handleClickCalculate()}>=</button></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><button onClick={()=>this.handleClickCalc(1)}>1</button></td>
                                <td><button onClick={()=>this.handleClickCalc(2)}>2</button></td>
                                <td><button onClick={()=>this.handleClickCalc(3)}>3</button></td>
                                <td><button onClick={()=>this.handleClickCalc("*")}>*</button></td>
                            </tr>
                            <tr>
                                <td><button onClick={()=>this.handleClickCalc(4)}>4</button></td>
                                <td><button onClick={()=>this.handleClickCalc(5)}>5</button></td>
                                <td><button onClick={()=>this.handleClickCalc(6)}>6</button></td>
                                <td><button onClick={()=>this.handleClickCalc("/")}>/</button></td>
                            </tr>
                            <tr>
                                <td><button onClick={()=>this.handleClickCalc(7)}>7</button></td>
                                <td><button onClick={()=>this.handleClickCalc(8)}>8</button></td>
                                <td><button onClick={()=>this.handleClickCalc(9)}>9</button></td>
                                <td><button onClick={()=>this.handleClickDot()}>.</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        )
    }
}

class NotFound extends Component {
    render() {
        return <h1>404,Nothing is here</h1>
    }
}


class App extends Component{
        render(){
            return(
                <HashRouter>
                    <>
                    <Header/>
                    <Switch>
                        <Route exact path='/' component={Main}/>
                        <Route path='/quotes' component={Quotes}/>
                        <Route path='/calendar' component={Calendar}/>
                        <Route path='/notes' component={Notes}/>
                        <Route path='/calculator' component={Calculator}/>
                        <Route component={NotFound} />
                    </Switch>
                        <Footer/>
                    </>
                </HashRouter>
            )
        }
}


ReactDOM.render(<App/>, document.querySelector('#app'));