import React from "react";
import { Link } from "react-router-dom";
import background1 from "./head.jpg";
import { Parallax } from "react-parallax";
import YouTube from "react-youtube";
import ChatBot from "react-simple-chatbot";

class HomePage extends React.Component {
  state = {
    showChat: false,
  };

  _onReady(event) {
    event.target.pauseVideo();
    // access to player in all event handlers via event.target
  }

  startChat() {
    this.setState({ showChat: true });
  }

  hideChat() {
    this.setState({ showChat: false });
  }

  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    const step1 = [
      {
        id: "1",
        message: "What is your name?",
        trigger: "2",
      },
      {
        id: "2",
        user: true,
        trigger: "3",
      },
      {
        id: "3",
        message: "Hi {previousValue}, nice to meet you!",
        user: true,
      },

      {
        id: "4",
        message: "What is your name?",
        trigger: "2",
      },
      {
        id: "5",
        user: true,
        trigger: "3",
      },
      {
        id: "6",
        message: "Hi {previousValue}, nice to meet you!",
        end: true,
      },
    ];
    return (
     
      <div>
        
        <div>
          <div class="parallax-container">
            <Parallax bgImage={background1} bgImageAlt="the cat" strength={300}>
              <div style={{ height: "500px" }} />
            </Parallax>
            
          </div>
          <div class ='center' style={{marginBottom : '20px'}}>
            <h1>Welcome to Health and Safety chatbot!</h1>
            <h2>We provide a quality health service to all the visitors.</h2> 
          </div>

          {/* <div className="center">
            <YouTube videoId="1APwq1df6Mw" opts={opts} onReady={this._onReady} />
          </div> */}
      
          <div class="container">
            <br></br>
            <div class ="card-panel  cyan darken-2" style={{
              fontFamily : '"Comic Sans MS", cursive, sans-serif'
            }}>
              <h5 class ='center-align grey-text text-lighten-4'>
                Safety and health have become people's top concerns since COVID-19 outbreak.
              </h5>
              <h5 class = 'center-align grey-text text-lighten-4' style={{
                lineHeight : '35px'
              }}>  
                In order to meet the needs of users who want timely health 
                assistance, we created this chatbot so that users can find the right digital
                health resources for user's needs.
              </h5>
            </div>
            <div class = 'center'>
            <img src={require('./robot.png')} style ={{
              height :'200px'
            }}/>
            </div>
            <h4 class = 'center cyan-text text-darken-2'>
              How to use the chatbot?
            </h4>
            <div class="row">
              <div class="col s12 m4">
                <div class="icon-block">
                  <h2 class="center brown-text">
                    <i class="material-icons">forum</i>
                  </h2>
                  <h5 class="center">Talk with the chatbot like with your friend</h5>

                  <p class="light">
                  You can communicate with the chatbot in everyday language. It will care about you and greet you like an old friend.
                  </p>
                </div>
              </div>

              <div class="col s12 m4">
                <div class="icon-block">
                  <h2 class="center brown-text">
                    <i class="material-icons">explore</i>
                  </h2>
                  <h5 class="center">Search the health news you need by the topic</h5>

                  <p class="light">
                  You only need to enter the required topic in the chat box, and chatbot will return the corresponding news.
                  Moreover, if you really don't know what to search, we also offer Daily headlines for you.
                  </p>
                </div>
              </div>

              <div class="col s12 m4">
                <div class="icon-block">
                  <h2 class="center brown-text">
                    <i class="material-icons">healing</i>
                  </h2>
                  <h5 class="center">Let chatbot help you inquiry illness</h5>

                  <p class="light">

                    You can enter your symptoms to let chatbot inquiry your disease or choose your disease on the
                    disease list. After that, the chatbot will return some professional advice to help you 
  regain health.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div> {showChat ? <SimpleForm></SimpleForm> : null} </div> */}

          <div style={{ display: this.state.showChat ? "" : "none" }}>
            <div
              style={{ position: "fixed", bottom: "40px", right: "10px" }}
              className="right"
            >
              <ChatBot steps={step1} />
            </div>
          </div>
          <div className="right">
            {!this.state.showChat ? (
              <button className="btn" onClick={() => this.startChat()}>
                click to chat...{" "}
              </button>
            ) : (
              <button className="btn" onClick={() => this.hideChat()}>
                click to hide...{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
