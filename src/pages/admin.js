import React, { useState } from "react"
import Layout from "../components/Layout"

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('articles')
  const [articles, setArticles] = useState([
    { id: 1, title: "Village Council Announces New Infrastructure Projects", date: "2025-01-15", status: "published" },
    { id: 2, title: "New Health Clinic Services Available", date: "2025-01-10", status: "published" },
  ])
  
  const [events, setEvents] = useState([
    { id: 1, title: "Annual Harvest Festival 2025", date: "2025-09-15", eventDate: "2025-09-20", status: "published" },
    { id: 2, title: "Village Council Monthly Meeting", date: "2025-07-15", eventDate: "2025-08-01", status: "published" },
  ])

  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    author: '',
    category: 'announcements',
    type: 'news'
  })

  const [newEvent, setNewEvent] = useState({
    title: '',
    content: '',
    eventDate: '',
    eventTime: '',
    location: '',
    organizer: '',
    type: 'event'
  })

  const handleArticleSubmit = (e) => {
    e.preventDefault()
    const article = {
      id: Date.now(),
      ...newArticle,
      date: new Date().toISOString().split('T')[0],
      status: 'draft'
    }
    setArticles([article, ...articles])
    setNewArticle({ title: '', content: '', author: '', category: 'announcements', type: 'news' })
    alert('Article created successfully!')
  }

  const handleEventSubmit = (e) => {
    e.preventDefault()
    const event = {
      id: Date.now(),
      ...newEvent,
      date: new Date().toISOString().split('T')[0],
      status: 'draft'
    }
    setEvents([event, ...events])
    setNewEvent({ title: '', content: '', eventDate: '', eventTime: '', location: '', organizer: '', type: 'event' })
    alert('Event created successfully!')
  }

  const toggleStatus = (type, id) => {
    if (type === 'article') {
      setArticles(articles.map(article => 
        article.id === id 
          ? { ...article, status: article.status === 'published' ? 'draft' : 'published' }
          : article
      ))
    } else {
      setEvents(events.map(event => 
        event.id === id 
          ? { ...event, status: event.status === 'published' ? 'draft' : 'published' }
          : event
      ))
    }
  }

  const deleteItem = (type, id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      if (type === 'article') {
        setArticles(articles.filter(article => article.id !== id))
      } else {
        setEvents(events.filter(event => event.id !== id))
      }
    }
  }

  return (
    <Layout title="Content Management" description="Manage articles and events for Dangepia Village website">
      <div style={{ maxWidth: 1200, margin: `0 auto`, padding: `2rem 1rem` }}>
        <h1>Content Management System</h1>
        <p style={{ fontSize: `1.1rem`, marginBottom: `2rem` }}>
          Add and manage news articles and events for the village website.
        </p>

        {/* Warning Notice */}
        <div style={{
          background: `#fed7d7`,
          border: `1px solid #feb2b2`,
          borderRadius: `8px`,
          padding: `1rem`,
          marginBottom: `2rem`,
        }}>
          <p style={{ margin: 0, color: `#c53030` }}>
            <strong>⚠️ Demo Mode:</strong> This is a demonstration interface. In a production environment, 
            this would be secured with authentication and connected to a content management system or database.
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: `flex`,
          gap: `1rem`,
          marginBottom: `2rem`,
          borderBottom: `2px solid #e2e8f0`,
        }}>
          <button
            onClick={() => setActiveTab('articles')}
            style={{
              background: activeTab === 'articles' ? `#667eea` : `transparent`,
              color: activeTab === 'articles' ? `white` : `#667eea`,
              border: `none`,
              padding: `1rem 2rem`,
              borderRadius: `8px 8px 0 0`,
              cursor: `pointer`,
              fontWeight: `bold`,
              fontSize: `1rem`,
            }}
          >
            📰 News Articles
          </button>
          <button
            onClick={() => setActiveTab('events')}
            style={{
              background: activeTab === 'events' ? `#667eea` : `transparent`,
              color: activeTab === 'events' ? `white` : `#667eea`,
              border: `none`,
              padding: `1rem 2rem`,
              borderRadius: `8px 8px 0 0`,
              cursor: `pointer`,
              fontWeight: `bold`,
              fontSize: `1rem`,
            }}
          >
            🗓️ Events
          </button>
        </div>

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div>
            <div style={{
              display: `grid`,
              gridTemplateColumns: `1fr 1fr`,
              gap: `2rem`,
              '@media (max-width: 768px)': {
                gridTemplateColumns: `1fr`,
              }
            }}>
              {/* Add New Article Form */}
              <div>
                <h2>Add New Article</h2>
                <form onSubmit={handleArticleSubmit} style={{
                  background: `#f7fafc`,
                  padding: `2rem`,
                  borderRadius: `8px`,
                  border: `1px solid #e2e8f0`,
                }}>
                  <div style={{ marginBottom: `1rem` }}>
                    <label style={{ display: `block`, marginBottom: `0.5rem`, fontWeight: `bold` }}>
                      Title *
                    </label>
                    <input
                      type="text"
                      value={newArticle.title}
                      onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                      required
                      style={{
                        width: `100%`,
                        padding: `0.75rem`,
                        border: `1px solid #e2e8f0`,
                        borderRadius: `5px`,
                        fontSize: `1rem`,
                      }}
                      placeholder="Enter article title..."
                    />
                  </div>

                  <div style={{ marginBottom: `1rem` }}>
                    <label style={{ display: `block`, marginBottom: `0.5rem`, fontWeight: `bold` }}>
                      Author
                    </label>
                    <input
                      type="text"
                      value={newArticle.author}
                      onChange={(e) => setNewArticle({...newArticle, author: e.target.value})}
                      style={{
                        width: `100%`,
                        padding: `0.75rem`,
                        border: `1px solid #e2e8f0`,
                        borderRadius: `5px`,
                        fontSize: `1rem`,
                      }}
                      placeholder="Author name..."
                    />
                  </div>

                  <div style={{ marginBottom: `1rem` }}>
                    <label style={{ display: `block`, marginBottom: `0.5rem`, fontWeight: `bold` }}>
                      Category
                    </label>
                    <select
                      value={newArticle.category}
                      onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                      style={{
                        width: `100%`,
                        padding: `0.75rem`,
                        border: `1px solid #e2e8f0`,
                        borderRadius: `5px`,
                        fontSize: `1rem`,
                      }}
                    >
                      <option value="announcements">Announcements</option>
                      <option value="community">Community Updates</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="events">Events</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: `1.5rem` }}>
                    <label style={{ display: `block`, marginBottom: `0.5rem`, fontWeight: `bold` }}>
                      Content *
                    </label>
                    <textarea
                      value={newArticle.content}
                      onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                      required
                      rows={8}
                      style={{
                        width: `100%`,
                        padding: `0.75rem`,
                        border: `1px solid #e2e8f0`,
                        borderRadius: `5px`,
                        fontSize: `1rem`,
                        resize: `vertical`,
                      }}
                      placeholder="Write your article content here... (Markdown supported)"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: `#667eea`,
                      color: `white`,
                      padding: `0.75rem 1.5rem`,
                      border: `none`,
                      borderRadius: `5px`,
                      fontWeight: `bold`,
                      cursor: `pointer`,
                      fontSize: `1rem`,
                    }}
                  >
                    Create Article
                  </button>
                </form>
              </div>

              {/* Articles List */}
              <div>
                <h2>Existing Articles</h2>
                <div style={{ maxHeight: `600px`, overflowY: `auto` }}>
                  {articles.map((article) => (
                    <div key={article.id} style={{
                      background: `white`,
                      border: `1px solid #e2e8f0`,
                      borderRadius: `8px`,
                      padding: `1.5rem`,
                      marginBottom: `1rem`,
                    }}>
                      <h4 style={{ margin: `0 0 0.5rem 0` }}>{article.title}</h4>
                      <div style={{ fontSize: `0.9rem`, color: `#666`, marginBottom: `1rem` }}>
                        <span>Published: {article.date}</span>
                        {article.author && <span> • By: {article.author}</span>}
                        <span> • Status: 
                          <span style={{
                            color: article.status === 'published' ? `green` : `orange`,
                            fontWeight: `bold`,
                            marginLeft: `0.25rem`,
                          }}>
                            {article.status}
                          </span>
                        </span>
                      </div>
                      <div style={{ display: `flex`, gap: `0.5rem` }}>
                        <button
                          onClick={() => toggleStatus('article', article.id)}
                          style={{
                            background: article.status === 'published' ? `#f56565` : `#48bb78`,
                            color: `white`,
                            border: `none`,
                            padding: `0.5rem 1rem`,
                            borderRadius: `3px`,
                            cursor: `pointer`,
                            fontSize: `0.8rem`,
                          }}
                        >
                          {article.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => deleteItem('article', article.id)}
                          style={{
                            background: `#e53e3e`,
                            color: `white`,
                            border: `none`,
                            padding: `0.5rem 1rem`,
                            borderRadius: `3px`,
                            cursor: `pointer`,
                            fontSize: `0.8rem`,
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <div style={{
              display: `grid`,
              gridTemplateColumns: `1fr 1fr`,
              gap: `2rem`,
              '@media (max-width: 768px)': {
                gridTemplateColumns: `1fr`,
              }
            }}>
              {/* Add New Event Form */}
              <div>
                <h2>Add New Event</h2>
                <form onSubmit={handleEventSubmit} style={{
                  background: `#f7fafc`,
                  padding: `2rem`,
                  borderRadius: `8px`,
                  border: `1px solid #e2e8f0`,
                }}>
                  <div style={{ marginBottom: `1rem` }}>
                    <label style={{ display: `block`, marginBottom: `0.5rem`, fontWeight: `bold` }}>
                      Event Title *
                    </label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      required
                      style={{
                        width: `100%`,
                        padding: `0.75rem`,
                        border: `1px solid #e2e8f0`,
                        borderRadius: `5px`,
                        fontSize: `1rem`,
                      }}
                      placeholder="Enter event title..."
                    />
                  </div>

                  <div style={{ display: `grid`, gridTemplateColumns: `1fr 1fr`, gap: `1rem`, marginBottom: `1rem` }}>
                    <div>
                      <label style={{ display: `block`, marginBottom: `0.5rem`, fontWeight: `bold` }}>
                        Event Date *
                      </label>
                      <input
                        type="date"
                        value={newEvent.eventDate}
                        onChange={(e) => setNewEvent({...newEvent, eventDate: e.target.value})}
                        required
                        style={{
                          width: `100%`,
                          padding: `0.75rem`,
                          border: `1px solid #e2e8f0`,
                          borderRadius: `5px`,
                          fontSize: `1rem`,
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: `block`, marginBottom: `0.5rem`, fontWeight: `bold` }}>
                        Event Time
                      </label>
                      <input
                        type="text"
                        value={newEvent.eventTime}
                        onChange={(e) => setNewEvent({...newEvent, eventTime: e.target.value})}
                        style={{
                          width: `100%`,
                          padding: `0.75rem`,
                          border: `1px solid #e2e8f0`,
                          borderRadius: `5px`,
                          fontSize: `1rem`,
                        }}
                        placeholder="e.g., 10:00 AM - 6:00 PM"
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: `1rem` }}>
                    <label style={{ display: `block`, marginBottom: `0.5rem`, fontWeight: `bold` }}>
                      Location
                    </label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                      style={{
                        width: `100%`,
                        padding: `0.75rem`,
                        border: `1px solid #e2e8f0`,
                        borderRadius: `5px`,
                        fontSize: `1rem`,
                      }}
                      placeholder="Event location..."
                    />
                  </div>

                  <div style={{ marginBottom: `1rem` }}>
                    <label style={{ display: `block`, marginBottom: `0.5rem`, fontWeight: `bold` }}>
                      Organizer
                    </label>
                    <input
                      type="text"
                      value={newEvent.organizer}
                      onChange={(e) => setNewEvent({...newEvent, organizer: e.target.value})}
                      style={{
                        width: `100%`,
                        padding: `0.75rem`,
                        border: `1px solid #e2e8f0`,
                        borderRadius: `5px`,
                        fontSize: `1rem`,
                      }}
                      placeholder="Event organizer..."
                    />
                  </div>

                  <div style={{ marginBottom: `1.5rem` }}>
                    <label style={{ display: `block`, marginBottom: `0.5rem`, fontWeight: `bold` }}>
                      Description *
                    </label>
                    <textarea
                      value={newEvent.content}
                      onChange={(e) => setNewEvent({...newEvent, content: e.target.value})}
                      required
                      rows={6}
                      style={{
                        width: `100%`,
                        padding: `0.75rem`,
                        border: `1px solid #e2e8f0`,
                        borderRadius: `5px`,
                        fontSize: `1rem`,
                        resize: `vertical`,
                      }}
                      placeholder="Describe the event... (Markdown supported)"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: `#667eea`,
                      color: `white`,
                      padding: `0.75rem 1.5rem`,
                      border: `none`,
                      borderRadius: `5px`,
                      fontWeight: `bold`,
                      cursor: `pointer`,
                      fontSize: `1rem`,
                    }}
                  >
                    Create Event
                  </button>
                </form>
              </div>

              {/* Events List */}
              <div>
                <h2>Existing Events</h2>
                <div style={{ maxHeight: `600px`, overflowY: `auto` }}>
                  {events.map((event) => (
                    <div key={event.id} style={{
                      background: `white`,
                      border: `1px solid #e2e8f0`,
                      borderRadius: `8px`,
                      padding: `1.5rem`,
                      marginBottom: `1rem`,
                    }}>
                      <h4 style={{ margin: `0 0 0.5rem 0` }}>{event.title}</h4>
                      <div style={{ fontSize: `0.9rem`, color: `#666`, marginBottom: `1rem` }}>
                        <span>Event Date: {event.eventDate}</span>
                        <span> • Posted: {event.date}</span>
                        <span> • Status: 
                          <span style={{
                            color: event.status === 'published' ? `green` : `orange`,
                            fontWeight: `bold`,
                            marginLeft: `0.25rem`,
                          }}>
                            {event.status}
                          </span>
                        </span>
                      </div>
                      <div style={{ display: `flex`, gap: `0.5rem` }}>
                        <button
                          onClick={() => toggleStatus('event', event.id)}
                          style={{
                            background: event.status === 'published' ? `#f56565` : `#48bb78`,
                            color: `white`,
                            border: `none`,
                            padding: `0.5rem 1rem`,
                            borderRadius: `3px`,
                            cursor: `pointer`,
                            fontSize: `0.8rem`,
                          }}
                        >
                          {event.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => deleteItem('event', event.id)}
                          style={{
                            background: `#e53e3e`,
                            color: `white`,
                            border: `none`,
                            padding: `0.5rem 1rem`,
                            borderRadius: `3px`,
                            cursor: `pointer`,
                            fontSize: `0.8rem`,
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default AdminPage
