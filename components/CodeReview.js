'use client';

import { useState } from 'react';

export default function CodeReview() {
  const [code, setCode] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const [review, setReview] = useState(null);
  const [activeTab, setActiveTab] = useState('results');
  const [copied, setCopied] = useState(false);

  const handleReview = async () => {
    if (!code.trim()) {
      alert('Please paste some code to review');
      return;
    }

    setIsReviewing(true);
    setReview(null);
    setActiveTab('results');

    try {
      const response = await fetch('/api/code-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      const data = await response.json();
      
      if (data.success) {
        setReview(data.review);
      } else {
        alert(data.error || 'Review failed');
      }
    } catch (error) {
      console.error('Review error:', error);
      alert('Failed to review code. Please try again.');
    } finally {
      setIsReviewing(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreEmoji = (score) => {
    if (score >= 8) return 'PASSED';
    if (score >= 6) return 'WARNING';
    return 'FAILED';
  };

  const getScoreText = (score) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Needs Improvement';
    return 'Poor';
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          background: '#00875A', 
          color: 'white', 
          padding: '8px 20px', 
          borderRadius: '999px', 
          fontSize: '14px', 
          marginBottom: '16px',
          border: '2px solid #000000',
          boxShadow: '2px 2px 0px #000000',
          fontWeight: '700'
        }}>
          <span>AI Code Review</span>
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '12px', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase' }}>
          Instant <span style={{ color: '#E07A1B' }}>Code Analysis</span>
        </h2>
        <p style={{ color: '#4b5563', fontWeight: '500' }}>Security, performance, and best practice checks</p>
      </div>

      <div className="code-review-grid">
        {/* Input Section */}
        <div style={{ background: '#ffffff', border: '3px solid #000000', borderRadius: '16px', padding: '24px', boxShadow: '6px 6px 0px #000000' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <label style={{ fontWeight: '700', color: '#111111' }}>Your Code</label>
            <button
              onClick={handleReview}
              disabled={isReviewing}
              className="btn-brutalist-primary"
              style={{
                padding: '8px 20px',
                fontSize: '0.95rem'
              }}
            >
              {isReviewing ? 'Analyzing...' : 'Review'}
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder='function calculate(items) {
  var total = 0;
  for(var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  console.log(total);
  return total;
}'
            style={{
              width: '100%',
              height: '320px',
              background: '#ffffff',
              border: '2px solid #000000',
              borderRadius: '12px',
              padding: '16px',
              color: '#111111',
              fontFamily: 'monospace',
              fontSize: '13px',
              resize: 'vertical',
              outline: 'none'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
            <span style={{ fontSize: '12px', color: '#4b5563', fontWeight: '500' }}>JavaScript, TypeScript, React, Python</span>
            <span style={{ fontSize: '12px', color: '#4b5563', fontWeight: '500' }}>10 reviews/hour</span>
          </div>
        </div>

        {/* Results Section */}
        <div style={{ background: '#ffffff', border: '3px solid #000000', borderRadius: '16px', padding: '24px', boxShadow: '6px 6px 0px #000000' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', borderBottom: '2px solid #000000', paddingBottom: '12px' }}>
            <button
              onClick={() => setActiveTab('results')}
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                background: activeTab === 'results' ? '#00875A' : 'transparent',
                color: activeTab === 'results' ? 'white' : '#111111',
                border: '2px solid #000000',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '0.85rem',
                boxShadow: activeTab === 'results' ? 'none' : '2px 2px 0px #000000'
              }}
            >
              Results
            </button>
            {review?.fixed_code && (
              <button
                onClick={() => setActiveTab('fixed')}
                style={{
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  background: activeTab === 'fixed' ? '#00875A' : 'transparent',
                  color: activeTab === 'fixed' ? 'white' : '#111111',
                  border: '2px solid #000000',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  boxShadow: activeTab === 'fixed' ? 'none' : '2px 2px 0px #000000'
                }}
              >
                Fixed Code
              </button>
            )}
          </div>
          
          {!review ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#4b5563' }}>
              <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', border: '2px solid #000000', display: 'inline-block', padding: '8px 16px', borderRadius: '8px', background: '#FFFDF9', boxShadow: '3px 3px 0px #000000' }}>CODE PENDING</div>
              <p style={{ marginTop: '12px', fontWeight: '500' }}>Click "Review" to analyze your code</p>
            </div>
          ) : activeTab === 'results' ? (
            <div>
              {/* Score */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  background: '#ffffff', 
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  marginBottom: '12px' 
                }}>
                  <div style={{ fontSize: '28px', fontWeight: '900', color: '#111111' }}>
                    {review.quality_score}
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#4b5563', fontWeight: '600', textTransform: 'uppercase' }}>Quality Score /10</div>
                <div style={{ fontSize: '12px', color: '#E07A1B', fontWeight: '700', marginTop: '4px' }}>{getScoreEmoji(review.quality_score)} - {getScoreText(review.quality_score)}</div>
                <div style={{ fontSize: '12px', color: '#4b5563', fontWeight: '600', marginTop: '4px' }}>Language: {review.language}</div>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                <div style={{ background: '#ffffff', border: '2px solid #000000', padding: '12px', borderRadius: '8px', textAlign: 'center', boxShadow: '3px 3px 0px #000000' }}>
                  <div style={{ fontSize: '20px', fontWeight: '900', color: '#111111' }}>{review.summary?.total_issues || 0}</div>
                  <div style={{ fontSize: '11px', color: '#4b5563', fontWeight: '600' }}>Issues</div>
                </div>
                <div style={{ background: '#ffffff', border: '2px solid #000000', padding: '12px', borderRadius: '8px', textAlign: 'center', boxShadow: '3px 3px 0px #000000' }}>
                  <div style={{ fontSize: '20px', fontWeight: '900', color: '#ef4444' }}>{review.summary?.security_issues || 0}</div>
                  <div style={{ fontSize: '11px', color: '#4b5563', fontWeight: '600' }}>Security</div>
                </div>
                <div style={{ background: '#ffffff', border: '2px solid #000000', padding: '12px', borderRadius: '8px', textAlign: 'center', boxShadow: '3px 3px 0px #000000' }}>
                  <div style={{ fontSize: '20px', fontWeight: '900', color: '#eab308' }}>{review.summary?.performance_issues || 0}</div>
                  <div style={{ fontSize: '11px', color: '#4b5563', fontWeight: '600' }}>Performance</div>
                </div>
              </div>

              {/* Issues */}
              {review.issues && review.issues.length > 0 ? (
                <div style={{ maxHeight: '280px', overflow: 'auto' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: '#111111' }}>Issues Found:</h4>
                  {review.issues.map((issue, idx) => (
                    <div key={idx} style={{ 
                      background: '#ffffff', 
                      padding: '12px', 
                      borderRadius: '8px', 
                      marginBottom: '8px', 
                      border: '2px solid #000000',
                      boxShadow: '3px 3px 0px #000000',
                      borderLeft: `6px solid ${issue.severity === 'Critical' ? '#ef4444' : issue.severity === 'High' ? '#f97316' : '#eab308'}` 
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: issue.severity === 'Critical' ? '#ef4444' : issue.severity === 'High' ? '#f97316' : '#eab308', color: 'white', fontWeight: '700', border: '1px solid #000000' }}>{issue.severity}</span>
                        <span style={{ fontSize: '10px', color: '#4b5563', fontWeight: '600' }}>{issue.type}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#111111', margin: 0, fontWeight: '500' }}>{issue.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: '#ffffff', border: '3px solid #000000', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '4px 4px 0px #000000' }}>
                  <div style={{ fontSize: '18px', fontWeight: '900', color: '#00875A', border: '2px solid #000000', display: 'inline-block', padding: '4px 12px', borderRadius: '8px', background: '#e6f4ea', marginBottom: '8px' }}>PASSED</div>
                  <h4 style={{ color: '#111111', fontWeight: '750', marginBottom: '4px' }}>Excellent Code!</h4>
                  <p style={{ fontSize: '12px', color: '#4b5563', margin: 0, fontWeight: '500' }}>No issues found. Great work!</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <pre style={{ background: '#FFFDF9', padding: '16px', borderRadius: '12px', border: '2px solid #000000', overflow: 'auto', maxHeight: '400px' }}>
                <code style={{ fontSize: '12px', color: '#111111', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>{review.fixed_code}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(review.fixed_code)}
                className="btn-brutalist-primary"
                style={{
                  marginTop: '16px',
                  width: '100%',
                  padding: '12px'
                }}
              >
                {copied ? 'Copied!' : 'Copy Fixed Code'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}