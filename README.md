# Mr. Oz Tech Zone Elite - Classroom Management System

A sophisticated, web-based classroom management and session tracking tool designed for educators. This system synchronizes with a predefined school schedule to provide real-time updates, automated announcements, and visual progress tracking for classroom activities.

## 🚀 Interactive Live Preview
The project is designed as a standalone static web application that can be hosted on any web server.

## 🌟 Features
- **Dynamic Scheduling:** Automatically switches between Monday-Thursday and Friday schedules.
- **Automated Announcements:** Uses the Web Speech API (TTS) to announce session transitions (Login, Learning, Typing, Logout).
- **Visual Progress:** Circular progress rings and countdown timers for each session.
- **Apple-Inspired Design:** Clean, modern UI with blur effects and smooth transitions.
- **Special Effects:** Matrix-style background, snow effects, and celebratory fireworks upon session completion.
- **Flight Deck:** A dedicated notification panel for class transitions and "Next Class" countdowns.

## 🛠 Interaction Modes

### 1. Real Mode (`index.html`)
- Synchronized with the actual system time.
- Automatically tracks current periods and passing times.
- Calculates "Next Class" countdowns across days and weekends.

### 2. Sim Mode (`simulation.html`)
- Allows manual simulation starting from a fixed time (08:00 AM).
- Useful for demonstrations or testing the session flow without waiting for the actual time.
- Buttons to jump directly to specific sessions (Login, Learning, Typing, Logout).
- Grade Group toggle to test PreK-2 (PBS ABC) vs 3-5 (Typing/Nitrotype) content.

### 3. Flash Mode (`flash.html`)
- Advanced "Time Travel" debugging and testing mode.
- Incremental time adjustments (+10s, +5m, +1h and -10s, -5m, -1h).
- State-aware UI that reflects exactly how the system would look at any given simulated moment.
- Uses real schedule and automated class mapping to show grade-specific content.
- Automatically stops ongoing announcements during time jumps to maintain sync.

## 📂 Project Structure
- `htdocs/index.html`: Entry point for Real Mode.
- `htdocs/simulation.html`: Entry point for Sim Mode.
- `htdocs/flash.html`: Entry point for Flash Mode.
- `htdocs/images/`: Assets for session icons (Login, Learning, etc.).
- `htdocs/history/`: Versioned history of project development.

## 🔧 Technical Details
- **Frontend:** HTML5, CSS3 (CSS Variables, Grid, Flexbox).
- **Logic:** Vanilla JavaScript (No external frameworks/libraries required).
- **Audio:** Web Speech API for announcements and Web Audio API for chime sounds.

---

# Mr. Oz Tech Zone Elite - Sınıf Yönetim Sistemi (Türkçe Özet)

Eğitimciler için tasarlanmış, okul programı ile senkronize çalışan web tabanlı bir oturum takip aracıdır.

- **Real Mode:** Gerçek zamanlı ders takibi ve bir sonraki derse geri sayım.
- **Sim Mode (`simulation.html`):** 08:00'den başlayan manuel simülasyon ve oturumlar arası hızlı geçiş. PreK-2 ve 3-5 arası geçiş yapılabilir.
- **Flash Mode (`flash.html`):** Zamanı ileri/geri sararak sistemin gelecekteki veya geçmişteki davranışlarını test etme imkanı. Gerçek programı ve sınıf eşleştirmelerini kullanır.
