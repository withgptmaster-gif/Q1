// app/page.tsx (Next.js 14+ 기준 입력 폼 예시)
'use client';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

// Supabase 연결 키 (실제로는 환경변수로 관리합니다)
const supabase = createClient('내_SUPABASE_URL', '내_SUPABASE_ANON_KEY');

export default function Home() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Supabase 데이터베이스에 저장
    const { error } = await supabase
      .from('questions')
      .insert([{ name, phone, question }]);

    if (error) {
      alert('오류가 발생했습니다: ' + error.message);
    } else {
      alert('질문이 성공적으로 접수되었습니다!');
      setName(''); setPhone(''); setQuestion('');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px' }}>
      <h2>🙋‍♂️ 질문을 남겨주세요</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="이름" value={name} onChange={e => setName(e.target.value)} required /><br/><br/>
        <input type="text" placeholder="전화번호" value={phone} onChange={e => setPhone(e.target.value)} required /><br/><br/>
        <textarea placeholder="질문 내용" value={question} onChange={e => setQuestion(e.target.value)} required /><br/><br/>
        <button type="submit">제출하기</button>
      </form>
    </div>
  );
}