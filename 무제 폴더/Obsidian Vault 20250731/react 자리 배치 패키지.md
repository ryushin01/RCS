```tsx
import React from 'react';
import './SeatLayout.css'; // CSS 파일

const seats = [
  { id: 1, row: 1, col: 1, isReserved: false },
  { id: 2, row: 1, col: 2, isReserved: true },
  { id: 3, row: 2, col: 1, isReserved: false },
  { id: 4, row: 2, col: 2, isReserved: false },
];

function Seat({ seat, onSeatClick }) {
  const handleClick = () => {
    onSeatClick(seat);
  };

  return (
    <div
      className={`seat ${seat.isReserved ? 'reserved' : ''}`}
      onClick={handleClick}
    >
      {seat.id}
    </div>
  );
}

function SeatLayout() {
  const [selectedSeats, setSelectedSeats] = React.useState([]);

  const handleSeatClick = (seat) => {
    if (seat.isReserved) return;

    if (selectedSeats.some((s) => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="seat-layout">
      {seats.map((seat) => (
        <Seat key={seat.id} seat={seat} onSeatClick={handleSeatClick} />
      ))}
    </div>
  );
}

export default SeatLayout;
```

```css
.seat-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 10px;
  padding: 20px;
}

.seat {
  width: 50px;
  height: 50px;
  background-color: #eee;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.seat.reserved {
  background-color: #f44336;
  color: white;
  cursor: not-allowed;
}

.seat.selected {
  background-color: #4caf50;
}
```

React에서 자리 배치 기능을 구현하기 위한 별도의 패키지는 명시적으로 존재하지 않습니다. 하지만 다양한 라이브러리와 기술을 조합하여 원하는 자리 배치 기능을 구현할 수 있습니다. 주로 사용되는 방법은 다음과 같습니다:

1. CSS Grid 또는 Flexbox:

- **CSS Grid:**
    
    격자 시스템을 사용하여 복잡한 레이아웃을 쉽게 구성할 수 있습니다. 특히, 다양한 크기의 좌석들을 격자 형태로 배치할 때 유용합니다.
    
- **Flexbox:**
    
    유연한 레이아웃을 만들 때 사용하며, 좌석들을 가로나 세로로 배치하거나, 특정 크기에 맞춰 유동적으로 배치할 때 유용합니다.
    

2. React 컴포넌트와 상태 관리:

- **컴포넌트 분할:**
    
    좌석 하나하나를 컴포넌트로 만들어서 관리하고, 각 컴포넌트의 상태 (예: 선택 여부, 사용자 정보 등)를 관리합니다.
    
- **상태 관리 라이브러리:**
    
    Redux, Zustand, Jotai 등 상태 관리 라이브러리를 사용하여 좌석 정보 및 선택 상태를 효율적으로 관리할 수 있습니다. 
    

3. SVG 또는 Canvas:

- **SVG:**
    
    벡터 이미지를 사용하여 좌석 배치도를 그리고, 각 좌석에 대한 상호작용을 구현할 수 있습니다.
    
- **Canvas:**
    
    동적인 그래픽 요소들을 사용하여 좌석 배치도를 만들고, 애니메이션 효과 등을 적용할 수 있습니다.
    

구현 예시 (CSS Grid 이용):


추가 고려 사항:

- **반응형 디자인:**
    
    다양한 화면 크기에 맞춰 좌석 배치가 잘 보이도록 반응형 디자인을 적용해야 합니다.
    
- **접근성:**
    
    시각 장애인이나 키보드 사용자도 좌석을 선택할 수 있도록 접근성을 고려해야 합니다.
    
- **성능 최적화:**
    
    좌석이 많아질 경우, 가상화 등을 사용하여 성능 저하를 방지해야 합니다.