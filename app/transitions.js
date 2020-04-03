export default function () {
  this.transition(
    this.fromRoute("index"),
    this.toRoute("raffles"),
    this.use("fade")
  );

  this.transition(
    this.fromRoute("raffles.raffle.ready-for-drawing"),
    this.toRoute("raffles.raffle.run-drawing"),
    this.use("fade")
  );
}
