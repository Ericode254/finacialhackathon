import React from 'react';
import sendIcon from "../assets/send.svg";

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.textareaRef = React.createRef();
  }

  handleKeyDown = (e) => {
    const { submitNewMessage, isLoading } = this.props;
    if (e.keyCode === 13 && !e.shiftKey && !isLoading) {
      e.preventDefault();
      submitNewMessage();
    }
  };

  handleChange = (e) => {
    const { setNewMessage } = this.props;
    setNewMessage(e.target.value);
  };

  render() {
    const { newMessage, submitNewMessage } = this.props;

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        borderRadius: '0 0 8px 8px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      }}>
        <textarea
          ref={this.textareaRef}
          rows="1"
          value={newMessage}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Type a message..."
          style={{
            flex: 1,
            resize: 'none',
            overflow: 'hidden',
            padding: '8px',
            marginRight: '8px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            outline: 'none',
            color: '#1f2937',
          }}
        />
        <button
          onClick={submitNewMessage}
          style={{
            padding: '4px',
            backgroundColor: '#3b82f6',
            borderRadius: '50%',
            outline: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
        >
          <img src={sendIcon} alt="Send" style={{ width: '16px', height: '16px' }} />
        </button>
      </div>
    );
  }
}

export default ChatInput;
