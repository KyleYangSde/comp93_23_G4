import React, { Component } from "react";
import axios from "axios";
import Message from "./message";
import QuickReplies from "./quickReplies";
import Card from "./card";

// chatbot interface
class Chatbott extends Component {
  messagesEnd;
  constructor(props) {
    super(props);
    this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);
    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
    this.renderOneMessage = this.renderOneMessage.bind(this);
  }

  state = {
    //from dialogue flow api
    messages: [],
    session_id: "",
    //from own base
  };

  // greeting message
  componentDidMount() {
    this.df_event_query();
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  _handleQuickReplyPayload(event, payload, text) {
    event.preventDefault();
    event.stopPropagation();

    this.df_text_query(text);
  }

  async showMore(queryText) {
    let says = {
      speaks: "user",
      msg: {
        text: {
          text: queryText,
        },
      },
    };
    const url = "/more/" + this.state.session_id;
    const res = await axios.get(url);
    console.log("show more", res);

    var own = {
      text: {
        text: "Here are more links for you",
      },
    };
    says = {
      speaks: "jisoo",
      more: res.data.answer.more,
      msg: own,
      addReply: res.data.answer.contents,
    };
    this.setState({
      messages: [...this.state.messages, says],
    });
  }

  async df_text_query(queryText) {
    let says = {
      speaks: "user",
      msg: {
        text: {
          text: queryText,
        },
      },
    };

    this.setState({ messages: [...this.state.messages, says] });

    const res = await axios.post("/utterance", {
      expression: queryText,
      session_id: this.state.session_id,
    });

    console.log(res.data);

    this.setState({ session_id: res.data.session_id });

    const a = JSON.parse(res.data.answer.bot_api);
    console.log("api", a);
    if (res.data.answer.contents.length === 0) {
      // fulfillment messages
      for (let msg of a.fulfillmentMessages) {
        says = {
          speaks: "jisoo",
          msg: msg,
        };
        // console.log(says);
        this.setState({ messages: [...this.state.messages, says] });
      }
    } else {
      console.log(1111111);
      var own = {
        text: {
          text: res.data.answer.reply,
        },
      };
      says = {
        speaks: "jisoo",
        msg: own,
        more: res.data.answer.more,
        addReply: res.data.answer.contents,
      };
      console.log("says", says);
      this.setState({
        messages: [...this.state.messages, says],
      });
    }
  }

  df_event_query(eventName) {
    let says = {
      speaks: "jisoo",
      msg: {
        text: {
          text:
            "Hi, My name is Jisoo. I can provide useful information of health and saftety advices. What can I do for you?",
        },
      },
    };
    this.setState({ messages: [...this.state.messages, says] });
    //console.log(this.state.messages);
  }

  _handleInputKeyPress(e) {
    if (e.key === "Enter") {
      this.df_text_query(e.target.value);
      e.target.value = "";
    }
  }

  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card} />);
  }

  renderOneMessage(message, i) {
    //&& message.msg.text && message.msg.text.text
    console.log(message);
    if (message.msg && message.msg.text && message.msg.text.text) {
      //console.log(message);
      //console.log(this);
      console.log("7778");
      return (
        <Message
          key={i}
          speaks={message.speaks}
          text={message.msg.text.text}
          addReply={message.addReply}
          query_value={this.df_text_query.bind(this)}
          more_link={this.showMore.bind(this)}
          more={message.more}
        />
      );
    } else if (message.msg && message.msg.payload.cards) {
      //message.msg.payload.fields.cards.listValue.values
      //console.log(message);
      return (
        <div key={i}>
          <div className="card-panel grey lighten-5 z-depth-1">
            <div style={{ overflow: "hidden" }}>
              <div className="col s2">
                <a
                  href="/"
                  className="btn-floating btn-large waves-effect waves-light blue"
                >
                  {message.speaks}
                </a>
              </div>
              <div style={{ overflowY: "scroll" }}>
                <div
                  style={{
                    height: 300,
                    width: 250,
                  }}
                >
                  {this.renderCards(message.msg.payload.cards)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.quick_replies
    ) {
      return (
        <QuickReplies
          text={message.msg.payload.text ? message.msg.payload.text : null}
          key={i}
          replyClick={this._handleQuickReplyPayload}
          speaks={message.speaks}
          payload={message.msg.payload.quick_replies}
        />
      );
    }
  }

  renderMessages(returnedMessages) {
    console.log(returnedMessages);
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  }

  render() {
    return (
      <div
        style={{
          minHeight: 500,
          maxHeight: 500,
          width: 400,
          position: "absolute",
          bottom: 0,
          right: 0,
          border: "1px solid lightgray",
          backgroundColor: "grey",
        }}
      >
        <nav>
          <div className="nav-wrapper green">
            <center>
              <a href="/" className="">
                Talk with Jisoo
              </a>
            </center>
          </div>
        </nav>

        <div
          id="chatbot"
          style={{
            minHeight: 388,
            maxHeight: 388,
            width: "100%",
            overflow: "auto",
          }}
        >
          {this.renderMessages(this.state.messages)}

          <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
            style={{ float: "left", clear: "both" }}
          ></div>
        </div>
        <div className=" col s12">
          <input
            style={{
              margin: 0,
              paddingLeft: "1%",
              paddingRight: "1%",
              width: "98%",
            }}
            ref={(input) => {
              this.talkInput = input;
            }}
            placeholder="type a message:"
            onKeyPress={this._handleInputKeyPress}
            id="user_says"
            type="text"
          />
        </div>
      </div>
    );
  }
}

export default Chatbott;
