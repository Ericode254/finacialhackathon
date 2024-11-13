import React from 'react';
import Markdown from 'react-markdown';
import Spinner from './Spinner';
import userIcon from "../assets/idea.png";
import errorIcon from "../assets/error.png";

class ChatMessages extends React.Component {
  constructor(props) {
    super(props);
    this.scrollContentRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    // Auto-scroll when new messages are added or when loading status changes
    if (prevProps.messages !== this.props.messages || this.props.isLoading) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    if (this.scrollContentRef.current) {
      this.scrollContentRef.current.scrollTop = this.scrollContentRef.current.scrollHeight;
    }
  };

  render() {
    const { messages, isLoading } = this.props;

    return (
      <div
        ref={this.scrollContentRef}
        style={{
          overflowY: 'auto',
          height: '60vh',
          padding: '16px',
        //   backgroundColor: '#f3f4f6', // gray-100
          borderRadius: '8px',
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
        }}
      >
        {messages.map(({ role, content, loading, error }, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '16px',
              flexDirection: role === 'assistant' ? 'row-reverse' : 'row',
            }}
          >
            {role === 'user' && (
              <img
                src={userIcon}
                alt="user icon"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  marginRight: '8px',
                }}
              />
            )}
            <div
              style={{
                padding: '16px',
                maxWidth: '300px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                backgroundColor: role === 'assistant' ? '#ebf8ff' : 'white', // bg-blue-100
                color: role === 'assistant' ? '#1f2937' : '#111827', // text-gray-800 or text-gray-900
              }}
            >
              <div style={{ fontSize: '14px' }}>
                {loading && !content ? (
                  <Spinner />
                ) : role === 'assistant' ? (
                  <Markdown>{content}</Markdown>
                ) : (
                  <div>{content}</div>
                )}
              </div>
              {error && (
                <div style={{
                  color: 'red',
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '8px',
                }}>
                  <img src={errorIcon} alt="error icon" style={{ marginRight: '4px', width: '16px', height: '16px' }} />
                  <span>Error generating the response</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && <Spinner />}
      </div>
    );
  }
}

export default ChatMessages;
