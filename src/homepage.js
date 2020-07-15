import React from "react";
import { Link } from "react-router-dom";
import background1 from "./img1.jpeg";
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
        <div class="parallax-container">
          <Parallax bgImage={background1} bgImageAlt="the cat" strength={800}>
            <div style={{ height: "500px" }} />
          </Parallax>
        </div>

        <section className="center">
          <h1>Home is Where I'm Quarantined with You </h1>
          <p>Keep calm and stay home with your cat</p>
          <p>
            staying at home remains the best way that you can protect yourself
            and others
          </p>
          <div>npm install react-simple-chatbot --save</div>
        </section>
        <div className="center">
          <YouTube videoId="1APwq1df6Mw" opts={opts} onReady={this._onReady} />
        </div>
        <div class="container">
          <div class="row">
            <div class="col s12 m4">
              <div class="icon-block">
                <h2 class="center brown-text">
                  <i class="material-icons">flash_on</i>
                </h2>
                <h5 class="center">Speeds up development</h5>

                <p class="light">
                  We did most of the heavy lifting for you to provide a default
                  stylings that incorporate our custom components. Additionally,
                  we refined animations and transitions to provide a smoother
                  experience for developers.
                </p>
              </div>
            </div>

            <div class="col s12 m4">
              <div class="icon-block">
                <h2 class="center brown-text">
                  <i class="material-icons">group</i>
                </h2>
                <h5 class="center">User Experience Focused</h5>

                <p class="light">
                  By utilizing elements and principles of Material Design, we
                  were able to create a framework that incorporates components
                  and animations that provide more feedback to users.
                  Additionally, a single underlying responsive system across all
                  platforms allow for a more unified user experience.
                </p>
              </div>
            </div>

            <div class="col s12 m4">
              <div class="icon-block">
                <h2 class="center brown-text">
                  <i class="material-icons">settings</i>
                </h2>
                <h5 class="center">Easy to work with</h5>

                <p class="light">
                  We have provided detailed documentation as well as specific
                  code examples to help new users get started. We are also
                  always open to feedback and can answer any questions a user
                  may have about Materialize.
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
    );
  }
}

export default HomePage;
