class CalenderUtility {
     async TodayDate() {
        const today = new Date();
        
        const day = today.getDate();
        const month = today.toLocaleString('default', { month: 'short' });
        const year = today.getFullYear().toString().slice(-2);
      
        return `${day} ${month}'${year}`;
      }
}

module.exports = CalenderUtility