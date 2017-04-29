export default function() {
  this.transition(
    this.toRoute(['confirm-participants', 'ready-for-drawing']),
    this.use('toLeft')
  );

  this.transition(
    this.toRoute('drawing'),
    this.use('fade', { duration: 750 })
  );
}
