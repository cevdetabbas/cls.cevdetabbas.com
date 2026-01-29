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

### 1. Real Mode (`index11.html`)
- Synchronized with the actual system time.
- Automatically tracks current periods and passing times.
- Calculates "Next Class" countdowns across days and weekends.

### 2. Sim Mode (`index12.html`)
- Allows manual simulation starting from a fixed time (08:00 AM).
- Useful for demonstrations or testing the session flow without waiting for the actual time.
- Buttons to jump directly to specific sessions (Login, Learning, Typing, Logout).

### 3. Flash Mode (`index13.html`)
- Advanced "Time Travel" debugging and testing mode.
- Incremental time adjustments (+10s, +5m, +1h and -10s, -5m, -1h).
- State-aware UI that reflects exactly how the system would look at any given simulated moment.
- Automatically stops ongoing announcements during time jumps to maintain sync.

## 📂 Project Structure
- `htdocs/index11.html`: Entry point for Real Mode.
- `htdocs/index12.html`: Entry point for Sim Mode.
- `htdocs/index13.html`: Entry point for Flash Mode.
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
- **Sim Mode:** 08:00'den başlayan manuel simülasyon ve oturumlar arası hızlı geçiş.
- **Flash Mode:** Zamanı ileri/geri sararak sistemin gelecekteki veya geçmişteki davranışlarını test etme imkanı.
- **Özellikler:** Sesli duyurular, Apple tarzı modern arayüz, Matrix ve görsel efektler.
