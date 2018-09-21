export default {
  splitNumbers(income) {
    return income.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  },
  humanDate(timestamp, format = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) {
    return new Date(timestamp).toLocaleDateString('ru', format);
  }
}
