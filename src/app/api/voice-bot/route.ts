import { NextResponse } from 'next/server';

export async function GET() {
  const js = `
    (function () {
      const micBtn = document.createElement('button');
      micBtn.innerHTML = '🎤';
      micBtn.style.position = 'fixed';
      micBtn.style.bottom = '20px';
      micBtn.style.right = '20px';
      micBtn.style.zIndex = '9999';
      micBtn.style.background = '#000';
      micBtn.style.color = '#fff';
      micBtn.style.border = 'none';
      micBtn.style.borderRadius = '50%';
      micBtn.style.width = '60px';
      micBtn.style.height = '60px';
      micBtn.style.fontSize = '24px';
      micBtn.style.cursor = 'pointer';

      micBtn.onclick = function () {
        alert('Voice bot activated!');
      };

      document.body.appendChild(micBtn);
    })();
  `;

  return new NextResponse(js, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript',
    },
  });
}