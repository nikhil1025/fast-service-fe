'use client'

import { useState, useEffect } from 'react'
import { Search, Mail, MailOpen, Trash2, Eye } from 'lucide-react'
import { api, Contact } from '@/lib/api'

export default function MessagesPage() {
  const [messages, setMessages] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRead, setFilterRead] = useState<string>('all')
  const [selectedMessage, setSelectedMessage] = useState<Contact | null>(null)
  const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const data = await api.getContacts()
      setMessages(data)
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await api.markContactAsRead(id)
      setMessages(prev => prev.map(msg => 
        msg.id === id ? { ...msg, isRead: true } : msg
      ))
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    
    try {
      setActionLoading(prev => ({ ...prev, [id]: true }))
      await api.deleteContact(id)
      await fetchMessages() // Refresh the list
      if (selectedMessage?.id === id) {
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('Failed to delete message:', error)
      alert('Failed to delete message')
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: false }))
    }
  }

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRead = filterRead === 'all' || 
                       (filterRead === 'unread' && !message.isRead) ||
                       (filterRead === 'read' && message.isRead)
    return matchesSearch && matchesRead
  })

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="divide-y divide-gray-200">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-6">
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {messages.filter(m => !m.isRead).length} unread
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Filters */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                </div>
                <select
                  value={filterRead}
                  onChange={(e) => setFilterRead(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary"
                >
                  <option value="all">All Messages</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
              </div>
            </div>

            {/* Messages */}
            <div className="divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-6 hover:bg-gray-50 cursor-pointer ${!message.isRead ? 'bg-blue-50' : ''}`}
                  onClick={() => {
                    setSelectedMessage(message)
                    if (!message.isRead) {
                      markAsRead(message.id)
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {message.isRead ? (
                          <MailOpen size={20} className="text-gray-400" />
                        ) : (
                          <Mail size={20} className="text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-medium ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                            {message.name}
                          </h3>
                          {!message.isRead && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{message.email}</p>
                        <p className={`text-sm ${!message.isRead ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                          {message.subject}
                        </p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {message.message}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedMessage(message)
                          }}
                          className="text-gray-600 hover:text-primary"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteMessage(message.id)
                          }}
                          disabled={actionLoading[message.id]}
                          className="text-gray-600 hover:text-red-600 disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredMessages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No messages found</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
            {selectedMessage ? (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Message Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">From</label>
                    <p className="text-gray-900">{selectedMessage.name}</p>
                    <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                    <p className="text-sm text-gray-600">{selectedMessage.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Subject</label>
                    <p className="text-gray-900">{selectedMessage.subject}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date</label>
                    <p className="text-gray-900">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <button className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                Select a message to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}