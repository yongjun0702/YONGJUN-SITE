'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { SharedMarkdownRenderer } from './SharedMarkdownRenderer'

interface MarkdownEditorProps {
  content: string;
  onChange: (value: string) => void;
  onImageUpload: (file: File) => Promise<string>;
  placeholder?: string;
}

export default function MarkdownEditor({ content, onChange, onImageUpload, placeholder }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    const file = files[0]
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다')
      return
    }
    
    try {
      const imageUrl = await onImageUpload(file)
      
      const textarea = textareaRef.current
      if (!textarea) return
      
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = textarea.value
      
      const imageMarkdown = `![${file.name}](${imageUrl})`
      const newText = text.substring(0, start) + imageMarkdown + text.substring(end)
      
      onChange(newText)
      
      setTimeout(() => {
        textarea.focus()
        textarea.selectionStart = start + imageMarkdown.length
        textarea.selectionEnd = start + imageMarkdown.length
      }, 0)
    } catch (err) {
      console.error('이미지 업로드 실패:', err)
      alert('이미지 업로드에 실패했습니다')
    }
    
    e.target.value = ''
  }, [onImageUpload, onChange])

  const handlePaste = useCallback(async (event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') === 0) {
        const file = items[i].getAsFile()
        if (!file) continue

        try {
          const imageUrl = await onImageUpload(file)
          
          const textarea = textareaRef.current
          if (!textarea) return
          
          const start = textarea.selectionStart
          const end = textarea.selectionEnd
          const text = textarea.value
          
          const imageMarkdown = `![image](${imageUrl})`
          const newText = text.substring(0, start) + imageMarkdown + text.substring(end)
          
          onChange(newText)
          
          setTimeout(() => {
            textarea.focus()
            textarea.selectionStart = start + imageMarkdown.length
            textarea.selectionEnd = start + imageMarkdown.length
          }, 0)
          
          event.preventDefault()
          return
        } catch (err) {
          console.error('이미지 업로드 실패:', err)
        }
      }
    }
  }, [onImageUpload, onChange])

  const handleTabKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      
      const textarea = textareaRef.current
      if (!textarea) return
      
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = textarea.value
      
      const newText = text.substring(0, start) + '  ' + text.substring(end)
      
      onChange(newText)
      
      setTimeout(() => {
        textarea.focus()
        textarea.selectionStart = start + 2
        textarea.selectionEnd = start + 2
      }, 0)
    }
  }, [onChange])

  const handleShortcuts = useCallback((e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault()
      
      const textarea = textareaRef.current
      if (!textarea) return
      
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = textarea.value
      
      if (start !== end) {
        const selectedText = text.substring(start, end)
        const newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end)
        
        onChange(newText)
        
        setTimeout(() => {
          textarea.focus()
          textarea.selectionStart = start
          textarea.selectionEnd = end + 4
        }, 0)
      } else {
        const newText = text.substring(0, start) + '****' + text.substring(end)
        
        onChange(newText)
        
        setTimeout(() => {
          textarea.focus()
          textarea.selectionStart = start + 2
          textarea.selectionEnd = start + 2
        }, 0)
      }
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
      e.preventDefault()
      
      const textarea = textareaRef.current
      if (!textarea) return
      
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = textarea.value
      
      if (start !== end) {
        const selectedText = text.substring(start, end)
        const newText = text.substring(0, start) + `*${selectedText}*` + text.substring(end)
        
        onChange(newText)
        
        setTimeout(() => {
          textarea.focus()
          textarea.selectionStart = start
          textarea.selectionEnd = end + 2
        }, 0)
      } else {
        const newText = text.substring(0, start) + '**' + text.substring(end)
        
        onChange(newText)
        
        setTimeout(() => {
          textarea.focus()
          textarea.selectionStart = start + 1
          textarea.selectionEnd = start + 1
        }, 0)
      }
    }
  }, [onChange])

  const handleFormatText = useCallback((format: string) => {
    const textarea = textareaRef.current
    if (!textarea) return
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const selectedText = text.substring(start, end)
    
    let newText = text
    let newCursorPos = start
    
    switch (format) {
      case 'h1':
        newText = text.substring(0, start) + `# ${selectedText}` + text.substring(end)
        newCursorPos = end + 2
        break
      case 'h2':
        newText = text.substring(0, start) + `## ${selectedText}` + text.substring(end)
        newCursorPos = end + 3
        break
      case 'h3':
        newText = text.substring(0, start) + `### ${selectedText}` + text.substring(end)
        newCursorPos = end + 4
        break
      case 'h4':
        newText = text.substring(0, start) + `#### ${selectedText}` + text.substring(end)
        newCursorPos = end + 5
        break
      case 'bold':
        newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end)
        newCursorPos = selectedText.length > 0 ? end + 4 : start + 2
        break
      case 'italic':
        newText = text.substring(0, start) + `*${selectedText}*` + text.substring(end)
        newCursorPos = selectedText.length > 0 ? end + 2 : start + 1
        break
      case 'strike':
        newText = text.substring(0, start) + `~~${selectedText}~~` + text.substring(end)
        newCursorPos = selectedText.length > 0 ? end + 4 : start + 2
        break
      case 'quote':
        newText = text.substring(0, start) + `> ${selectedText}` + text.substring(end)
        newCursorPos = end + 2
        break
      case 'link':
        newText = text.substring(0, start) + `[${selectedText || '링크 텍스트'}](url)` + text.substring(end)
        newCursorPos = selectedText.length > 0 ? end + 3 : start + 13
        break
      case 'code':
        newText = text.substring(0, start) + `\`${selectedText}\`` + text.substring(end)
        newCursorPos = selectedText.length > 0 ? end + 2 : start + 1
        break
      case 'codeblock':
        newText = text.substring(0, start) + `\`\`\`\n${selectedText}\n\`\`\`` + text.substring(end)
        newCursorPos = selectedText.length > 0 ? start + 4 + selectedText.length : start + 4
        break
    }
    
    onChange(newText)
    
    setTimeout(() => {
      textarea.focus()
      if (selectedText.length > 0) {
        textarea.selectionStart = start
        textarea.selectionEnd = newCursorPos
      } else {
        textarea.selectionStart = newCursorPos
        textarea.selectionEnd = newCursorPos
      }
    }, 0)
  }, [onChange])

  const preprocessMarkdown = (markdown: string): string => {
    if (!markdown) return '';
    
    const boldRegex = /\*\*([^*]+)\*\*/g;
    return markdown.replace(boldRegex, '<strong>$1</strong>');
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col border border-gray-200 dark:border-gray-700 rounded-md">
        <div className="flex items-center p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-md overflow-x-auto">
          <button
            type="button"
            onClick={() => handleFormatText('h1')}
            className="p-1.5 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="제목 1"
          >
            H₁
          </button>
          <button
            type="button"
            onClick={() => handleFormatText('h2')}
            className="p-1.5 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="제목 2"
          >
            H₂
          </button>
          <button
            type="button"
            onClick={() => handleFormatText('h3')}
            className="p-1.5 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="제목 3"
          >
            H₃
          </button>
          <button
            type="button"
            onClick={() => handleFormatText('h4')}
            className="p-1.5 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="제목 4"
          >
            H₄
          </button>
          <div className="mx-1 h-6 border-l border-gray-300 dark:border-gray-600"></div>
          <button
            type="button"
            onClick={() => handleFormatText('bold')}
            className="p-1.5 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="굵게 (Ctrl+B)"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => handleFormatText('italic')}
            className="p-1.5 italic hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="기울임 (Ctrl+I)"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => handleFormatText('strike')}
            className="p-1.5 line-through hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="취소선"
          >
            S
          </button>
          <div className="mx-1 h-6 border-l border-gray-300 dark:border-gray-600"></div>
          <button
            type="button"
            onClick={() => handleFormatText('quote')}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xl leading-none"
            title="인용구"
          >
            "
          </button>
          <button
            type="button"
            onClick={() => handleFormatText('link')}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="링크"
          >
            🔗
          </button>
          <button
            type="button"
            onClick={() => handleFormatText('code')}
            className="p-1.5 font-mono hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="인라인 코드"
          >
            &lt;&gt;
          </button>
          <div className="mx-1 h-6 border-l border-gray-300 dark:border-gray-600"></div>
          <label htmlFor="image-upload" className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer" title="이미지 업로드">
            🖼️
            <input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleFileSelect} 
              className="hidden" 
            />
          </label>
        </div>
        
        <div className="grid grid-cols-2 gap-0 h-[500px]">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            onPaste={handlePaste}
            onKeyDown={(e) => {
              handleTabKey(e);
              handleShortcuts(e);
            }}
            placeholder={placeholder || "마크다운으로 내용을 작성하세요..."}
            className="block w-full h-full p-4 rounded-bl-md border-r border-gray-200 dark:border-gray-700 font-mono text-base leading-relaxed dark:bg-gray-800 dark:text-white resize-none focus:outline-none focus:ring-0 focus:border-gray-200 dark:focus:border-gray-700"
            spellCheck={false}
          />
          
          <div className="h-full overflow-y-auto p-4 bg-white dark:bg-gray-900 rounded-br-md">
            <SharedMarkdownRenderer content={content} isPreview={true} />
          </div>
        </div>
      </div>
    </div>
  )
} 