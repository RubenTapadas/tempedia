(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (t, e, n) {
      t.exports = n("zUnb");
    },
    zUnb: function (t, e, n) {
      "use strict";
      function i(t) {
        return "function" == typeof t;
      }
      n.r(e);
      let s = !1;
      const r = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                t.stack
            );
          } else
            s &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          s = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return s;
        },
      };
      function o(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const a = {
          closed: !0,
          next(t) {},
          error(t) {
            if (r.useDeprecatedSynchronousErrorHandling) throw t;
            o(t);
          },
          complete() {},
        },
        l = (() =>
          Array.isArray || ((t) => t && "number" == typeof t.length))();
      function c(t) {
        return null !== t && "object" == typeof t;
      }
      const h = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      let u = (() => {
        class t {
          constructor(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && (this._unsubscribe = t);
          }
          unsubscribe() {
            let e;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _unsubscribe: s,
              _subscriptions: r,
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof t)
            )
              n.remove(this);
            else if (null !== n)
              for (let t = 0; t < n.length; ++t) n[t].remove(this);
            if (i(s))
              try {
                s.call(this);
              } catch (o) {
                e = o instanceof h ? d(o.errors) : [o];
              }
            if (l(r)) {
              let t = -1,
                n = r.length;
              for (; ++t < n; ) {
                const n = r[t];
                if (c(n))
                  try {
                    n.unsubscribe();
                  } catch (o) {
                    (e = e || []),
                      o instanceof h ? (e = e.concat(d(o.errors))) : e.push(o);
                  }
              }
            }
            if (e) throw new h(e);
          }
          add(e) {
            let n = e;
            if (!e) return t.EMPTY;
            switch (typeof e) {
              case "function":
                n = new t(e);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof t)) {
                  const e = n;
                  (n = new t()), (n._subscriptions = [e]);
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + e + " added to Subscription."
                );
            }
            let { _parentOrParents: i } = n;
            if (null === i) n._parentOrParents = this;
            else if (i instanceof t) {
              if (i === this) return n;
              n._parentOrParents = [i, this];
            } else {
              if (-1 !== i.indexOf(this)) return n;
              i.push(this);
            }
            const s = this._subscriptions;
            return null === s ? (this._subscriptions = [n]) : s.push(n), n;
          }
          remove(t) {
            const e = this._subscriptions;
            if (e) {
              const n = e.indexOf(t);
              -1 !== n && e.splice(n, 1);
            }
          }
        }
        return (
          (t.EMPTY = (function (t) {
            return (t.closed = !0), t;
          })(new t())),
          t
        );
      })();
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof h ? e.errors : e), []);
      }
      const p = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())();
      class f extends u {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = a;
              break;
            case 1:
              if (!t) {
                this.destination = a;
                break;
              }
              if ("object" == typeof t) {
                t instanceof f
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new m(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new m(this, t, e, n));
          }
        }
        [p]() {
          return this;
        }
        static create(t, e, n) {
          const i = new f(t, e, n);
          return (i.syncErrorThrowable = !1), i;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class m extends f {
        constructor(t, e, n, s) {
          let r;
          super(), (this._parentSubscriber = t);
          let o = this;
          i(e)
            ? (r = e)
            : e &&
              ((r = e.next),
              (n = e.error),
              (s = e.complete),
              e !== a &&
                ((o = Object.create(e)),
                i(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = r),
            (this._error = n),
            (this._complete = s);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            r.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = r;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : o(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              o(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              r.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), r.useDeprecatedSynchronousErrorHandling))
              throw n;
            o(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!r.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            e.call(this._context, n);
          } catch (i) {
            return r.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = i), (t.syncErrorThrown = !0), !0)
              : (o(i), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }
      }
      const g = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")();
      function _(t) {
        return t;
      }
      let y = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: i } = this,
              s = (function (t, e, n) {
                if (t) {
                  if (t instanceof f) return t;
                  if (t[p]) return t[p]();
                }
                return t || e || n ? new f(t, e, n) : new f(a);
              })(t, e, n);
            if (
              (s.add(
                i
                  ? i.call(s, this.source)
                  : this.source ||
                    (r.useDeprecatedSynchronousErrorHandling &&
                      !s.syncErrorThrowable)
                  ? this._subscribe(s)
                  : this._trySubscribe(s)
              ),
              r.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue;
            return s;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              r.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: i } = t;
                    if (e || i) return !1;
                    t = n && n instanceof f ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = b(e))((e, n) => {
              let i;
              i = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (s) {
                    n(s), i && i.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [g]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length
              ? this
              : (0 === (e = t).length
                  ? _
                  : 1 === e.length
                  ? e[0]
                  : function (t) {
                      return e.reduce((t, e) => e(t), t);
                    })(this);
            var e;
          }
          toPromise(t) {
            return new (t = b(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function b(t) {
        if ((t || (t = r.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      const v = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class w extends u {
        constructor(t, e) {
          super(),
            (this.subject = t),
            (this.subscriber = e),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (
            ((this.subject = null),
            !e || 0 === e.length || t.isStopped || t.closed)
          )
            return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
      class x extends f {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let C = (() => {
        class t extends y {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [p]() {
            return new x(this);
          }
          lift(t) {
            const e = new S(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new v();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                i = e.slice();
              for (let s = 0; s < n; s++) i[s].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new v();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              i = e.slice();
            for (let s = 0; s < n; s++) i[s].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new v();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let i = 0; i < e; i++) n[i].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new v();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new v();
            return this.hasError
              ? (t.error(this.thrownError), u.EMPTY)
              : this.isStopped
              ? (t.complete(), u.EMPTY)
              : (this.observers.push(t), new w(this, t));
          }
          asObservable() {
            const t = new y();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new S(t, e)), t;
      })();
      class S extends C {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : u.EMPTY;
        }
      }
      function k(t) {
        return t && "function" == typeof t.schedule;
      }
      class E extends f {
        constructor(t, e, n) {
          super(),
            (this.parent = t),
            (this.outerValue = e),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(t) {
          this.parent.notifyNext(
            this.outerValue,
            t,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      const T = (t) => (e) => {
        for (let n = 0, i = t.length; n < i && !e.closed; n++) e.next(t[n]);
        e.complete();
      };
      function A() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const O = A(),
        I = (t) => t && "number" == typeof t.length && "function" != typeof t;
      function P(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      const R = (t) => {
        if (t && "function" == typeof t[g])
          return (
            (i = t),
            (t) => {
              const e = i[g]();
              if ("function" != typeof e.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              return e.subscribe(t);
            }
          );
        if (I(t)) return T(t);
        if (P(t))
          return (
            (n = t),
            (t) => (
              n
                .then(
                  (e) => {
                    t.closed || (t.next(e), t.complete());
                  },
                  (e) => t.error(e)
                )
                .then(null, o),
              t
            )
          );
        if (t && "function" == typeof t[O])
          return (
            (e = t),
            (t) => {
              const n = e[O]();
              for (;;) {
                const e = n.next();
                if (e.done) {
                  t.complete();
                  break;
                }
                if ((t.next(e.value), t.closed)) break;
              }
              return (
                "function" == typeof n.return &&
                  t.add(() => {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        {
          const e = c(t) ? "an invalid object" : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
          );
        }
        var e, n, i;
      };
      function D(t, e, n, i, s = new E(t, n, i)) {
        if (!s.closed) return e instanceof y ? e.subscribe(s) : R(e)(s);
      }
      class N extends f {
        notifyNext(t, e, n, i, s) {
          this.destination.next(e);
        }
        notifyError(t, e) {
          this.destination.error(t);
        }
        notifyComplete(t) {
          this.destination.complete();
        }
      }
      function F(t, e) {
        return function (n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new L(t, e));
        };
      }
      class L {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new M(t, this.project, this.thisArg));
        }
      }
      class M extends f {
        constructor(t, e, n) {
          super(t),
            (this.project = e),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      function j(t, e) {
        return new y((n) => {
          const i = new u();
          let s = 0;
          return (
            i.add(
              e.schedule(function () {
                s !== t.length
                  ? (n.next(t[s++]), n.closed || i.add(this.schedule()))
                  : n.complete();
              })
            ),
            i
          );
        });
      }
      function V(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && "function" == typeof t[g];
                  })(t)
                )
                  return (function (t, e) {
                    return new y((n) => {
                      const i = new u();
                      return (
                        i.add(
                          e.schedule(() => {
                            const s = t[g]();
                            i.add(
                              s.subscribe({
                                next(t) {
                                  i.add(e.schedule(() => n.next(t)));
                                },
                                error(t) {
                                  i.add(e.schedule(() => n.error(t)));
                                },
                                complete() {
                                  i.add(e.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        i
                      );
                    });
                  })(t, e);
                if (P(t))
                  return (function (t, e) {
                    return new y((n) => {
                      const i = new u();
                      return (
                        i.add(
                          e.schedule(() =>
                            t.then(
                              (t) => {
                                i.add(
                                  e.schedule(() => {
                                    n.next(t),
                                      i.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (t) => {
                                i.add(e.schedule(() => n.error(t)));
                              }
                            )
                          )
                        ),
                        i
                      );
                    });
                  })(t, e);
                if (I(t)) return j(t, e);
                if (
                  (function (t) {
                    return t && "function" == typeof t[O];
                  })(t) ||
                  "string" == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error("Iterable cannot be null");
                    return new y((n) => {
                      const i = new u();
                      let s;
                      return (
                        i.add(() => {
                          s && "function" == typeof s.return && s.return();
                        }),
                        i.add(
                          e.schedule(() => {
                            (s = t[O]()),
                              i.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let t, e;
                                  try {
                                    const n = s.next();
                                    (t = n.value), (e = n.done);
                                  } catch (i) {
                                    return void n.error(i);
                                  }
                                  e
                                    ? n.complete()
                                    : (n.next(t), this.schedule());
                                })
                              );
                          })
                        ),
                        i
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + " is not observable"
              );
            })(t, e)
          : t instanceof y
          ? t
          : new y(R(t));
      }
      function $(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? (i) =>
              i.pipe(
                $((n, i) => V(t(n, i)).pipe(F((t, s) => e(n, t, i, s))), n)
              )
          : ("number" == typeof e && (n = e), (e) => e.lift(new H(t, n)));
      }
      class H {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new B(t, this.project, this.concurrent));
        }
      }
      class B extends N {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (i) {
            return void this.destination.error(i);
          }
          this.active++, this._innerSub(e, t, n);
        }
        _innerSub(t, e, n) {
          const i = new E(this, e, n),
            s = this.destination;
          s.add(i);
          const r = D(this, t, void 0, void 0, i);
          r !== i && s.add(r);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t, e, n, i, s) {
          this.destination.next(e);
        }
        notifyComplete(t) {
          const e = this.buffer;
          this.remove(t),
            this.active--,
            e.length > 0
              ? this._next(e.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function U(t = Number.POSITIVE_INFINITY) {
        return $(_, t);
      }
      function z(t, e) {
        return e ? j(t, e) : new y(T(t));
      }
      function q(...t) {
        let e = Number.POSITIVE_INFINITY,
          n = null,
          i = t[t.length - 1];
        return (
          k(i)
            ? ((n = t.pop()),
              t.length > 1 &&
                "number" == typeof t[t.length - 1] &&
                (e = t.pop()))
            : "number" == typeof i && (e = t.pop()),
          null === n && 1 === t.length && t[0] instanceof y
            ? t[0]
            : U(e)(z(t, n))
        );
      }
      function W() {
        return function (t) {
          return t.lift(new G(t));
        };
      }
      class G {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const i = new Z(t, n),
            s = e.subscribe(i);
          return i.closed || (i.connection = n.connect()), s;
        }
      }
      class Z extends f {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            i = t._connection;
          (this.connection = null), !i || (n && i !== n) || i.unsubscribe();
        }
      }
      class K extends y {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (t && !t.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new u()),
              t.add(this.source.subscribe(new X(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = u.EMPTY))),
            t
          );
        }
        refCount() {
          return W()(this);
        }
      }
      const Q = (() => {
        const t = K.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class X extends x {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              e && e.unsubscribe();
          }
        }
      }
      function Y() {
        return new C();
      }
      function J(t) {
        return { toString: t }.toString();
      }
      function tt(t, e, n) {
        return J(() => {
          const i = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function s(...t) {
            if (this instanceof s) return i.apply(this, t), this;
            const e = new s(...t);
            return (n.annotation = e), n;
            function n(t, n, i) {
              const s = t.hasOwnProperty("__parameters__")
                ? t.__parameters__
                : Object.defineProperty(t, "__parameters__", { value: [] })
                    .__parameters__;
              for (; s.length <= i; ) s.push(null);
              return (s[i] = s[i] || []).push(e), t;
            }
          }
          return (
            n && (s.prototype = Object.create(n.prototype)),
            (s.prototype.ngMetadataName = t),
            (s.annotationCls = s),
            s
          );
        });
      }
      const et = tt("Inject", (t) => ({ token: t })),
        nt = tt("Optional"),
        it = tt("Self"),
        st = tt("SkipSelf");
      var rt = (function (t) {
        return (
          (t[(t.Default = 0)] = "Default"),
          (t[(t.Host = 1)] = "Host"),
          (t[(t.Self = 2)] = "Self"),
          (t[(t.SkipSelf = 4)] = "SkipSelf"),
          (t[(t.Optional = 8)] = "Optional"),
          t
        );
      })({});
      function ot(t) {
        for (let e in t) if (t[e] === ot) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function at(t, e) {
        for (const n in e)
          e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
      }
      function lt(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function ct(t) {
        return {
          factory: t.factory,
          providers: t.providers || [],
          imports: t.imports || [],
        };
      }
      function ht(t) {
        return ut(t, t[pt]) || ut(t, t[gt]);
      }
      function ut(t, e) {
        return e && e.token === t ? e : null;
      }
      function dt(t) {
        return t && (t.hasOwnProperty(ft) || t.hasOwnProperty(_t))
          ? t[ft]
          : null;
      }
      const pt = ot({ ɵprov: ot }),
        ft = ot({ ɵinj: ot }),
        mt = ot({ ɵprovFallback: ot }),
        gt = ot({ ngInjectableDef: ot }),
        _t = ot({ ngInjectorDef: ot });
      function yt(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(yt).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return "" + t.overriddenName;
        if (t.name) return "" + t.name;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function bt(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const vt = ot({ __forward_ref__: ot });
      function wt(t) {
        return (
          (t.__forward_ref__ = wt),
          (t.toString = function () {
            return yt(this());
          }),
          t
        );
      }
      function xt(t) {
        return Ct(t) ? t() : t;
      }
      function Ct(t) {
        return (
          "function" == typeof t &&
          t.hasOwnProperty(vt) &&
          t.__forward_ref__ === wt
        );
      }
      const St = "undefined" != typeof globalThis && globalThis,
        kt = "undefined" != typeof window && window,
        Et =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Tt = "undefined" != typeof global && global,
        At = St || Tt || kt || Et,
        Ot = ot({ ɵcmp: ot }),
        It = ot({ ɵdir: ot }),
        Pt = ot({ ɵpipe: ot }),
        Rt = ot({ ɵmod: ot }),
        Dt = ot({ ɵloc: ot }),
        Nt = ot({ ɵfac: ot }),
        Ft = ot({ __NG_ELEMENT_ID__: ot });
      class Lt {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = lt({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }));
        }
        toString() {
          return "InjectionToken " + this._desc;
        }
      }
      const Mt = new Lt("INJECTOR", -1),
        jt = {},
        Vt = /\n/gm,
        $t = ot({ provide: String, useValue: ot });
      let Ht,
        Bt = void 0;
      function Ut(t) {
        const e = Bt;
        return (Bt = t), e;
      }
      function zt(t) {
        const e = Ht;
        return (Ht = t), e;
      }
      function qt(t, e = rt.Default) {
        if (void 0 === Bt)
          throw new Error("inject() must be called from an injection context");
        return null === Bt
          ? Zt(t, void 0, e)
          : Bt.get(t, e & rt.Optional ? null : void 0, e);
      }
      function Wt(t, e = rt.Default) {
        return (Ht || qt)(xt(t), e);
      }
      const Gt = Wt;
      function Zt(t, e, n) {
        const i = ht(t);
        if (i && "root" == i.providedIn)
          return void 0 === i.value ? (i.value = i.factory()) : i.value;
        if (n & rt.Optional) return null;
        if (void 0 !== e) return e;
        throw new Error(`Injector: NOT_FOUND [${yt(t)}]`);
      }
      function Kt(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const i = xt(t[n]);
          if (Array.isArray(i)) {
            if (0 === i.length)
              throw new Error("Arguments array must have arguments.");
            let t = void 0,
              n = rt.Default;
            for (let e = 0; e < i.length; e++) {
              const s = i[e];
              s instanceof nt || "Optional" === s.ngMetadataName || s === nt
                ? (n |= rt.Optional)
                : s instanceof st || "SkipSelf" === s.ngMetadataName || s === st
                ? (n |= rt.SkipSelf)
                : s instanceof it || "Self" === s.ngMetadataName || s === it
                ? (n |= rt.Self)
                : (t = s instanceof et || s === et ? s.token : s);
            }
            e.push(Wt(t, n));
          } else e.push(Wt(i));
        }
        return e;
      }
      class Qt {
        get(t, e = jt) {
          if (e === jt) {
            const e = new Error(`NullInjectorError: No provider for ${yt(t)}!`);
            throw ((e.name = "NullInjectorError"), e);
          }
          return e;
        }
      }
      class Xt {}
      class Yt {}
      function Jt(t, e) {
        t.forEach((t) => (Array.isArray(t) ? Jt(t, e) : e(t)));
      }
      function te(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function ee(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function ne(t, e) {
        const n = [];
        for (let i = 0; i < t; i++) n.push(e);
        return n;
      }
      function ie(t, e, n) {
        let i = re(t, e);
        return (
          i >= 0
            ? (t[1 | i] = n)
            : ((i = ~i),
              (function (t, e, n, i) {
                let s = t.length;
                if (s == e) t.push(n, i);
                else if (1 === s) t.push(i, t[0]), (t[0] = n);
                else {
                  for (s--, t.push(t[s - 1], t[s]); s > e; )
                    (t[s] = t[s - 2]), s--;
                  (t[e] = n), (t[e + 1] = i);
                }
              })(t, i, e, n)),
          i
        );
      }
      function se(t, e) {
        const n = re(t, e);
        if (n >= 0) return t[1 | n];
      }
      function re(t, e) {
        return (function (t, e, n) {
          let i = 0,
            s = t.length >> 1;
          for (; s !== i; ) {
            const n = i + ((s - i) >> 1),
              r = t[n << 1];
            if (e === r) return n << 1;
            r > e ? (s = n) : (i = n + 1);
          }
          return ~(s << 1);
        })(t, e);
      }
      var oe = (function (t) {
          return (
            (t[(t.OnPush = 0)] = "OnPush"), (t[(t.Default = 1)] = "Default"), t
          );
        })({}),
        ae = (function (t) {
          return (
            (t[(t.Emulated = 0)] = "Emulated"),
            (t[(t.Native = 1)] = "Native"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            t
          );
        })({});
      const le = {},
        ce = [];
      let he = 0;
      function ue(t) {
        return J(() => {
          const e = {},
            n = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: e,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === oe.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || ce,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || ae.Emulated,
              id: "c",
              styles: t.styles || ce,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            i = t.directives,
            s = t.features,
            r = t.pipes;
          return (
            (n.id += he++),
            (n.inputs = ge(t.inputs, e)),
            (n.outputs = ge(t.outputs)),
            s && s.forEach((t) => t(n)),
            (n.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(de)
              : null),
            (n.pipeDefs = r
              ? () => ("function" == typeof r ? r() : r).map(pe)
              : null),
            n
          );
        });
      }
      function de(t) {
        return (
          be(t) ||
          (function (t) {
            return t[It] || null;
          })(t)
        );
      }
      function pe(t) {
        return (function (t) {
          return t[Pt] || null;
        })(t);
      }
      const fe = {};
      function me(t) {
        const e = {
          type: t.type,
          bootstrap: t.bootstrap || ce,
          declarations: t.declarations || ce,
          imports: t.imports || ce,
          exports: t.exports || ce,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
        };
        return (
          null != t.id &&
            J(() => {
              fe[t.id] = t.type;
            }),
          e
        );
      }
      function ge(t, e) {
        if (null == t) return le;
        const n = {};
        for (const i in t)
          if (t.hasOwnProperty(i)) {
            let s = t[i],
              r = s;
            Array.isArray(s) && ((r = s[1]), (s = s[0])),
              (n[s] = i),
              e && (e[s] = r);
          }
        return n;
      }
      const _e = ue;
      function ye(t) {
        return {
          type: t.type,
          name: t.name,
          factory: null,
          pure: !1 !== t.pure,
          onDestroy: t.type.prototype.ngOnDestroy || null,
        };
      }
      function be(t) {
        return t[Ot] || null;
      }
      function ve(t, e) {
        return t.hasOwnProperty(Nt) ? t[Nt] : null;
      }
      function we(t, e) {
        const n = t[Rt] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${yt(t)} does not have '\u0275mod' property.`);
        return n;
      }
      function xe(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function Ce(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function Se(t) {
        return 0 != (8 & t.flags);
      }
      function ke(t) {
        return 2 == (2 & t.flags);
      }
      function Ee(t) {
        return 1 == (1 & t.flags);
      }
      function Te(t) {
        return null !== t.template;
      }
      function Ae(t) {
        return 0 != (512 & t[2]);
      }
      class Oe {
        constructor(t, e, n) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ie() {
        return Pe;
      }
      function Pe(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = De), Re;
      }
      function Re() {
        const t = Ne(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === le) t.previous = e;
          else for (let t in e) n[t] = e[t];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function De(t, e, n, i) {
        const s =
            Ne(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, { previous: le, current: null }),
          r = s.current || (s.current = {}),
          o = s.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (r[a] = new Oe(l && l.currentValue, e, o === le)), (t[i] = e);
      }
      function Ne(t) {
        return t.__ngSimpleChanges__ || null;
      }
      Ie.ngInherit = !0;
      let Fe = void 0;
      function Le(t) {
        return !!t.listen;
      }
      const Me = {
        createRenderer: (t, e) =>
          void 0 !== Fe
            ? Fe
            : "undefined" != typeof document
            ? document
            : void 0,
      };
      function je(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function Ve(t, e) {
        return je(e[t + 20]);
      }
      function $e(t, e) {
        return je(e[t.index]);
      }
      function He(t, e) {
        return t.data[e + 20];
      }
      function Be(t, e) {
        return t[e + 20];
      }
      function Ue(t, e) {
        const n = e[t];
        return xe(n) ? n : n[0];
      }
      function ze(t) {
        const e = (function (t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function qe(t) {
        return 4 == (4 & t[2]);
      }
      function We(t) {
        return 128 == (128 & t[2]);
      }
      function Ge(t, e) {
        return null === t || null == e ? null : t[e];
      }
      function Ze(t) {
        t[18] = 0;
      }
      function Ke(t, e) {
        t[5] += e;
        let n = t,
          i = t[3];
        for (
          ;
          null !== i && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (i[5] += e), (n = i), (i = i[3]);
      }
      const Qe = {
        lFrame: yn(null),
        bindingsEnabled: !0,
        checkNoChangesMode: !1,
      };
      function Xe() {
        return Qe.bindingsEnabled;
      }
      function Ye() {
        return Qe.lFrame.lView;
      }
      function Je() {
        return Qe.lFrame.tView;
      }
      function tn(t) {
        Qe.lFrame.contextLView = t;
      }
      function en() {
        return Qe.lFrame.previousOrParentTNode;
      }
      function nn(t, e) {
        (Qe.lFrame.previousOrParentTNode = t), (Qe.lFrame.isParent = e);
      }
      function sn() {
        return Qe.lFrame.isParent;
      }
      function rn() {
        Qe.lFrame.isParent = !1;
      }
      function on() {
        return Qe.checkNoChangesMode;
      }
      function an(t) {
        Qe.checkNoChangesMode = t;
      }
      function ln() {
        const t = Qe.lFrame;
        let e = t.bindingRootIndex;
        return (
          -1 === e && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e
        );
      }
      function cn() {
        return Qe.lFrame.bindingIndex++;
      }
      function hn(t, e) {
        const n = Qe.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), un(e);
      }
      function un(t) {
        Qe.lFrame.currentDirectiveIndex = t;
      }
      function dn(t) {
        const e = Qe.lFrame.currentDirectiveIndex;
        return -1 === e ? null : t[e];
      }
      function pn() {
        return Qe.lFrame.currentQueryIndex;
      }
      function fn(t) {
        Qe.lFrame.currentQueryIndex = t;
      }
      function mn(t, e) {
        const n = _n();
        (Qe.lFrame = n), (n.previousOrParentTNode = e), (n.lView = t);
      }
      function gn(t, e) {
        const n = _n(),
          i = t[1];
        (Qe.lFrame = n),
          (n.previousOrParentTNode = e),
          (n.lView = t),
          (n.tView = i),
          (n.contextLView = t),
          (n.bindingIndex = i.bindingStartIndex);
      }
      function _n() {
        const t = Qe.lFrame,
          e = null === t ? null : t.child;
        return null === e ? yn(t) : e;
      }
      function yn(t) {
        const e = {
          previousOrParentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: 0,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
        };
        return null !== t && (t.child = e), e;
      }
      function bn() {
        const t = Qe.lFrame;
        return (
          (Qe.lFrame = t.parent),
          (t.previousOrParentTNode = null),
          (t.lView = null),
          t
        );
      }
      const vn = bn;
      function wn() {
        const t = bn();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = 0),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function xn() {
        return Qe.lFrame.selectedIndex;
      }
      function Cn(t) {
        Qe.lFrame.selectedIndex = t;
      }
      function Sn() {
        const t = Qe.lFrame;
        return He(t.tView, t.selectedIndex);
      }
      function kn(t, e) {
        for (let n = e.directiveStart, i = e.directiveEnd; n < i; n++) {
          const e = t.data[n].type.prototype,
            {
              ngAfterContentInit: i,
              ngAfterContentChecked: s,
              ngAfterViewInit: r,
              ngAfterViewChecked: o,
              ngOnDestroy: a,
            } = e;
          i && (t.contentHooks || (t.contentHooks = [])).push(-n, i),
            s &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, s),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, s)),
            r && (t.viewHooks || (t.viewHooks = [])).push(-n, r),
            o &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, o),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)),
            null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a);
        }
      }
      function En(t, e, n) {
        On(t, e, 3, n);
      }
      function Tn(t, e, n, i) {
        (3 & t[2]) === n && On(t, e, n, i);
      }
      function An(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function On(t, e, n, i) {
        const s = null != i ? i : -1;
        let r = 0;
        for (let o = void 0 !== i ? 65535 & t[18] : 0; o < e.length; o++)
          if ("number" == typeof e[o + 1]) {
            if (((r = e[o]), null != i && r >= i)) break;
          } else
            e[o] < 0 && (t[18] += 65536),
              (r < s || -1 == s) &&
                (In(t, n, e, o), (t[18] = (4294901760 & t[18]) + o + 2)),
              o++;
      }
      function In(t, e, n, i) {
        const s = n[i] < 0,
          r = n[i + 1],
          o = t[s ? -n[i] : n[i]];
        s
          ? t[2] >> 11 < t[18] >> 16 &&
            (3 & t[2]) === e &&
            ((t[2] += 2048), r.call(o))
          : r.call(o);
      }
      class Pn {
        constructor(t, e, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n);
        }
      }
      function Rn(t, e, n) {
        const i = Le(t);
        let s = 0;
        for (; s < n.length; ) {
          const r = n[s];
          if ("number" == typeof r) {
            if (0 !== r) break;
            s++;
            const o = n[s++],
              a = n[s++],
              l = n[s++];
            i ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
          } else {
            const o = r,
              a = n[++s];
            Nn(o)
              ? i && t.setProperty(e, o, a)
              : i
              ? t.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              s++;
          }
        }
        return s;
      }
      function Dn(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function Nn(t) {
        return 64 === t.charCodeAt(0);
      }
      function Fn(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let i = 0; i < e.length; i++) {
            const s = e[i];
            "number" == typeof s
              ? (n = s)
              : 0 === n ||
                Ln(t, n, s, null, -1 === n || 2 === n ? e[++i] : null);
          }
        }
        return t;
      }
      function Ln(t, e, n, i, s) {
        let r = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; r < t.length; ) {
            const n = t[r++];
            if ("number" == typeof n) {
              if (n === e) {
                o = -1;
                break;
              }
              if (n > e) {
                o = r - 1;
                break;
              }
            }
          }
        for (; r < t.length; ) {
          const e = t[r];
          if ("number" == typeof e) break;
          if (e === n) {
            if (null === i) return void (null !== s && (t[r + 1] = s));
            if (i === t[r + 1]) return void (t[r + 2] = s);
          }
          r++, null !== i && r++, null !== s && r++;
        }
        -1 !== o && (t.splice(o, 0, e), (r = o + 1)),
          t.splice(r++, 0, n),
          null !== i && t.splice(r++, 0, i),
          null !== s && t.splice(r++, 0, s);
      }
      function Mn(t) {
        return -1 !== t;
      }
      function jn(t) {
        return 32767 & t;
      }
      function Vn(t) {
        return t >> 16;
      }
      function $n(t, e) {
        let n = Vn(t),
          i = e;
        for (; n > 0; ) (i = i[15]), n--;
        return i;
      }
      function Hn(t) {
        return "string" == typeof t ? t : null == t ? "" : "" + t;
      }
      function Bn(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : Hn(t);
      }
      const Un = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(At))();
      function zn(t) {
        return t instanceof Function ? t() : t;
      }
      let qn = !0;
      function Wn(t) {
        const e = qn;
        return (qn = t), e;
      }
      let Gn = 0;
      function Zn(t, e) {
        const n = Qn(t, e);
        if (-1 !== n) return n;
        const i = e[1];
        i.firstCreatePass &&
          ((t.injectorIndex = e.length),
          Kn(i.data, t),
          Kn(e, null),
          Kn(i.blueprint, null));
        const s = Xn(t, e),
          r = t.injectorIndex;
        if (Mn(s)) {
          const t = jn(s),
            n = $n(s, e),
            i = n[1].data;
          for (let s = 0; s < 8; s++) e[r + s] = n[t + s] | i[t + s];
        }
        return (e[r + 8] = s), r;
      }
      function Kn(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function Qn(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null == e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function Xn(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = e[6],
          i = 1;
        for (; n && -1 === n.injectorIndex; )
          (n = (e = e[15]) ? e[6] : null), i++;
        return n ? n.injectorIndex | (i << 16) : -1;
      }
      function Yn(t, e, n) {
        !(function (t, e, n) {
          let i;
          "string" == typeof n
            ? (i = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Ft) && (i = n[Ft]),
            null == i && (i = n[Ft] = Gn++);
          const s = 255 & i,
            r = 1 << s,
            o = 64 & s,
            a = 32 & s,
            l = e.data;
          128 & s
            ? o
              ? a
                ? (l[t + 7] |= r)
                : (l[t + 6] |= r)
              : a
              ? (l[t + 5] |= r)
              : (l[t + 4] |= r)
            : o
            ? a
              ? (l[t + 3] |= r)
              : (l[t + 2] |= r)
            : a
            ? (l[t + 1] |= r)
            : (l[t] |= r);
        })(t, e, n);
      }
      function Jn(t, e, n, i = rt.Default, s) {
        if (null !== t) {
          const s = (function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(Ft) ? t[Ft] : void 0;
            return "number" == typeof e && e > 0 ? 255 & e : e;
          })(n);
          if ("function" == typeof s) {
            mn(e, t);
            try {
              const t = s();
              if (null != t || i & rt.Optional) return t;
              throw new Error(`No provider for ${Bn(n)}!`);
            } finally {
              vn();
            }
          } else if ("number" == typeof s) {
            if (-1 === s) return new oi(t, e);
            let r = null,
              o = Qn(t, e),
              a = -1,
              l = i & rt.Host ? e[16][6] : null;
            for (
              (-1 === o || i & rt.SkipSelf) &&
              ((a = -1 === o ? Xn(t, e) : e[o + 8]),
              ri(i, !1) ? ((r = e[1]), (o = jn(a)), (e = $n(a, e))) : (o = -1));
              -1 !== o;

            ) {
              a = e[o + 8];
              const t = e[1];
              if (si(s, o, t.data)) {
                const t = ei(o, e, n, r, i, l);
                if (t !== ti) return t;
              }
              ri(i, e[1].data[o + 8] === l) && si(s, o, e)
                ? ((r = t), (o = jn(a)), (e = $n(a, e)))
                : (o = -1);
            }
          }
        }
        if (
          (i & rt.Optional && void 0 === s && (s = null),
          0 == (i & (rt.Self | rt.Host)))
        ) {
          const t = e[9],
            r = zt(void 0);
          try {
            return t ? t.get(n, s, i & rt.Optional) : Zt(n, s, i & rt.Optional);
          } finally {
            zt(r);
          }
        }
        if (i & rt.Optional) return s;
        throw new Error(`NodeInjector: NOT_FOUND [${Bn(n)}]`);
      }
      const ti = {};
      function ei(t, e, n, i, s, r) {
        const o = e[1],
          a = o.data[t + 8],
          l = ni(
            a,
            o,
            n,
            null == i ? ke(a) && qn : i != o && 3 === a.type,
            s & rt.Host && r === a
          );
        return null !== l ? ii(e, o, l, a) : ti;
      }
      function ni(t, e, n, i, s) {
        const r = t.providerIndexes,
          o = e.data,
          a = 1048575 & r,
          l = t.directiveStart,
          c = r >> 20,
          h = s ? a + c : t.directiveEnd;
        for (let u = i ? a : a + c; u < h; u++) {
          const t = o[u];
          if ((u < l && n === t) || (u >= l && t.type === n)) return u;
        }
        if (s) {
          const t = o[l];
          if (t && Te(t) && t.type === n) return l;
        }
        return null;
      }
      function ii(t, e, n, i) {
        let s = t[n];
        const r = e.data;
        if (s instanceof Pn) {
          const o = s;
          if (o.resolving) throw new Error("Circular dep for " + Bn(r[n]));
          const a = Wn(o.canSeeViewProviders);
          let l;
          (o.resolving = !0), o.injectImpl && (l = zt(o.injectImpl)), mn(t, i);
          try {
            (s = t[n] = o.factory(void 0, r, t, i)),
              e.firstCreatePass &&
                n >= i.directiveStart &&
                (function (t, e, n) {
                  const {
                    ngOnChanges: i,
                    ngOnInit: s,
                    ngDoCheck: r,
                  } = e.type.prototype;
                  if (i) {
                    const i = Pe(e);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, i);
                  }
                  s &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s),
                    r &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, r),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, r));
                })(n, r[n], e);
          } finally {
            o.injectImpl && zt(l), Wn(a), (o.resolving = !1), vn();
          }
        }
        return s;
      }
      function si(t, e, n) {
        const i = 64 & t,
          s = 32 & t;
        let r;
        return (
          (r =
            128 & t
              ? i
                ? s
                  ? n[e + 7]
                  : n[e + 6]
                : s
                ? n[e + 5]
                : n[e + 4]
              : i
              ? s
                ? n[e + 3]
                : n[e + 2]
              : s
              ? n[e + 1]
              : n[e]),
          !!(r & (1 << t))
        );
      }
      function ri(t, e) {
        return !(t & rt.Self || (t & rt.Host && e));
      }
      class oi {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return Jn(this._tNode, this._lView, t, void 0, e);
        }
      }
      function ai(t) {
        const e = t;
        if (Ct(t))
          return () => {
            const t = ai(xt(e));
            return t ? t() : null;
          };
        let n = ve(e);
        if (null === n) {
          const t = dt(e);
          n = t && t.factory;
        }
        return n || null;
      }
      function li(t) {
        return J(() => {
          const e = t.prototype.constructor,
            n = e[Nt] || ai(e),
            i = Object.prototype;
          let s = Object.getPrototypeOf(t.prototype).constructor;
          for (; s && s !== i; ) {
            const t = s[Nt] || ai(s);
            if (t && t !== n) return t;
            s = Object.getPrototypeOf(s);
          }
          return (t) => new t();
        });
      }
      function ci(t) {
        return t.ngDebugContext;
      }
      function hi(t) {
        return t.ngOriginalError;
      }
      function ui(t, ...e) {
        t.error(...e);
      }
      class di {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            i = (function (t) {
              return t.ngErrorLogger || ui;
            })(t);
          i(this._console, "ERROR", t),
            e && i(this._console, "ORIGINAL ERROR", e),
            n && i(this._console, "ERROR CONTEXT", n);
        }
        _findContext(t) {
          return t ? (ci(t) ? ci(t) : this._findContext(hi(t))) : null;
        }
        _findOriginalError(t) {
          let e = hi(t);
          for (; e && hi(e); ) e = hi(e);
          return e;
        }
      }
      let pi = !0,
        fi = !1;
      function mi() {
        return (fi = !0), pi;
      }
      function gi(t, e) {
        t.__ngContext__ = e;
      }
      function _i(t) {
        throw new Error(
          "Multiple components match node with tagname " + t.tagName
        );
      }
      function yi() {
        throw new Error("Cannot mix multi providers and regular providers");
      }
      function bi(t, e, n) {
        let i = t.length;
        for (;;) {
          const s = t.indexOf(e, n);
          if (-1 === s) return s;
          if (0 === s || t.charCodeAt(s - 1) <= 32) {
            const n = e.length;
            if (s + n === i || t.charCodeAt(s + n) <= 32) return s;
          }
          n = s + 1;
        }
      }
      function vi(t, e, n) {
        let i = 0;
        for (; i < t.length; ) {
          let s = t[i++];
          if (n && "class" === s) {
            if (((s = t[i]), -1 !== bi(s.toLowerCase(), e, 0))) return !0;
          } else if (1 === s) {
            for (; i < t.length && "string" == typeof (s = t[i++]); )
              if (s.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function wi(t) {
        return 0 === t.type && "ng-template" !== t.tagName;
      }
      function xi(t, e, n) {
        return e === (0 !== t.type || n ? t.tagName : "ng-template");
      }
      function Ci(t, e, n) {
        let i = 4;
        const s = t.attrs || [],
          r = (function (t) {
            for (let e = 0; e < t.length; e++) if (Dn(t[e])) return e;
            return t.length;
          })(s);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & i) {
                if (
                  ((i = 2 | (1 & i)),
                  ("" !== l && !xi(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if (Si(i)) return !1;
                  o = !0;
                }
              } else {
                const c = 8 & i ? l : e[++a];
                if (8 & i && null !== t.attrs) {
                  if (!vi(t.attrs, c, n)) {
                    if (Si(i)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const h = ki(8 & i ? "class" : l, s, wi(t), n);
                if (-1 === h) {
                  if (Si(i)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== c) {
                  let t;
                  t = h > r ? "" : s[h + 1].toLowerCase();
                  const e = 8 & i ? t : null;
                  if ((e && -1 !== bi(e, c, 0)) || (2 & i && c !== t)) {
                    if (Si(i)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !Si(i) && !Si(l)) return !1;
            if (o && Si(l)) continue;
            (o = !1), (i = l | (1 & i));
          }
        }
        return Si(i) || o;
      }
      function Si(t) {
        return 0 == (1 & t);
      }
      function ki(t, e, n, i) {
        if (null === e) return -1;
        let s = 0;
        if (i || !n) {
          let n = !1;
          for (; s < e.length; ) {
            const i = e[s];
            if (i === t) return s;
            if (3 === i || 6 === i) n = !0;
            else {
              if (1 === i || 2 === i) {
                let t = e[++s];
                for (; "string" == typeof t; ) t = e[++s];
                continue;
              }
              if (4 === i) break;
              if (0 === i) {
                s += 4;
                continue;
              }
            }
            s += n ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const i = t[n];
              if ("number" == typeof i) return -1;
              if (i === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function Ei(t, e, n = !1) {
        for (let i = 0; i < e.length; i++) if (Ci(t, e[i], n)) return !0;
        return !1;
      }
      function Ti(t, e) {
        t: for (let n = 0; n < e.length; n++) {
          const i = e[n];
          if (t.length === i.length) {
            for (let e = 0; e < t.length; e++) if (t[e] !== i[e]) continue t;
            return !0;
          }
        }
        return !1;
      }
      function Ai(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function Oi(t) {
        let e = t[0],
          n = 1,
          i = 2,
          s = "",
          r = !1;
        for (; n < t.length; ) {
          let o = t[n];
          if ("string" == typeof o)
            if (2 & i) {
              const e = t[++n];
              s += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]";
            } else 8 & i ? (s += "." + o) : 4 & i && (s += " " + o);
          else
            "" === s || Si(o) || ((e += Ai(r, s)), (s = "")),
              (i = o),
              (r = r || !Si(i));
          n++;
        }
        return "" !== s && (e += Ai(r, s)), e;
      }
      const Ii = {};
      function Pi(t) {
        const e = t[3];
        return Ce(e) ? e[3] : e;
      }
      function Ri(t) {
        return Ni(t[13]);
      }
      function Di(t) {
        return Ni(t[4]);
      }
      function Ni(t) {
        for (; null !== t && !Ce(t); ) t = t[4];
        return t;
      }
      function Fi(t) {
        Li(Je(), Ye(), xn() + t, on());
      }
      function Li(t, e, n, i) {
        if (!i)
          if (3 == (3 & e[2])) {
            const i = t.preOrderCheckHooks;
            null !== i && En(e, i, n);
          } else {
            const i = t.preOrderHooks;
            null !== i && Tn(e, i, 0, n);
          }
        Cn(n);
      }
      function Mi(t, e) {
        return (t << 17) | (e << 2);
      }
      function ji(t) {
        return (t >> 17) & 32767;
      }
      function Vi(t) {
        return 2 | t;
      }
      function $i(t) {
        return (131068 & t) >> 2;
      }
      function Hi(t, e) {
        return (-131069 & t) | (e << 2);
      }
      function Bi(t) {
        return 1 | t;
      }
      function Ui(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let i = 0; i < n.length; i += 2) {
            const s = n[i],
              r = n[i + 1];
            if (-1 !== r) {
              const n = t.data[r];
              fn(s), n.contentQueries(2, e[r], r);
            }
          }
      }
      function zi(t, e, n) {
        return Le(e)
          ? e.createElement(t, n)
          : null === n
          ? e.createElement(t)
          : e.createElementNS(n, t);
      }
      function qi(t, e, n, i, s, r, o, a, l, c) {
        const h = e.blueprint.slice();
        return (
          (h[0] = s),
          (h[2] = 140 | i),
          Ze(h),
          (h[3] = h[15] = t),
          (h[8] = n),
          (h[10] = o || (t && t[10])),
          (h[11] = a || (t && t[11])),
          (h[12] = l || (t && t[12]) || null),
          (h[9] = c || (t && t[9]) || null),
          (h[6] = r),
          (h[16] = 2 == e.type ? t[16] : h),
          h
        );
      }
      function Wi(t, e, n, i, s, r) {
        const o = n + 20,
          a =
            t.data[o] ||
            (function (t, e, n, i, s, r) {
              const o = en(),
                a = sn(),
                l = a ? o : o && o.parent,
                c = (t.data[n] = is(0, l && l !== e ? l : null, i, n, s, r));
              return (
                null === t.firstChild && (t.firstChild = c),
                o &&
                  (!a || null != o.child || (null === c.parent && 2 !== o.type)
                    ? a || (o.next = c)
                    : (o.child = c)),
                c
              );
            })(t, e, o, i, s, r);
        return nn(a, !0), a;
      }
      function Gi(t, e, n) {
        gn(e, e[6]);
        try {
          const i = t.viewQuery;
          null !== i && ks(1, i, n);
          const s = t.template;
          null !== s && Qi(t, e, s, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && Ui(t, e),
            t.staticViewQueries && ks(2, t.viewQuery, n);
          const r = t.components;
          null !== r &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) vs(t, e[n]);
            })(e, r);
        } catch (i) {
          throw (t.firstCreatePass && (t.incompleteFirstPass = !0), i);
        } finally {
          (e[2] &= -5), wn();
        }
      }
      function Zi(t, e, n, i) {
        const s = e[2];
        if (256 == (256 & s)) return;
        gn(e, e[6]);
        const r = on();
        try {
          Ze(e),
            (Qe.lFrame.bindingIndex = t.bindingStartIndex),
            null !== n && Qi(t, e, n, 2, i);
          const o = 3 == (3 & s);
          if (!r)
            if (o) {
              const n = t.preOrderCheckHooks;
              null !== n && En(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && Tn(e, n, 0, null), An(e, 0);
            }
          if (
            ((function (t) {
              for (let e = Ri(t); null !== e; e = Di(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e],
                    i = n[3];
                  0 == (1024 & n[2]) && Ke(i, 1), (n[2] |= 1024);
                }
              }
            })(e),
            (function (t) {
              for (let e = Ri(t); null !== e; e = Di(e))
                for (let t = 10; t < e.length; t++) {
                  const n = e[t],
                    i = n[1];
                  We(n) && Zi(i, n, i.template, n[8]);
                }
            })(e),
            null !== t.contentQueries && Ui(t, e),
            !r)
          )
            if (o) {
              const n = t.contentCheckHooks;
              null !== n && En(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && Tn(e, n, 1), An(e, 1);
            }
          !(function (t, e) {
            try {
              const n = t.expandoInstructions;
              if (null !== n) {
                let i = t.expandoStartIndex,
                  s = -1,
                  r = -1;
                for (let t = 0; t < n.length; t++) {
                  const o = n[t];
                  "number" == typeof o
                    ? o <= 0
                      ? ((r = 0 - o), Cn(r), (i += 9 + n[++t]), (s = i))
                      : (i += o)
                    : (null !== o && (hn(i, s), o(2, e[s])), s++);
                }
              }
            } finally {
              Cn(-1);
            }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) bs(t, e[n]);
            })(e, a);
          const l = t.viewQuery;
          if ((null !== l && ks(2, l, i), !r))
            if (o) {
              const n = t.viewCheckHooks;
              null !== n && En(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && Tn(e, n, 2), An(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            r || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), Ke(e[3], -1));
        } finally {
          wn();
        }
      }
      function Ki(t, e, n, i) {
        const s = e[10],
          r = !on(),
          o = qe(e);
        try {
          r && !o && s.begin && s.begin(), o && Gi(t, e, i), Zi(t, e, n, i);
        } finally {
          r && !o && s.end && s.end();
        }
      }
      function Qi(t, e, n, i, s) {
        const r = xn();
        try {
          Cn(-1), 2 & i && e.length > 20 && Li(t, e, 0, on()), n(i, s);
        } finally {
          Cn(r);
        }
      }
      function Xi(t, e, n) {
        if (Se(e)) {
          const i = e.directiveEnd;
          for (let s = e.directiveStart; s < i; s++) {
            const e = t.data[s];
            e.contentQueries && e.contentQueries(1, n[s], s);
          }
        }
      }
      function Yi(t, e, n) {
        Xe() &&
          ((function (t, e, n, i) {
            const s = n.directiveStart,
              r = n.directiveEnd;
            t.firstCreatePass || Zn(n, e), gi(i, e);
            const o = n.initialInputs;
            for (let a = s; a < r; a++) {
              const i = t.data[a],
                r = Te(i);
              r && ms(e, n, i);
              const l = ii(e, t, a, n);
              gi(l, e),
                null !== o && gs(0, a - s, l, i, 0, o),
                r && (Ue(n.index, e)[8] = l);
            }
          })(t, e, n, $e(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const i = n.directiveStart,
                s = n.directiveEnd,
                r = t.expandoInstructions,
                o = t.firstCreatePass,
                a = n.index - 20,
                l = Qe.lFrame.currentDirectiveIndex;
              try {
                Cn(a);
                for (let n = i; n < s; n++) {
                  const i = t.data[n],
                    s = e[n];
                  un(n),
                    null !== i.hostBindings ||
                    0 !== i.hostVars ||
                    null !== i.hostAttrs
                      ? cs(i, s)
                      : o && r.push(null);
                }
              } finally {
                Cn(-1), un(l);
              }
            })(t, e, n));
      }
      function Ji(t, e, n = $e) {
        const i = e.localNames;
        if (null !== i) {
          let s = e.index + 1;
          for (let r = 0; r < i.length; r += 2) {
            const o = i[r + 1],
              a = -1 === o ? n(e, t) : t[o];
            t[s++] = a;
          }
        }
      }
      function ts(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = es(
              1,
              -1,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function es(t, e, n, i, s, r, o, a, l, c) {
        const h = 20 + i,
          u = h + s,
          d = (function (t, e) {
            const n = [];
            for (let i = 0; i < e; i++) n.push(i < t ? null : Ii);
            return n;
          })(h, u);
        return (d[1] = {
          type: t,
          id: e,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          node: null,
          data: d.slice().fill(null, h),
          bindingStartIndex: h,
          expandoStartIndex: u,
          expandoInstructions: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof r ? r() : r,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: c,
          incompleteFirstPass: !1,
        });
      }
      function ns(t, e, n, i) {
        const s = Ts(e);
        s.push(n),
          t.firstCreatePass &&
            (function (t) {
              return t.cleanup || (t.cleanup = []);
            })(t).push(i, s.length - 1);
      }
      function is(t, e, n, i, s, r) {
        return {
          type: n,
          index: i,
          injectorIndex: e ? e.injectorIndex : -1,
          directiveStart: -1,
          directiveEnd: -1,
          directiveStylingLast: -1,
          propertyBindings: null,
          flags: 0,
          providerIndexes: 0,
          tagName: s,
          attrs: r,
          mergedAttrs: null,
          localNames: null,
          initialInputs: void 0,
          inputs: null,
          outputs: null,
          tViews: null,
          next: null,
          projectionNext: null,
          child: null,
          parent: e,
          projection: null,
          styles: null,
          stylesWithoutHost: null,
          residualStyles: void 0,
          classes: null,
          classesWithoutHost: null,
          residualClasses: void 0,
          classBindings: 0,
          styleBindings: 0,
        };
      }
      function ss(t, e, n) {
        for (let i in t)
          if (t.hasOwnProperty(i)) {
            const s = t[i];
            (n = null === n ? {} : n).hasOwnProperty(i)
              ? n[i].push(e, s)
              : (n[i] = [e, s]);
          }
        return n;
      }
      function rs(t, e, n, i, s, r, o, a) {
        const l = $e(e, n);
        let c,
          h = e.inputs;
        var u;
        !a && null != h && (c = h[i])
          ? (Is(t, n, c, i, s),
            ke(e) &&
              (function (t, e) {
                const n = Ue(e, t);
                16 & n[2] || (n[2] |= 64);
              })(n, e.index))
          : 3 === e.type &&
            ((i =
              "class" === (u = i)
                ? "className"
                : "for" === u
                ? "htmlFor"
                : "formaction" === u
                ? "formAction"
                : "innerHtml" === u
                ? "innerHTML"
                : "readonly" === u
                ? "readOnly"
                : "tabindex" === u
                ? "tabIndex"
                : u),
            (s = null != o ? o(s, e.tagName || "", i) : s),
            Le(r)
              ? r.setProperty(l, i, s)
              : Nn(i) || (l.setProperty ? l.setProperty(i, s) : (l[i] = s)));
      }
      function os(t, e, n, i) {
        let s = !1;
        if (Xe()) {
          const r = (function (t, e, n) {
              const i = t.directiveRegistry;
              let s = null;
              if (i)
                for (let r = 0; r < i.length; r++) {
                  const o = i[r];
                  Ei(n, o.selectors, !1) &&
                    (s || (s = []),
                    Yn(Zn(n, e), t, o.type),
                    Te(o)
                      ? (2 & n.flags && _i(n), us(t, n), s.unshift(o))
                      : s.push(o));
                }
              return s;
            })(t, e, n),
            o = null === i ? null : { "": -1 };
          if (null !== r) {
            let i = 0;
            (s = !0), ps(n, t.data.length, r.length);
            for (let t = 0; t < r.length; t++) {
              const e = r[t];
              e.providersResolver && e.providersResolver(e);
            }
            hs(t, n, r.length);
            let a = !1,
              l = !1;
            for (let s = 0; s < r.length; s++) {
              const c = r[s];
              (n.mergedAttrs = Fn(n.mergedAttrs, c.hostAttrs)),
                fs(t, e, c),
                ds(t.data.length - 1, c, o),
                null !== c.contentQueries && (n.flags |= 8),
                (null === c.hostBindings &&
                  null === c.hostAttrs &&
                  0 === c.hostVars) ||
                  (n.flags |= 128);
              const h = c.type.prototype;
              !a &&
                (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index - 20),
                (a = !0)),
                l ||
                  (!h.ngOnChanges && !h.ngDoCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index - 20
                  ),
                  (l = !0)),
                as(t, c),
                (i += c.hostVars);
            }
            !(function (t, e) {
              const n = e.directiveEnd,
                i = t.data,
                s = e.attrs,
                r = [];
              let o = null,
                a = null;
              for (let l = e.directiveStart; l < n; l++) {
                const t = i[l],
                  n = t.inputs,
                  c = null === s || wi(e) ? null : _s(n, s);
                r.push(c), (o = ss(n, l, o)), (a = ss(t.outputs, l, a));
              }
              null !== o &&
                (o.hasOwnProperty("class") && (e.flags |= 16),
                o.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = r),
                (e.inputs = o),
                (e.outputs = a);
            })(t, n),
              ls(t, e, i);
          }
          o &&
            (function (t, e, n) {
              if (e) {
                const i = (t.localNames = []);
                for (let t = 0; t < e.length; t += 2) {
                  const s = n[e[t + 1]];
                  if (null == s)
                    throw new Error(`Export of name '${e[t + 1]}' not found!`);
                  i.push(e[t], s);
                }
              }
            })(n, i, o);
        }
        return (n.mergedAttrs = Fn(n.mergedAttrs, n.attrs)), s;
      }
      function as(t, e) {
        const n = t.expandoInstructions;
        n.push(e.hostBindings), 0 !== e.hostVars && n.push(e.hostVars);
      }
      function ls(t, e, n) {
        for (let i = 0; i < n; i++)
          e.push(Ii), t.blueprint.push(Ii), t.data.push(null);
      }
      function cs(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function hs(t, e, n) {
        const i = 20 - e.index,
          s = t.data.length - (1048575 & e.providerIndexes);
        (t.expandoInstructions || (t.expandoInstructions = [])).push(i, s, n);
      }
      function us(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function ds(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let i = 0; i < e.exportAs.length; i++) n[e.exportAs[i]] = t;
          Te(e) && (n[""] = t);
        }
      }
      function ps(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function fs(t, e, n) {
        t.data.push(n);
        const i = n.factory || (n.factory = ve(n.type)),
          s = new Pn(i, Te(n), null);
        t.blueprint.push(s), e.push(s);
      }
      function ms(t, e, n) {
        const i = $e(e, t),
          s = ts(n),
          r = t[10],
          o = ws(
            t,
            qi(t, s, null, n.onPush ? 64 : 16, i, e, r, r.createRenderer(i, n))
          );
        t[e.index] = o;
      }
      function gs(t, e, n, i, s, r) {
        const o = r[e];
        if (null !== o) {
          const t = i.setInput;
          for (let e = 0; e < o.length; ) {
            const s = o[e++],
              r = o[e++],
              a = o[e++];
            null !== t ? i.setInput(n, a, s, r) : (n[r] = a);
          }
        }
      }
      function _s(t, e) {
        let n = null,
          i = 0;
        for (; i < e.length; ) {
          const s = e[i];
          if (0 !== s)
            if (5 !== s) {
              if ("number" == typeof s) break;
              t.hasOwnProperty(s) &&
                (null === n && (n = []), n.push(s, t[s], e[i + 1])),
                (i += 2);
            } else i += 2;
          else i += 4;
        }
        return n;
      }
      function ys(t, e, n, i) {
        return new Array(t, !0, !1, e, null, 0, i, n, null, null);
      }
      function bs(t, e) {
        const n = Ue(e, t);
        if (We(n)) {
          const t = n[1];
          80 & n[2]
            ? Zi(t, n, t.template, n[8])
            : n[5] > 0 &&
              (function t(e) {
                for (let i = Ri(e); null !== i; i = Di(i))
                  for (let e = 10; e < i.length; e++) {
                    const n = i[e];
                    if (1024 & n[2]) {
                      const t = n[1];
                      Zi(t, n, t.template, n[8]);
                    } else n[5] > 0 && t(n);
                  }
                const n = e[1].components;
                if (null !== n)
                  for (let i = 0; i < n.length; i++) {
                    const s = Ue(n[i], e);
                    We(s) && s[5] > 0 && t(s);
                  }
              })(n);
        }
      }
      function vs(t, e) {
        const n = Ue(e, t),
          i = n[1];
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(i, n),
          Gi(i, n, n[8]);
      }
      function ws(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function xs(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = Pi(t);
          if (Ae(t) && !e) return t;
          t = e;
        }
        return null;
      }
      function Cs(t, e, n) {
        const i = e[10];
        i.begin && i.begin();
        try {
          Zi(t, e, t.template, n);
        } catch (s) {
          throw (Os(e, s), s);
        } finally {
          i.end && i.end();
        }
      }
      function Ss(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              i = ze(n),
              s = i[1];
            Ki(s, i, s.template, n);
          }
        })(t[8]);
      }
      function ks(t, e, n) {
        fn(0), e(t, n);
      }
      const Es = (() => Promise.resolve(null))();
      function Ts(t) {
        return t[7] || (t[7] = []);
      }
      function As(t, e, n) {
        return (
          (null === t || Te(t)) &&
            (n = (function (t) {
              for (; Array.isArray(t); ) {
                if ("object" == typeof t[1]) return t;
                t = t[0];
              }
              return null;
            })(n[e.index])),
          n[11]
        );
      }
      function Os(t, e) {
        const n = t[9],
          i = n ? n.get(di, null) : null;
        i && i.handleError(e);
      }
      function Is(t, e, n, i, s) {
        for (let r = 0; r < n.length; ) {
          const o = n[r++],
            a = n[r++],
            l = e[o],
            c = t.data[o];
          null !== c.setInput ? c.setInput(l, s, i, a) : (l[a] = s);
        }
      }
      function Ps(t, e) {
        const n = e[3];
        return -1 === t.index ? (Ce(n) ? n : null) : n;
      }
      function Rs(t, e) {
        const n = Ps(t, e);
        return n ? zs(e[11], n[7]) : null;
      }
      function Ds(t, e, n, i, s) {
        if (null != i) {
          let r,
            o = !1;
          Ce(i) ? (r = i) : xe(i) && ((o = !0), (i = i[0]));
          const a = je(i);
          0 === t && null !== n
            ? null == s
              ? Bs(e, n, a)
              : Hs(e, n, a, s || null)
            : 1 === t && null !== n
            ? Hs(e, n, a, s || null)
            : 2 === t
            ? (function (t, e, n) {
                const i = zs(t, e);
                i &&
                  (function (t, e, n, i) {
                    Le(t) ? t.removeChild(e, n, i) : e.removeChild(n);
                  })(t, i, e, n);
              })(e, a, o)
            : 3 === t && e.destroyNode(a),
            null != r &&
              (function (t, e, n, i, s) {
                const r = n[7];
                r !== je(n) && Ds(e, t, i, r, s);
                for (let o = 10; o < n.length; o++) {
                  const s = n[o];
                  Ks(s[1], s, t, e, i, r);
                }
              })(e, t, r, n, s);
        }
      }
      function Ns(t, e, n, i) {
        const s = Rs(t.node, e);
        s && Ks(t, e, e[11], n ? 1 : 2, s, i);
      }
      function Fs(t, e) {
        const n = t[9],
          i = n.indexOf(e);
        1024 & e[2] && Ke(e[3], -1), n.splice(i, 1);
      }
      function Ls(t, e) {
        if (t.length <= 10) return;
        const n = 10 + e,
          i = t[n];
        if (i) {
          const s = i[17];
          null !== s && s !== t && Fs(s, i), e > 0 && (t[n - 1][4] = i[4]);
          const r = ee(t, 10 + e);
          Ns(i[1], i, !1, null);
          const o = r[19];
          null !== o && o.detachView(r[1]),
            (i[3] = null),
            (i[4] = null),
            (i[2] &= -129);
        }
        return i;
      }
      function Ms(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          Le(n) && n.destroyNode && Ks(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return Vs(t[1], t);
              for (; e; ) {
                let n = null;
                if (xe(e)) n = e[13];
                else {
                  const t = e[10];
                  t && (n = t);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    xe(e) && Vs(e[1], e), (e = js(e, t));
                  null === e && (e = t), xe(e) && Vs(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function js(t, e) {
        let n;
        return xe(t) && (n = t[6]) && 2 === n.type
          ? Ps(n, t)
          : t[3] === e
          ? null
          : t[3];
      }
      function Vs(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let i = 0; i < n.length; i += 2) {
                  const t = e[n[i]];
                  if (!(t instanceof Pn)) {
                    const e = n[i + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2)
                        e[n + 1].call(t[e[n]]);
                    else e.call(t);
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup;
              if (null !== n) {
                const t = e[7];
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 1],
                      r = "function" == typeof s ? s(e) : je(e[s]),
                      o = t[n[i + 2]],
                      a = n[i + 3];
                    "boolean" == typeof a
                      ? r.removeEventListener(n[i], o, a)
                      : a >= 0
                      ? t[a]()
                      : t[-a].unsubscribe(),
                      (i += 2);
                  } else n[i].call(t[n[i + 1]]);
                e[7] = null;
              }
            })(t, e);
          const n = e[6];
          n && 3 === n.type && Le(e[11]) && e[11].destroy();
          const i = e[17];
          if (null !== i && Ce(e[3])) {
            i !== e[3] && Fs(i, e);
            const n = e[19];
            null !== n && n.detachView(t);
          }
        }
      }
      function $s(t, e, n) {
        let i = e.parent;
        for (; null != i && (4 === i.type || 5 === i.type); )
          i = (e = i).parent;
        if (null == i) {
          const t = n[6];
          return 2 === t.type ? Rs(t, n) : n[0];
        }
        if (e && 5 === e.type && 4 & e.flags) return $e(e, n).parentNode;
        if (2 & i.flags) {
          const e = t.data,
            n = e[e[i.index].directiveStart].encapsulation;
          if (n !== ae.ShadowDom && n !== ae.Native) return null;
        }
        return $e(i, n);
      }
      function Hs(t, e, n, i) {
        Le(t) ? t.insertBefore(e, n, i) : e.insertBefore(n, i, !0);
      }
      function Bs(t, e, n) {
        Le(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function Us(t, e, n, i) {
        null !== i ? Hs(t, e, n, i) : Bs(t, e, n);
      }
      function zs(t, e) {
        return Le(t) ? t.parentNode(e) : e.parentNode;
      }
      function qs(t, e) {
        if (2 === t.type) {
          const n = Ps(t, e);
          return null === n ? null : Gs(n.indexOf(e, 10) - 10, n);
        }
        return 4 === t.type || 5 === t.type ? $e(t, e) : null;
      }
      function Ws(t, e, n, i) {
        const s = $s(t, i, e);
        if (null != s) {
          const t = e[11],
            r = qs(i.parent || e[6], e);
          if (Array.isArray(n))
            for (let e = 0; e < n.length; e++) Us(t, s, n[e], r);
          else Us(t, s, n, r);
        }
      }
      function Gs(t, e) {
        const n = 10 + t + 1;
        if (n < e.length) {
          const t = e[n],
            i = t[1].firstChild;
          if (null !== i)
            return (function t(e, n) {
              if (null !== n) {
                const i = n.type;
                if (3 === i) return $e(n, e);
                if (0 === i) return Gs(-1, e[n.index]);
                if (4 === i || 5 === i) {
                  const i = n.child;
                  if (null !== i) return t(e, i);
                  {
                    const t = e[n.index];
                    return Ce(t) ? Gs(-1, t) : je(t);
                  }
                }
                {
                  const i = e[16],
                    s = i[6],
                    r = Pi(i),
                    o = s.projection[n.projection];
                  return null != o ? t(r, o) : t(e, n.next);
                }
              }
              return null;
            })(t, i);
        }
        return e[7];
      }
      function Zs(t, e, n, i, s, r, o) {
        for (; null != n; ) {
          const a = i[n.index],
            l = n.type;
          o && 0 === e && (a && gi(je(a), i), (n.flags |= 4)),
            64 != (64 & n.flags) &&
              (4 === l || 5 === l
                ? (Zs(t, e, n.child, i, s, r, !1), Ds(e, t, s, a, r))
                : 1 === l
                ? Qs(t, e, i, n, s, r)
                : Ds(e, t, s, a, r)),
            (n = o ? n.projectionNext : n.next);
        }
      }
      function Ks(t, e, n, i, s, r) {
        Zs(n, i, t.node.child, e, s, r, !1);
      }
      function Qs(t, e, n, i, s, r) {
        const o = n[16],
          a = o[6].projection[i.projection];
        if (Array.isArray(a))
          for (let l = 0; l < a.length; l++) Ds(e, t, s, a[l], r);
        else Zs(t, e, a, o[3], s, r, !0);
      }
      function Xs(t, e, n) {
        Le(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function Ys(t, e, n) {
        Le(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      class Js {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._viewContainerRef = null);
        }
        get rootNodes() {
          const t = this._lView;
          return null == t[0]
            ? (function t(e, n, i, s, r = !1) {
                for (; null !== i; ) {
                  const o = n[i.index];
                  if ((null !== o && s.push(je(o)), Ce(o)))
                    for (let e = 10; e < o.length; e++) {
                      const n = o[e],
                        i = n[1].firstChild;
                      null !== i && t(n[1], n, i, s);
                    }
                  const a = i.type;
                  if (4 === a || 5 === a) t(e, n, i.child, s);
                  else if (1 === a) {
                    const e = n[16],
                      r = e[6].projection[i.projection];
                    if (Array.isArray(r)) s.push(...r);
                    else {
                      const n = Pi(e);
                      t(n[1], n, r, s, !0);
                    }
                  }
                  i = r ? i.projectionNext : i.next;
                }
                return s;
              })(t[1], t, t[6].child, [])
            : [];
        }
        get context() {
          return this._lView[8];
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._viewContainerRef) {
            const t = this._viewContainerRef.indexOf(this);
            t > -1 && this._viewContainerRef.detach(t),
              (this._viewContainerRef = null);
          }
          Ms(this._lView[1], this._lView);
        }
        onDestroy(t) {
          ns(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          xs(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          Cs(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            an(!0);
            try {
              Cs(t, e, n);
            } finally {
              an(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef(t) {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._viewContainerRef = t;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null),
            Ks(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._viewContainerRef)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = t;
        }
      }
      class tr extends Js {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          Ss(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            an(!0);
            try {
              Ss(t);
            } finally {
              an(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      let er, nr, ir;
      function sr(t, e, n) {
        return er || (er = class extends t {}), new er($e(e, n));
      }
      function rr(t, e, n, i) {
        return (
          nr ||
            (nr = class extends t {
              constructor(t, e, n) {
                super(),
                  (this._declarationView = t),
                  (this._declarationTContainer = e),
                  (this.elementRef = n);
              }
              createEmbeddedView(t) {
                const e = this._declarationTContainer.tViews,
                  n = qi(this._declarationView, e, t, 16, null, e.node);
                n[17] = this._declarationView[
                  this._declarationTContainer.index
                ];
                const i = this._declarationView[19];
                return (
                  null !== i && (n[19] = i.createEmbeddedView(e)),
                  Gi(e, n, t),
                  new Js(n)
                );
              }
            }),
          0 === n.type ? new nr(i, n, sr(e, n, i)) : null
        );
      }
      function or(t, e, n, i) {
        let s;
        ir ||
          (ir = class extends t {
            constructor(t, e, n) {
              super(),
                (this._lContainer = t),
                (this._hostTNode = e),
                (this._hostView = n);
            }
            get element() {
              return sr(e, this._hostTNode, this._hostView);
            }
            get injector() {
              return new oi(this._hostTNode, this._hostView);
            }
            get parentInjector() {
              const t = Xn(this._hostTNode, this._hostView),
                e = $n(t, this._hostView),
                n = (function (t, e, n) {
                  if (n.parent && -1 !== n.parent.injectorIndex) {
                    const t = n.parent.injectorIndex;
                    let e = n.parent;
                    for (; null != e.parent && t == e.parent.injectorIndex; )
                      e = e.parent;
                    return e;
                  }
                  let i = Vn(t),
                    s = e,
                    r = e[6];
                  for (; i > 1; ) (s = s[15]), (r = s[6]), i--;
                  return r;
                })(t, this._hostView, this._hostTNode);
              return Mn(t) && null != n
                ? new oi(n, e)
                : new oi(null, this._hostView);
            }
            clear() {
              for (; this.length > 0; ) this.remove(this.length - 1);
            }
            get(t) {
              return (
                (null !== this._lContainer[8] && this._lContainer[8][t]) || null
              );
            }
            get length() {
              return this._lContainer.length - 10;
            }
            createEmbeddedView(t, e, n) {
              const i = t.createEmbeddedView(e || {});
              return this.insert(i, n), i;
            }
            createComponent(t, e, n, i, s) {
              const r = n || this.parentInjector;
              if (!s && null == t.ngModule && r) {
                const t = r.get(Xt, null);
                t && (s = t);
              }
              const o = t.create(r, i, void 0, s);
              return this.insert(o.hostView, e), o;
            }
            insert(t, e) {
              const n = t._lView,
                i = n[1];
              if (t.destroyed)
                throw new Error(
                  "Cannot insert a destroyed View in a ViewContainer!"
                );
              if ((this.allocateContainerIfNeeded(), Ce(n[3]))) {
                const e = this.indexOf(t);
                if (-1 !== e) this.detach(e);
                else {
                  const e = n[3],
                    i = new ir(e, e[6], e[3]);
                  i.detach(i.indexOf(t));
                }
              }
              const s = this._adjustIndex(e);
              return (
                (function (t, e, n, i) {
                  const s = 10 + i,
                    r = n.length;
                  i > 0 && (n[s - 1][4] = e),
                    i < r - 10
                      ? ((e[4] = n[s]), te(n, 10 + i, e))
                      : (n.push(e), (e[4] = null)),
                    (e[3] = n);
                  const o = e[17];
                  null !== o &&
                    n !== o &&
                    (function (t, e) {
                      const n = t[9];
                      e[16] !== e[3][3][16] && (t[2] = !0),
                        null === n ? (t[9] = [e]) : n.push(e);
                    })(o, e);
                  const a = e[19];
                  null !== a && a.insertView(t), (e[2] |= 128);
                })(i, n, this._lContainer, s),
                Ns(i, n, !0, Gs(s, this._lContainer)),
                t.attachToViewContainerRef(this),
                te(this._lContainer[8], s, t),
                t
              );
            }
            move(t, e) {
              if (t.destroyed)
                throw new Error(
                  "Cannot move a destroyed View in a ViewContainer!"
                );
              return this.insert(t, e);
            }
            indexOf(t) {
              const e = this._lContainer[8];
              return null !== e ? e.indexOf(t) : -1;
            }
            remove(t) {
              this.allocateContainerIfNeeded();
              const e = this._adjustIndex(t, -1);
              !(function (t, e) {
                const n = Ls(t, e);
                n && Ms(n[1], n);
              })(this._lContainer, e),
                ee(this._lContainer[8], e);
            }
            detach(t) {
              this.allocateContainerIfNeeded();
              const e = this._adjustIndex(t, -1),
                n = Ls(this._lContainer, e);
              return n && null != ee(this._lContainer[8], e) ? new Js(n) : null;
            }
            _adjustIndex(t, e = 0) {
              return null == t ? this.length + e : t;
            }
            allocateContainerIfNeeded() {
              null === this._lContainer[8] && (this._lContainer[8] = []);
            }
          });
        const r = i[n.index];
        if (Ce(r)) s = r;
        else {
          let t;
          if (4 === n.type) t = je(r);
          else if (((t = i[11].createComment("")), Ae(i))) {
            const e = i[11],
              s = $e(n, i);
            Hs(
              e,
              zs(e, s),
              t,
              (function (t, e) {
                return Le(t) ? t.nextSibling(e) : e.nextSibling;
              })(e, s)
            );
          } else Ws(i[1], i, t, n);
          (i[n.index] = s = ys(r, i, t, n)), ws(i, s);
        }
        return new ir(s, n, i);
      }
      function ar(t = !1) {
        return (function (t, e, n) {
          if (!n && ke(t)) {
            const n = Ue(t.index, e);
            return new Js(n, n);
          }
          return 3 === t.type || 0 === t.type || 4 === t.type || 5 === t.type
            ? new Js(e[16], e)
            : null;
        })(en(), Ye(), t);
      }
      let lr = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => cr()), t;
      })();
      const cr = ar,
        hr = Function,
        ur = new Lt("Set Injector scope."),
        dr = {},
        pr = {},
        fr = [];
      let mr = void 0;
      function gr() {
        return void 0 === mr && (mr = new Qt()), mr;
      }
      function _r(t, e = null, n = null, i) {
        return new yr(t, n, e || gr(), i);
      }
      class yr {
        constructor(t, e, n, i = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          e && Jt(e, (n) => this.processProvider(n, t, e)),
            Jt([t], (t) => this.processInjectorType(t, [], s)),
            this.records.set(Mt, wr(void 0, this));
          const r = this.records.get(ur);
          (this.scope = null != r ? r.value : null),
            (this.source = i || ("object" == typeof t ? null : yt(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, e = jt, n = rt.Default) {
          this.assertNotDestroyed();
          const i = Ut(this);
          try {
            if (!(n & rt.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n =
                  ("function" == typeof (s = t) ||
                    ("object" == typeof s && s instanceof Lt)) &&
                  ht(t);
                (e = n && this.injectableDefInScope(n) ? wr(br(t), dr) : null),
                  this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & rt.Self ? gr() : this.parent).get(
              t,
              (e = n & rt.Optional && e === jt ? null : e)
            );
          } catch (r) {
            if ("NullInjectorError" === r.name) {
              if (
                ((r.ngTempTokenPath = r.ngTempTokenPath || []).unshift(yt(t)),
                i)
              )
                throw r;
              return (function (t, e, n, i) {
                const s = t.ngTempTokenPath;
                throw (
                  (e.__source && s.unshift(e.__source),
                  (t.message = (function (t, e, n, i = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.substr(2)
                        : t;
                    let s = yt(e);
                    if (Array.isArray(e)) s = e.map(yt).join(" -> ");
                    else if ("object" == typeof e) {
                      let t = [];
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let i = e[n];
                          t.push(
                            n +
                              ":" +
                              ("string" == typeof i ? JSON.stringify(i) : yt(i))
                          );
                        }
                      s = `{${t.join(", ")}}`;
                    }
                    return `${n}${i ? "(" + i + ")" : ""}[${s}]: ${t.replace(
                      Vt,
                      "\n  "
                    )}`;
                  })("\n" + t.message, s, n, i)),
                  (t.ngTokenPath = s),
                  (t.ngTempTokenPath = null),
                  t)
                );
              })(r, t, "R3InjectorError", this.source);
            }
            throw r;
          } finally {
            Ut(i);
          }
          var s;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((e, n) => t.push(yt(n))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(t, e, n) {
          if (!(t = xt(t))) return !1;
          let i = dt(t);
          const s = (null == i && t.ngModule) || void 0,
            r = void 0 === s ? t : s,
            o = -1 !== n.indexOf(r);
          if ((void 0 !== s && (i = dt(s)), null == i)) return !1;
          if (null != i.imports && !o) {
            let t;
            n.push(r);
            try {
              Jt(i.imports, (i) => {
                this.processInjectorType(i, e, n) &&
                  (void 0 === t && (t = []), t.push(i));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: i } = t[e];
                Jt(i, (t) => this.processProvider(t, n, i || fr));
              }
          }
          this.injectorDefTypes.add(r), this.records.set(r, wr(i.factory, dr));
          const a = i.providers;
          if (null != a && !o) {
            const e = t;
            Jt(a, (t) => this.processProvider(t, e, a));
          }
          return void 0 !== s && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let i = Cr((t = xt(t))) ? t : xt(t && t.provide);
          const s = (function (t, e, n) {
            return xr(t) ? wr(void 0, t.useValue) : wr(vr(t, e, n), dr);
          })(t, e, n);
          if (Cr(t) || !0 !== t.multi) {
            const t = this.records.get(i);
            t && void 0 !== t.multi && yi();
          } else {
            let e = this.records.get(i);
            e
              ? void 0 === e.multi && yi()
              : ((e = wr(void 0, dr, !0)),
                (e.factory = () => Kt(e.multi)),
                this.records.set(i, e)),
              (i = t),
              e.multi.push(t);
          }
          this.records.set(i, s);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === pr
              ? (function (t) {
                  throw new Error("Cannot instantiate cyclic dependency! " + t);
                })(yt(t))
              : e.value === dr && ((e.value = pr), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          return (
            !!t.providedIn &&
            ("string" == typeof t.providedIn
              ? "any" === t.providedIn || t.providedIn === this.scope
              : this.injectorDefTypes.has(t.providedIn))
          );
        }
      }
      function br(t) {
        const e = ht(t),
          n = null !== e ? e.factory : ve(t);
        if (null !== n) return n;
        const i = dt(t);
        if (null !== i) return i.factory;
        if (t instanceof Lt)
          throw new Error(`Token ${yt(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const n = ne(e, "?");
              throw new Error(
                `Can't resolve all parameters for ${yt(t)}: (${n.join(", ")}).`
              );
            }
            const n = (function (t) {
              const e = t && (t[pt] || t[gt] || (t[mt] && t[mt]()));
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error("unreachable");
      }
      function vr(t, e, n) {
        let i = void 0;
        if (Cr(t)) {
          const e = xt(t);
          return ve(e) || br(e);
        }
        if (xr(t)) i = () => xt(t.useValue);
        else if ((s = t) && s.useFactory)
          i = () => t.useFactory(...Kt(t.deps || []));
        else if (
          (function (t) {
            return !(!t || !t.useExisting);
          })(t)
        )
          i = () => Wt(xt(t.useExisting));
        else {
          const s = xt(t && (t.useClass || t.provide));
          if (
            (s ||
              (function (t, e, n) {
                let i = "";
                throw (
                  (t &&
                    e &&
                    (i = ` - only instances of Provider and Type are allowed, got: [${e
                      .map((t) => (t == n ? "?" + n + "?" : "..."))
                      .join(", ")}]`),
                  new Error(`Invalid provider for the NgModule '${yt(t)}'` + i))
                );
              })(e, n, t),
            !(function (t) {
              return !!t.deps;
            })(t))
          )
            return ve(s) || br(s);
          i = () => new s(...Kt(t.deps));
        }
        var s;
        return i;
      }
      function wr(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function xr(t) {
        return null !== t && "object" == typeof t && $t in t;
      }
      function Cr(t) {
        return "function" == typeof t;
      }
      const Sr = function (t, e, n) {
        return (function (t, e = null, n = null, i) {
          const s = _r(t, e, n, i);
          return s._resolveInjectorDefTypes(), s;
        })({ name: n }, e, t, n);
      };
      let kr = (() => {
        class t {
          static create(t, e) {
            return Array.isArray(t)
              ? Sr(t, e, "")
              : Sr(t.providers, t.parent, t.name || "");
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = jt),
          (t.NULL = new Qt()),
          (t.ɵprov = lt({
            token: t,
            providedIn: "any",
            factory: () => Wt(Mt),
          })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      const Er = new Lt("AnalyzeForEntryComponents");
      function Tr(t, e, n) {
        let i = n ? t.styles : null,
          s = n ? t.classes : null,
          r = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const t = e[o];
            "number" == typeof t
              ? (r = t)
              : 1 == r
              ? (s = bt(s, t))
              : 2 == r && (i = bt(i, t + ": " + e[++o] + ";"));
          }
        n ? (t.styles = i) : (t.stylesWithoutHost = i),
          n ? (t.classes = s) : (t.classesWithoutHost = s);
      }
      let Ar = null;
      function Or() {
        if (!Ar) {
          const t = At.Symbol;
          if (t && t.iterator) Ar = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (Ar = n);
            }
          }
        }
        return Ar;
      }
      class Ir {
        constructor(t) {
          this.wrapped = t;
        }
        static wrap(t) {
          return new Ir(t);
        }
        static unwrap(t) {
          return Ir.isWrapped(t) ? t.wrapped : t;
        }
        static isWrapped(t) {
          return t instanceof Ir;
        }
      }
      function Pr(t) {
        return (
          !!Rr(t) && (Array.isArray(t) || (!(t instanceof Map) && Or() in t))
        );
      }
      function Rr(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function Dr(t, e, n) {
        return (t[e] = n);
      }
      function Nr(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function Fr(t, e, n, i) {
        const s = Ye();
        return (
          Nr(s, cn(), e) &&
            (Je(),
            (function (t, e, n, i, s, r) {
              const o = $e(t, e),
                a = e[11];
              if (null == i)
                Le(a) ? a.removeAttribute(o, n, r) : o.removeAttribute(n);
              else {
                const e = null == s ? Hn(i) : s(i, t.tagName || "", n);
                Le(a)
                  ? a.setAttribute(o, n, e, r)
                  : r
                  ? o.setAttributeNS(r, n, e)
                  : o.setAttribute(n, e);
              }
            })(Sn(), s, t, e, n, i)),
          Fr
        );
      }
      function Lr(t, e, n, i, s, r, o, a) {
        const l = Ye(),
          c = Je(),
          h = t + 20,
          u = c.firstCreatePass
            ? (function (t, e, n, i, s, r, o, a, l) {
                const c = e.consts,
                  h = Wi(e, n[6], t, 0, o || null, Ge(c, a));
                os(e, n, h, Ge(c, l)), kn(e, h);
                const u = (h.tViews = es(
                    2,
                    -1,
                    i,
                    s,
                    r,
                    e.directiveRegistry,
                    e.pipeRegistry,
                    null,
                    e.schemas,
                    c
                  )),
                  d = is(0, null, 2, -1, null, null);
                return (
                  (d.injectorIndex = h.injectorIndex),
                  (u.node = d),
                  null !== e.queries &&
                    (e.queries.template(e, h),
                    (u.queries = e.queries.embeddedTView(h))),
                  h
                );
              })(t, c, l, e, n, i, s, r, o)
            : c.data[h];
        nn(u, !1);
        const d = l[11].createComment("");
        Ws(c, l, d, u),
          gi(d, l),
          ws(l, (l[h] = ys(d, l, d, u))),
          Ee(u) && Yi(c, l, u),
          null != o && Ji(l, u, a);
      }
      function Mr(t) {
        return Be(Qe.lFrame.contextLView, t);
      }
      function jr(t, e = rt.Default) {
        const n = Ye();
        return null == n ? Wt(t, e) : Jn(en(), n, xt(t), e);
      }
      function Vr(t) {
        return (function (t, e) {
          if ("class" === e) return t.classes;
          if ("style" === e) return t.styles;
          const n = t.attrs;
          if (n) {
            const t = n.length;
            let i = 0;
            for (; i < t; ) {
              const s = n[i];
              if (Dn(s)) break;
              if (0 === s) i += 2;
              else if ("number" == typeof s)
                for (i++; i < t && "string" == typeof n[i]; ) i++;
              else {
                if (s === e) return n[i + 1];
                i += 2;
              }
            }
          }
          return null;
        })(en(), t);
      }
      function $r(t, e, n) {
        const i = Ye();
        return Nr(i, cn(), e) && rs(Je(), Sn(), i, t, e, i[11], n, !1), $r;
      }
      function Hr(t, e, n, i, s) {
        const r = s ? "class" : "style";
        Is(t, n, e.inputs[r], r, i);
      }
      function Br(t, e, n, i) {
        const s = Ye(),
          r = Je(),
          o = 20 + t,
          a = s[11],
          l = (s[o] = zi(e, a, Qe.lFrame.currentNamespace)),
          c = r.firstCreatePass
            ? (function (t, e, n, i, s, r, o) {
                const a = e.consts,
                  l = Ge(a, r),
                  c = Wi(e, n[6], t, 3, s, l);
                return (
                  os(e, n, c, Ge(a, o)),
                  null !== c.attrs && Tr(c, c.attrs, !1),
                  null !== c.mergedAttrs && Tr(c, c.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, c),
                  c
                );
              })(t, r, s, 0, e, n, i)
            : r.data[o];
        nn(c, !0);
        const h = c.mergedAttrs;
        null !== h && Rn(a, l, h);
        const u = c.classes;
        null !== u && Ys(a, l, u);
        const d = c.styles;
        null !== d && Xs(a, l, d),
          Ws(r, s, l, c),
          0 === Qe.lFrame.elementDepthCount && gi(l, s),
          Qe.lFrame.elementDepthCount++,
          Ee(c) && (Yi(r, s, c), Xi(r, c, s)),
          null !== i && Ji(s, c);
      }
      function Ur() {
        let t = en();
        sn() ? rn() : ((t = t.parent), nn(t, !1));
        const e = t;
        Qe.lFrame.elementDepthCount--;
        const n = Je();
        n.firstCreatePass && (kn(n, t), Se(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            Hr(n, e, Ye(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            Hr(n, e, Ye(), e.stylesWithoutHost, !1);
      }
      function zr(t, e, n, i) {
        Br(t, e, n, i), Ur();
      }
      function qr(t, e, n) {
        const i = Ye(),
          s = Je(),
          r = t + 20,
          o = s.firstCreatePass
            ? (function (t, e, n, i, s) {
                const r = e.consts,
                  o = Ge(r, i),
                  a = Wi(e, n[6], t, 4, "ng-container", o);
                return (
                  null !== o && Tr(a, o, !0),
                  os(e, n, a, Ge(r, s)),
                  null !== e.queries && e.queries.elementStart(e, a),
                  a
                );
              })(t, s, i, e, n)
            : s.data[r];
        nn(o, !0);
        const a = (i[r] = i[11].createComment(""));
        Ws(s, i, a, o),
          gi(a, i),
          Ee(o) && (Yi(s, i, o), Xi(s, o, i)),
          null != n && Ji(i, o);
      }
      function Wr() {
        let t = en();
        const e = Je();
        sn() ? rn() : ((t = t.parent), nn(t, !1)),
          e.firstCreatePass && (kn(e, t), Se(t) && e.queries.elementEnd(t));
      }
      function Gr() {
        return Ye();
      }
      function Zr(t) {
        return !!t && "function" == typeof t.then;
      }
      function Kr(t) {
        return !!t && "function" == typeof t.subscribe;
      }
      function Qr(t, e, n = !1, i) {
        const s = Ye(),
          r = Je(),
          o = en();
        return Yr(r, s, s[11], o, t, e, n, i), Qr;
      }
      function Xr(t, e, n = !1, i) {
        const s = en(),
          r = Ye(),
          o = Je();
        return Yr(o, r, As(dn(o.data), s, r), s, t, e, n, i), Xr;
      }
      function Yr(t, e, n, i, s, r, o = !1, a) {
        const l = Ee(i),
          c = t.firstCreatePass && (t.cleanup || (t.cleanup = [])),
          h = Ts(e);
        let u = !0;
        if (3 === i.type) {
          const d = $e(i, e),
            p = a ? a(d) : le,
            f = p.target || d,
            m = h.length,
            g = a ? (t) => a(je(t[i.index])).target : i.index;
          if (Le(n)) {
            let o = null;
            if (
              (!a &&
                l &&
                (o = (function (t, e, n, i) {
                  const s = t.cleanup;
                  if (null != s)
                    for (let r = 0; r < s.length - 1; r += 2) {
                      const t = s[r];
                      if (t === n && s[r + 1] === i) {
                        const t = e[7],
                          n = s[r + 2];
                        return t.length > n ? t[n] : null;
                      }
                      "string" == typeof t && (r += 2);
                    }
                  return null;
                })(t, e, s, i.index)),
              null !== o)
            )
              ((o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = r),
                (o.__ngLastListenerFn__ = r),
                (u = !1);
            else {
              r = to(i, e, r, !1);
              const t = n.listen(p.name || f, s, r);
              h.push(r, t), c && c.push(s, g, m, m + 1);
            }
          } else
            (r = to(i, e, r, !0)),
              f.addEventListener(s, r, o),
              h.push(r),
              c && c.push(s, g, m, o);
        }
        const d = i.outputs;
        let p;
        if (u && null !== d && (p = d[s])) {
          const t = p.length;
          if (t)
            for (let n = 0; n < t; n += 2) {
              const t = e[p[n]][p[n + 1]].subscribe(r),
                o = h.length;
              h.push(r, t), c && c.push(s, i.index, o, -(o + 1));
            }
        }
      }
      function Jr(t, e, n) {
        try {
          return !1 !== e(n);
        } catch (i) {
          return Os(t, i), !1;
        }
      }
      function to(t, e, n, i) {
        return function s(r) {
          if (r === Function) return n;
          const o = 2 & t.flags ? Ue(t.index, e) : e;
          0 == (32 & e[2]) && xs(o);
          let a = Jr(e, n, r),
            l = s.__ngNextListenerFn__;
          for (; l; ) (a = Jr(e, l, r) && a), (l = l.__ngNextListenerFn__);
          return i && !1 === a && (r.preventDefault(), (r.returnValue = !1)), a;
        };
      }
      function eo(t = 1) {
        return (function (t) {
          return (Qe.lFrame.contextLView = (function (t, e) {
            for (; t > 0; ) (e = e[15]), t--;
            return e;
          })(t, Qe.lFrame.contextLView))[8];
        })(t);
      }
      function no(t, e) {
        let n = null;
        const i = (function (t) {
          const e = t.attrs;
          if (null != e) {
            const t = e.indexOf(5);
            if (0 == (1 & t)) return e[t + 1];
          }
          return null;
        })(t);
        for (let s = 0; s < e.length; s++) {
          const r = e[s];
          if ("*" !== r) {
            if (null === i ? Ei(t, r, !0) : Ti(i, r)) return s;
          } else n = s;
        }
        return n;
      }
      function io(t) {
        const e = Ye()[16][6];
        if (!e.projection) {
          const n = (e.projection = ne(t ? t.length : 1, null)),
            i = n.slice();
          let s = e.child;
          for (; null !== s; ) {
            const e = t ? no(s, t) : 0;
            null !== e &&
              (i[e] ? (i[e].projectionNext = s) : (n[e] = s), (i[e] = s)),
              (s = s.next);
          }
        }
      }
      function so(t, e = 0, n) {
        const i = Ye(),
          s = Je(),
          r = Wi(s, i[6], t, 1, null, n || null);
        null === r.projection && (r.projection = e),
          rn(),
          (function (t, e, n) {
            Qs(e[11], 0, e, n, $s(t, n, e), qs(n.parent || e[6], e));
          })(s, i, r);
      }
      const ro = [];
      function oo(t, e, n, i, s) {
        const r = t[n + 1],
          o = null === e;
        let a = i ? ji(r) : $i(r),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const n = t[a + 1];
          ao(t[a], e) && ((l = !0), (t[a + 1] = i ? Bi(n) : Vi(n))),
            (a = i ? ji(n) : $i(n));
        }
        l && (t[n + 1] = i ? Vi(r) : Bi(r));
      }
      function ao(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || "string" != typeof e) && re(t, e) >= 0)
        );
      }
      function lo(t, e, n) {
        return ho(t, e, n, !1), lo;
      }
      function co(t, e) {
        return ho(t, e, null, !0), co;
      }
      function ho(t, e, n, i) {
        const s = Ye(),
          r = Je(),
          o = (function (t) {
            const e = Qe.lFrame,
              n = e.bindingIndex;
            return (e.bindingIndex = e.bindingIndex + 2), n;
          })();
        r.firstUpdatePass &&
          (function (t, e, n, i) {
            const s = t.data;
            if (null === s[n + 1]) {
              const r = s[xn() + 20],
                o = (function (t, e) {
                  return e >= t.expandoStartIndex;
                })(t, n);
              (function (t, e) {
                return 0 != (t.flags & (e ? 16 : 32));
              })(r, i) &&
                null === e &&
                !o &&
                (e = !1),
                (e = (function (t, e, n, i) {
                  const s = dn(t);
                  let r = i ? e.residualClasses : e.residualStyles;
                  if (null === s)
                    0 === (i ? e.classBindings : e.styleBindings) &&
                      ((n = po((n = uo(null, t, e, n, i)), e.attrs, i)),
                      (r = null));
                  else {
                    const o = e.directiveStylingLast;
                    if (-1 === o || t[o] !== s)
                      if (((n = uo(s, t, e, n, i)), null === r)) {
                        let n = (function (t, e, n) {
                          const i = n ? e.classBindings : e.styleBindings;
                          if (0 !== $i(i)) return t[ji(i)];
                        })(t, e, i);
                        void 0 !== n &&
                          Array.isArray(n) &&
                          ((n = uo(null, t, e, n[1], i)),
                          (n = po(n, e.attrs, i)),
                          (function (t, e, n, i) {
                            t[ji(n ? e.classBindings : e.styleBindings)] = i;
                          })(t, e, i, n));
                      } else
                        r = (function (t, e, n) {
                          let i = void 0;
                          const s = e.directiveEnd;
                          for (let r = 1 + e.directiveStylingLast; r < s; r++)
                            i = po(i, t[r].hostAttrs, n);
                          return po(i, e.attrs, n);
                        })(t, e, i);
                  }
                  return (
                    void 0 !== r &&
                      (i ? (e.residualClasses = r) : (e.residualStyles = r)),
                    n
                  );
                })(s, r, e, i)),
                (function (t, e, n, i, s, r) {
                  let o = r ? e.classBindings : e.styleBindings,
                    a = ji(o),
                    l = $i(o);
                  t[i] = n;
                  let c,
                    h = !1;
                  if (Array.isArray(n)) {
                    const t = n;
                    (c = t[1]), (null === c || re(t, c) > 0) && (h = !0);
                  } else c = n;
                  if (s)
                    if (0 !== l) {
                      const e = ji(t[a + 1]);
                      (t[i + 1] = Mi(e, a)),
                        0 !== e && (t[e + 1] = Hi(t[e + 1], i)),
                        (t[a + 1] = (131071 & t[a + 1]) | (i << 17));
                    } else
                      (t[i + 1] = Mi(a, 0)),
                        0 !== a && (t[a + 1] = Hi(t[a + 1], i)),
                        (a = i);
                  else
                    (t[i + 1] = Mi(l, 0)),
                      0 === a ? (a = i) : (t[l + 1] = Hi(t[l + 1], i)),
                      (l = i);
                  h && (t[i + 1] = Vi(t[i + 1])),
                    oo(t, c, i, !0),
                    oo(t, c, i, !1),
                    (function (t, e, n, i, s) {
                      const r = s ? t.residualClasses : t.residualStyles;
                      null != r &&
                        "string" == typeof e &&
                        re(r, e) >= 0 &&
                        (n[i + 1] = Bi(n[i + 1]));
                    })(e, c, t, i, r),
                    (o = Mi(a, l)),
                    r ? (e.classBindings = o) : (e.styleBindings = o);
                })(s, r, e, n, o, i);
            }
          })(r, t, o, i),
          e !== Ii &&
            Nr(s, o, e) &&
            (function (t, e, n, i, s, r, o, a) {
              if (3 !== e.type) return;
              const l = t.data,
                c = l[a + 1];
              mo(1 == (1 & c) ? fo(l, e, n, s, $i(c), o) : void 0) ||
                (mo(r) ||
                  ((function (t) {
                    return 2 == (2 & t);
                  })(c) &&
                    (r = fo(l, null, n, s, a, o))),
                (function (t, e, n, i, s) {
                  const r = Le(t);
                  if (e)
                    s
                      ? r
                        ? t.addClass(n, i)
                        : n.classList.add(i)
                      : r
                      ? t.removeClass(n, i)
                      : n.classList.remove(i);
                  else {
                    const e = -1 == i.indexOf("-") ? void 0 : 2;
                    null == s
                      ? r
                        ? t.removeStyle(n, i, e)
                        : n.style.removeProperty(i)
                      : r
                      ? t.setStyle(n, i, s, e)
                      : n.style.setProperty(i, s);
                  }
                })(i, o, Ve(xn(), n), s, r));
            })(
              r,
              r.data[xn() + 20],
              s,
              s[11],
              t,
              (s[o + 1] = (function (t, e) {
                return (
                  null == t ||
                    ("string" == typeof e
                      ? (t += e)
                      : "object" == typeof t &&
                        (t = yt(
                          (function (t) {
                            return t instanceof
                              class {
                                constructor(t) {
                                  this.changingThisBreaksApplicationSecurity = t;
                                }
                                toString() {
                                  return (
                                    "SafeValue must use [property]=binding: " +
                                    this.changingThisBreaksApplicationSecurity +
                                    " (see http://g.co/ng/security#xss)"
                                  );
                                }
                              }
                              ? t.changingThisBreaksApplicationSecurity
                              : t;
                          })(t)
                        ))),
                  t
                );
              })(e, n)),
              i,
              o
            );
      }
      function uo(t, e, n, i, s) {
        let r = null;
        const o = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < o && ((r = e[a]), (i = po(i, r.hostAttrs, s)), r !== t);

        )
          a++;
        return null !== t && (n.directiveStylingLast = a), i;
      }
      function po(t, e, n) {
        const i = n ? 1 : 2;
        let s = -1;
        if (null !== e)
          for (let r = 0; r < e.length; r++) {
            const o = e[r];
            "number" == typeof o
              ? (s = o)
              : s === i &&
                (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]),
                ie(t, o, !!n || e[++r]));
          }
        return void 0 === t ? null : t;
      }
      function fo(t, e, n, i, s, r) {
        const o = null === e;
        let a = void 0;
        for (; s > 0; ) {
          const e = t[s],
            r = Array.isArray(e),
            l = r ? e[1] : e,
            c = null === l;
          let h = n[s + 1];
          h === Ii && (h = c ? ro : void 0);
          let u = c ? se(h, i) : l === i ? h : void 0;
          if ((r && !mo(u) && (u = se(e, i)), mo(u) && ((a = u), o))) return a;
          const d = t[s + 1];
          s = o ? ji(d) : $i(d);
        }
        if (null !== e) {
          let t = r ? e.residualClasses : e.residualStyles;
          null != t && (a = se(t, i));
        }
        return a;
      }
      function mo(t) {
        return void 0 !== t;
      }
      function go(t, e = "") {
        const n = Ye(),
          i = Je(),
          s = t + 20,
          r = i.firstCreatePass ? Wi(i, n[6], t, 3, null, null) : i.data[s],
          o = (n[s] = (function (t, e) {
            return Le(e) ? e.createText(t) : e.createTextNode(t);
          })(e, n[11]));
        Ws(i, n, o, r), nn(r, !1);
      }
      function _o(t) {
        return yo("", t, ""), _o;
      }
      function yo(t, e, n) {
        const i = Ye(),
          s = (function (t, e, n, i) {
            return Nr(t, cn(), n) ? e + Hn(n) + i : Ii;
          })(i, t, e, n);
        return (
          s !== Ii &&
            (function (t, e, n) {
              const i = Ve(e, t),
                s = t[11];
              Le(s) ? s.setValue(i, n) : (i.textContent = n);
            })(i, xn(), s),
          yo
        );
      }
      function bo(t, e, n) {
        const i = Ye();
        return Nr(i, cn(), e) && rs(Je(), Sn(), i, t, e, i[11], n, !0), bo;
      }
      function vo(t, e, n) {
        const i = Ye();
        if (Nr(i, cn(), e)) {
          const s = Je(),
            r = Sn();
          rs(s, r, i, t, e, As(dn(s.data), r, i), n, !0);
        }
        return vo;
      }
      function wo(t, e) {
        const n = ze(t)[1],
          i = n.data.length - 1;
        kn(n, { directiveStart: i, directiveEnd: i + 1 });
      }
      function xo(t) {
        let e = Object.getPrototypeOf(t.type.prototype).constructor,
          n = !0;
        const i = [t];
        for (; e; ) {
          let s = void 0;
          if (Te(t)) s = e.ɵcmp || e.ɵdir;
          else {
            if (e.ɵcmp) throw new Error("Directives cannot inherit Components");
            s = e.ɵdir;
          }
          if (s) {
            if (n) {
              i.push(s);
              const e = t;
              (e.inputs = Co(t.inputs)),
                (e.declaredInputs = Co(t.declaredInputs)),
                (e.outputs = Co(t.outputs));
              const n = s.hostBindings;
              n && Eo(t, n);
              const r = s.viewQuery,
                o = s.contentQueries;
              if (
                (r && So(t, r),
                o && ko(t, o),
                at(t.inputs, s.inputs),
                at(t.declaredInputs, s.declaredInputs),
                at(t.outputs, s.outputs),
                Te(s) && s.data.animation)
              ) {
                const e = t.data;
                e.animation = (e.animation || []).concat(s.data.animation);
              }
            }
            const e = s.features;
            if (e)
              for (let i = 0; i < e.length; i++) {
                const s = e[i];
                s && s.ngInherit && s(t), s === xo && (n = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function (t) {
          let e = 0,
            n = null;
          for (let i = t.length - 1; i >= 0; i--) {
            const s = t[i];
            (s.hostVars = e += s.hostVars),
              (s.hostAttrs = Fn(s.hostAttrs, (n = Fn(n, s.hostAttrs))));
          }
        })(i);
      }
      function Co(t) {
        return t === le ? {} : t === ce ? [] : t;
      }
      function So(t, e) {
        const n = t.viewQuery;
        t.viewQuery = n
          ? (t, i) => {
              e(t, i), n(t, i);
            }
          : e;
      }
      function ko(t, e) {
        const n = t.contentQueries;
        t.contentQueries = n
          ? (t, i, s) => {
              e(t, i, s), n(t, i, s);
            }
          : e;
      }
      function Eo(t, e) {
        const n = t.hostBindings;
        t.hostBindings = n
          ? (t, i) => {
              e(t, i), n(t, i);
            }
          : e;
      }
      function To(t, e, n, i, s) {
        if (((t = xt(t)), Array.isArray(t)))
          for (let r = 0; r < t.length; r++) To(t[r], e, n, i, s);
        else {
          const r = Je(),
            o = Ye();
          let a = Cr(t) ? t : xt(t.provide),
            l = vr(t);
          const c = en(),
            h = 1048575 & c.providerIndexes,
            u = c.directiveStart,
            d = c.providerIndexes >> 20;
          if (Cr(t) || !t.multi) {
            const i = new Pn(l, s, jr),
              p = Io(a, e, s ? h : h + d, u);
            -1 === p
              ? (Yn(Zn(c, o), r, a),
                Ao(r, t, e.length),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                s && (c.providerIndexes += 1048576),
                n.push(i),
                o.push(i))
              : ((n[p] = i), (o[p] = i));
          } else {
            const p = Io(a, e, h + d, u),
              f = Io(a, e, h, h + d),
              m = p >= 0 && n[p],
              g = f >= 0 && n[f];
            if ((s && !g) || (!s && !m)) {
              Yn(Zn(c, o), r, a);
              const h = (function (t, e, n, i, s) {
                const r = new Pn(t, n, jr);
                return (
                  (r.multi = []),
                  (r.index = e),
                  (r.componentProviders = 0),
                  Oo(r, s, i && !n),
                  r
                );
              })(s ? Ro : Po, n.length, s, i, l);
              !s && g && (n[f].providerFactory = h),
                Ao(r, t, e.length, 0),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                s && (c.providerIndexes += 1048576),
                n.push(h),
                o.push(h);
            } else Ao(r, t, p > -1 ? p : f, Oo(n[s ? f : p], l, !s && i));
            !s && i && g && n[f].componentProviders++;
          }
        }
      }
      function Ao(t, e, n, i) {
        const s = Cr(e);
        if (s || e.useClass) {
          const r = (e.useClass || e).prototype.ngOnDestroy;
          if (r) {
            const o = t.destroyHooks || (t.destroyHooks = []);
            if (!s && e.multi) {
              const t = o.indexOf(n);
              -1 === t ? o.push(n, [i, r]) : o[t + 1].push(i, r);
            } else o.push(n, r);
          }
        }
      }
      function Oo(t, e, n) {
        return n && t.componentProviders++, t.multi.push(e) - 1;
      }
      function Io(t, e, n, i) {
        for (let s = n; s < i; s++) if (e[s] === t) return s;
        return -1;
      }
      function Po(t, e, n, i) {
        return Do(this.multi, []);
      }
      function Ro(t, e, n, i) {
        const s = this.multi;
        let r;
        if (this.providerFactory) {
          const t = this.providerFactory.componentProviders,
            e = ii(n, n[1], this.providerFactory.index, i);
          (r = e.slice(0, t)), Do(s, r);
          for (let n = t; n < e.length; n++) r.push(e[n]);
        } else (r = []), Do(s, r);
        return r;
      }
      function Do(t, e) {
        for (let n = 0; n < t.length; n++) e.push((0, t[n])());
        return e;
      }
      function No(t, e = []) {
        return (n) => {
          n.providersResolver = (n, i) =>
            (function (t, e, n) {
              const i = Je();
              if (i.firstCreatePass) {
                const s = Te(t);
                To(n, i.data, i.blueprint, s, !0),
                  To(e, i.data, i.blueprint, s, !1);
              }
            })(n, i ? i(t) : t, e);
        };
      }
      class Fo {}
      class Lo {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${yt(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      let Mo = (() => {
          class t {}
          return (t.NULL = new Lo()), t;
        })(),
        jo = (() => {
          class t {
            constructor(t) {
              this.nativeElement = t;
            }
          }
          return (t.__NG_ELEMENT_ID__ = () => Vo(t)), t;
        })();
      const Vo = function (t) {
        return sr(t, en(), Ye());
      };
      class $o {}
      var Ho = (function (t) {
        return (
          (t[(t.Important = 1)] = "Important"),
          (t[(t.DashCase = 2)] = "DashCase"),
          t
        );
      })({});
      let Bo = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Uo()), t;
      })();
      const Uo = function () {
        const t = Ye(),
          e = Ue(en().index, t);
        return (function (t) {
          const e = t[11];
          if (Le(e)) return e;
          throw new Error(
            "Cannot inject Renderer2 when the application uses Renderer3!"
          );
        })(xe(e) ? e : t);
      };
      let zo = (() => {
        class t {}
        return (
          (t.ɵprov = lt({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class qo {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const Wo = new qo("10.0.6");
      class Go {
        constructor() {}
        supports(t) {
          return Pr(t);
        }
        create(t) {
          return new Ko(t);
        }
      }
      const Zo = (t, e) => e;
      class Ko {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || Zo);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            i = 0,
            s = null;
          for (; e || n; ) {
            const r = !n || (e && e.currentIndex < Jo(n, i, s)) ? e : n,
              o = Jo(r, i, s),
              a = r.currentIndex;
            if (r === n) i--, (n = n._nextRemoved);
            else if (((e = e._next), null == r.previousIndex)) i++;
            else {
              s || (s = []);
              const t = o - i,
                e = a - i;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const i = n < s.length ? s[n] : (s[n] = 0),
                    r = i + n;
                  e <= r && r < t && (s[n] = i + 1);
                }
                s[r.previousIndex] = e - t;
              }
            }
            o !== a && t(r, o, a);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !Pr(t)))
            throw new Error(
              `Error trying to diff '${yt(
                t
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            i,
            s = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (i = this._trackByFn(e, n)),
                null !== s && Object.is(s.trackById, i)
                  ? (r && (s = this._verifyReinsertion(s, n, i, e)),
                    Object.is(s.item, n) || this._addIdentityChange(s, n))
                  : ((s = this._mismatch(s, n, i, e)), (r = !0)),
                (s = s._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[Or()]();
                  let i;
                  for (; !(i = n.next()).done; ) e(i.value);
                }
              })(t, (t) => {
                (i = this._trackByFn(e, t)),
                  null !== s && Object.is(s.trackById, i)
                    ? (r && (s = this._verifyReinsertion(s, t, i, e)),
                      Object.is(s.item, t) || this._addIdentityChange(s, t))
                    : ((s = this._mismatch(s, t, i, e)), (r = !0)),
                  (s = s._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(s), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t, e;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = e
            )
              (t.previousIndex = t.currentIndex), (e = t._nextMoved);
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, i) {
          let s;
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, i))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, s, i))
              : null !==
                (t =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, s, i))
              : (t = this._addAfter(new Qo(e, n), s, i)),
            t
          );
        }
        _verifyReinsertion(t, e, n, i) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, i))
              : t.currentIndex != i &&
                ((t.currentIndex = i), this._addToMoves(t, i)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const i = t._prevRemoved,
            s = t._nextRemoved;
          return (
            null === i ? (this._removalsHead = s) : (i._nextRemoved = s),
            null === s ? (this._removalsTail = i) : (s._prevRemoved = i),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const i = null === e ? this._itHead : e._next;
          return (
            (t._next = i),
            (t._prev = e),
            null === i ? (this._itTail = t) : (i._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Yo()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Yo()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class Qo {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class Xo {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if (
              (null === e || e <= n.currentIndex) &&
              Object.is(n.trackById, t)
            )
              return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class Yo {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new Xo()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Jo(t, e, n) {
        const i = t.previousIndex;
        if (null === i) return i;
        let s = 0;
        return n && i < n.length && (s = n[i]), i + e + s;
      }
      class ta {
        constructor() {}
        supports(t) {
          return t instanceof Map || Rr(t);
        }
        create() {
          return new ea();
        }
      }
      class ea {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Rr(t)))
              throw new Error(
                `Error trying to diff '${yt(
                  t
                )}'. Only maps and objects are allowed`
              );
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t),
                  (this._appendAfter = e),
                  (e = e._next);
              else {
                const i = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, i);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const i = n._prev,
              s = n._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new na(t);
          return (
            this._records.set(t, n),
            (n.currentValue = e),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class na {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      let ia = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (null != n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new st(), new nt()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (null != e) return e;
              throw new Error(
                `Cannot find a differ supporting object '${t}' of type '${
                  ((n = t), n.name || typeof n)
                }'`
              );
              var n;
            }
          }
          return (
            (t.ɵprov = lt({
              token: t,
              providedIn: "root",
              factory: () => new t([new Go()]),
            })),
            t
          );
        })(),
        sa = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new st(), new nt()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (e) return e;
              throw new Error(`Cannot find a differ supporting object '${t}'`);
            }
          }
          return (
            (t.ɵprov = lt({
              token: t,
              providedIn: "root",
              factory: () => new t([new ta()]),
            })),
            t
          );
        })();
      const ra = [new ta()],
        oa = new ia([new Go()]),
        aa = new sa(ra);
      let la = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => ca(t, jo)), t;
      })();
      const ca = function (t, e) {
        return rr(t, e, en(), Ye());
      };
      let ha = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => ua(t, jo)), t;
      })();
      const ua = function (t, e) {
          return or(t, e, en(), Ye());
        },
        da = {};
      class pa extends Mo {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = be(t);
          return new ga(e, this.ngModule);
        }
      }
      function fa(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const ma = new Lt("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Un,
      });
      class ga extends Fo {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(Oi).join(",")),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return fa(this.componentDef.inputs);
        }
        get outputs() {
          return fa(this.componentDef.outputs);
        }
        create(t, e, n, i) {
          const s = (i = i || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, i, s) => {
                      const r = t.get(n, da, s);
                      return r !== da || i === da ? r : e.get(n, i, s);
                    },
                  };
                })(t, i.injector)
              : t,
            r = s.get($o, Me),
            o = s.get(zo, null),
            a = r.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = n
              ? (function (t, e, n) {
                  if (Le(t)) return t.selectRootElement(e, n === ae.ShadowDom);
                  let i = "string" == typeof e ? t.querySelector(e) : e;
                  return (i.textContent = ""), i;
                })(a, n, this.componentDef.encapsulation)
              : zi(
                  l,
                  r.createRenderer(null, this.componentDef),
                  (function (t) {
                    const e = t.toLowerCase();
                    return "svg" === e
                      ? "http://www.w3.org/2000/svg"
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(l)
                ),
            h = this.componentDef.onPush ? 576 : 528,
            u = {
              components: [],
              scheduler: Un,
              clean: Es,
              playerHandler: null,
              flags: 0,
            },
            d = es(0, -1, null, 1, 0, null, null, null, null, null),
            p = qi(null, d, u, h, null, null, r, a, o, s);
          let f, m;
          gn(p, null);
          try {
            const t = (function (t, e, n, i, s, r) {
              const o = n[1];
              n[20] = t;
              const a = Wi(o, null, 0, 3, null, null),
                l = (a.mergedAttrs = e.hostAttrs);
              null !== l &&
                (Tr(a, l, !0),
                null !== t &&
                  (Rn(s, t, l),
                  null !== a.classes && Ys(s, t, a.classes),
                  null !== a.styles && Xs(s, t, a.styles)));
              const c = i.createRenderer(t, e),
                h = qi(
                  n,
                  ts(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  a,
                  i,
                  c,
                  void 0
                );
              return (
                o.firstCreatePass &&
                  (Yn(Zn(a, n), o, e.type), us(o, a), ps(a, n.length, 1)),
                ws(n, h),
                (n[20] = h)
              );
            })(c, this.componentDef, p, r, a);
            if (c)
              if (n) Rn(a, c, ["ng-version", Wo.full]);
              else {
                const { attrs: t, classes: e } = (function (t) {
                  const e = [],
                    n = [];
                  let i = 1,
                    s = 2;
                  for (; i < t.length; ) {
                    let r = t[i];
                    if ("string" == typeof r)
                      2 === s
                        ? "" !== r && e.push(r, t[++i])
                        : 8 === s && n.push(r);
                    else {
                      if (!Si(s)) break;
                      s = r;
                    }
                    i++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                t && Rn(a, c, t), e && e.length > 0 && Ys(a, c, e.join(" "));
              }
            if (((m = He(d, 0)), void 0 !== e)) {
              const t = (m.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const i = e[n];
                t.push(null != i ? Array.from(i) : null);
              }
            }
            (f = (function (t, e, n, i, s) {
              const r = n[1],
                o = (function (t, e, n) {
                  const i = en();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    hs(t, i, 1),
                    fs(t, e, n));
                  const s = ii(e, t, e.length - 1, i);
                  gi(s, e);
                  const r = $e(i, e);
                  return r && gi(r, e), s;
                })(r, n, e);
              i.components.push(o),
                (t[8] = o),
                s && s.forEach((t) => t(o, e)),
                e.contentQueries && e.contentQueries(1, o, n.length - 1);
              const a = en();
              if (
                r.firstCreatePass &&
                (null !== e.hostBindings || null !== e.hostAttrs)
              ) {
                Cn(a.index - 20);
                const t = n[1];
                as(t, e), ls(t, n, e.hostVars), cs(e, o);
              }
              return o;
            })(t, this.componentDef, p, u, [wo])),
              Gi(d, p, null);
          } finally {
            wn();
          }
          const g = new _a(this.componentType, f, sr(jo, m, p), p, m);
          return (d.node.child = m), g;
        }
      }
      class _a extends class {} {
        constructor(t, e, n, i, s) {
          super(),
            (this.location = n),
            (this._rootLView = i),
            (this._tNode = s),
            (this.destroyCbs = []),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new tr(i)),
            (function (t, e, n, i) {
              let s = t.node;
              null == s && (t.node = s = is(0, null, 2, -1, null, null)),
                (i[6] = s);
            })(i[1], 0, 0, i),
            (this.componentType = t);
        }
        get injector() {
          return new oi(this._tNode, this._rootLView);
        }
        destroy() {
          this.destroyCbs &&
            (this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null),
            !this.hostView.destroyed && this.hostView.destroy());
        }
        onDestroy(t) {
          this.destroyCbs && this.destroyCbs.push(t);
        }
      }
      const ya = void 0;
      var ba = [
        "en",
        [["a", "p"], ["AM", "PM"], ya],
        [["AM", "PM"], ya, ya],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        ya,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        ya,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", ya, "{1} 'at' {0}", ya],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let va = {};
      function wa(t) {
        return (
          t in va ||
            (va[t] =
              At.ng &&
              At.ng.common &&
              At.ng.common.locales &&
              At.ng.common.locales[t]),
          va[t]
        );
      }
      var xa = (function (t) {
        return (
          (t[(t.LocaleId = 0)] = "LocaleId"),
          (t[(t.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
          (t[(t.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
          (t[(t.DaysFormat = 3)] = "DaysFormat"),
          (t[(t.DaysStandalone = 4)] = "DaysStandalone"),
          (t[(t.MonthsFormat = 5)] = "MonthsFormat"),
          (t[(t.MonthsStandalone = 6)] = "MonthsStandalone"),
          (t[(t.Eras = 7)] = "Eras"),
          (t[(t.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
          (t[(t.WeekendRange = 9)] = "WeekendRange"),
          (t[(t.DateFormat = 10)] = "DateFormat"),
          (t[(t.TimeFormat = 11)] = "TimeFormat"),
          (t[(t.DateTimeFormat = 12)] = "DateTimeFormat"),
          (t[(t.NumberSymbols = 13)] = "NumberSymbols"),
          (t[(t.NumberFormats = 14)] = "NumberFormats"),
          (t[(t.CurrencyCode = 15)] = "CurrencyCode"),
          (t[(t.CurrencySymbol = 16)] = "CurrencySymbol"),
          (t[(t.CurrencyName = 17)] = "CurrencyName"),
          (t[(t.Currencies = 18)] = "Currencies"),
          (t[(t.Directionality = 19)] = "Directionality"),
          (t[(t.PluralCase = 20)] = "PluralCase"),
          (t[(t.ExtraData = 21)] = "ExtraData"),
          t
        );
      })({});
      let Ca = "en-US";
      function Sa(t) {
        var e, n;
        (n = "Expected localeId to be defined"),
          null == (e = t) &&
            (function (t, e, n, i) {
              throw new Error(
                "ASSERTION ERROR: " + t + ` [Expected=> null != ${e} <=Actual]`
              );
            })(n, e),
          "string" == typeof t && (Ca = t.toLowerCase().replace(/_/g, "-"));
      }
      const ka = new Map();
      class Ea extends Xt {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new pa(this));
          const n = we(t),
            i = t[Dt] || null;
          i && Sa(i),
            (this._bootstrapComponents = zn(n.bootstrap)),
            (this._r3Injector = _r(
              t,
              e,
              [
                { provide: Xt, useValue: this },
                { provide: Mo, useValue: this.componentFactoryResolver },
              ],
              yt(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = kr.THROW_IF_NOT_FOUND, n = rt.Default) {
          return t === kr || t === Xt || t === Mt
            ? this
            : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Ta extends Yt {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== we(t) &&
              (function t(e) {
                if (null !== e.ɵmod.id) {
                  const t = e.ɵmod.id;
                  (function (t, e, n) {
                    if (e && e !== n)
                      throw new Error(
                        `Duplicate module registered for ${t} - ${yt(
                          e
                        )} vs ${yt(e.name)}`
                      );
                  })(t, ka.get(t), e),
                    ka.set(t, e);
                }
                let n = e.ɵmod.imports;
                n instanceof Function && (n = n()), n && n.forEach((e) => t(e));
              })(t);
        }
        create(t) {
          return new Ea(this.moduleType, t);
        }
      }
      function Aa(t, e, n, i) {
        return Pa(Ye(), ln(), t, e, n, i);
      }
      function Oa(t, e, n, i, s) {
        return (function (t, e, n, i, s, r, o) {
          const a = e + n;
          return (function (t, e, n, i) {
            const s = Nr(t, e, n);
            return Nr(t, e + 1, i) || s;
          })(t, a, s, r)
            ? Dr(t, a + 2, o ? i.call(o, s, r) : i(s, r))
            : Ia(t, a + 2);
        })(Ye(), ln(), t, e, n, i, s);
      }
      function Ia(t, e) {
        const n = t[e];
        return n === Ii ? void 0 : n;
      }
      function Pa(t, e, n, i, s, r) {
        const o = e + n;
        return Nr(t, o, s)
          ? Dr(t, o + 1, r ? i.call(r, s) : i(s))
          : Ia(t, o + 1);
      }
      function Ra(t, e) {
        const n = Je();
        let i;
        const s = t + 20;
        n.firstCreatePass
          ? ((i = (function (t, e) {
              if (e)
                for (let n = e.length - 1; n >= 0; n--) {
                  const i = e[n];
                  if (t === i.name) return i;
                }
              throw new Error(`The pipe '${t}' could not be found!`);
            })(e, n.pipeRegistry)),
            (n.data[s] = i),
            i.onDestroy &&
              (n.destroyHooks || (n.destroyHooks = [])).push(s, i.onDestroy))
          : (i = n.data[s]);
        const r = i.factory || (i.factory = ve(i.type)),
          o = zt(jr),
          a = Wn(!1),
          l = r();
        return (
          Wn(a),
          zt(o),
          (function (t, e, n, i) {
            const s = n + 20;
            s >= t.data.length && ((t.data[s] = null), (t.blueprint[s] = null)),
              (e[s] = i);
          })(n, Ye(), t, l),
          l
        );
      }
      function Da(t, e, n) {
        const i = Ye(),
          s = Be(i, t);
        return (function (t, e) {
          return (
            Ir.isWrapped(e) &&
              ((e = Ir.unwrap(e)), (t[Qe.lFrame.bindingIndex] = Ii)),
            e
          );
        })(
          i,
          (function (t, e) {
            return t[1].data[e + 20].pure;
          })(i, t)
            ? Pa(i, ln(), e, s.transform, n, s)
            : s.transform(n)
        );
      }
      const Na = class extends C {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, n) {
          let i,
            s = (t) => null,
            r = () => null;
          t && "object" == typeof t
            ? ((i = this.__isAsync
                ? (e) => {
                    setTimeout(() => t.next(e));
                  }
                : (e) => {
                    t.next(e);
                  }),
              t.error &&
                (s = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t.error(e));
                    }
                  : (e) => {
                      t.error(e);
                    }),
              t.complete &&
                (r = this.__isAsync
                  ? () => {
                      setTimeout(() => t.complete());
                    }
                  : () => {
                      t.complete();
                    }))
            : ((i = this.__isAsync
                ? (e) => {
                    setTimeout(() => t(e));
                  }
                : (e) => {
                    t(e);
                  }),
              e &&
                (s = this.__isAsync
                  ? (t) => {
                      setTimeout(() => e(t));
                    }
                  : (t) => {
                      e(t);
                    }),
              n &&
                (r = this.__isAsync
                  ? () => {
                      setTimeout(() => n());
                    }
                  : () => {
                      n();
                    }));
          const o = super.subscribe(i, s, r);
          return t instanceof u && t.add(o), o;
        }
      };
      function Fa() {
        return this._results[Or()]();
      }
      class La {
        constructor() {
          (this.dirty = !0),
            (this._results = []),
            (this.changes = new Na()),
            (this.length = 0);
          const t = Or(),
            e = La.prototype;
          e[t] || (e[t] = Fa);
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t) {
          (this._results = (function t(e, n) {
            void 0 === n && (n = e);
            for (let i = 0; i < e.length; i++) {
              let s = e[i];
              Array.isArray(s)
                ? (n === e && (n = e.slice(0, i)), t(s, n))
                : n !== e && n.push(s);
            }
            return n;
          })(t)),
            (this.dirty = !1),
            (this.length = this._results.length),
            (this.last = this._results[this.length - 1]),
            (this.first = this._results[0]);
        }
        notifyOnChanges() {
          this.changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      class Ma {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Ma(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class ja {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const n =
                null !== t.contentQueries ? t.contentQueries[0] : e.length,
              i = [];
            for (let t = 0; t < n; t++) {
              const n = e.getByIndex(t);
              i.push(this.queries[n.indexInDeclarationView].clone());
            }
            return new ja(i);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++)
            null !== el(t, e).matches && this.queries[e].setDirty();
        }
      }
      class Va {
        constructor(t, e, n, i = null) {
          (this.predicate = t),
            (this.descendants = e),
            (this.isStatic = n),
            (this.read = i);
        }
      }
      class $a {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementStart(t, e);
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++)
            this.queries[e].elementEnd(t);
        }
        embeddedTView(t) {
          let e = null;
          for (let n = 0; n < this.length; n++) {
            const i = null !== e ? e.length : 0,
              s = this.getByIndex(n).embeddedTView(t, i);
            s &&
              ((s.indexInDeclarationView = n),
              null !== e ? e.push(s) : (e = [s]));
          }
          return null !== e ? new $a(e) : null;
        }
        template(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].template(t, e);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Ha {
        constructor(t, e = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, e) {
          this.elementStart(t, e);
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, e),
              new Ha(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && !1 === this.metadata.descendants) {
            const e = this._declarationNodeIndex;
            let n = t.parent;
            for (; null !== n && 4 === n.type && n.index !== e; ) n = n.parent;
            return e === (null !== n ? n.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, e) {
          if (Array.isArray(this.metadata.predicate)) {
            const n = this.metadata.predicate;
            for (let i = 0; i < n.length; i++)
              this.matchTNodeWithReadOption(t, e, Ba(e, n[i]));
          } else {
            const n = this.metadata.predicate;
            n === la
              ? 0 === e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, ni(e, t, n, !1, !1));
          }
        }
        matchTNodeWithReadOption(t, e, n) {
          if (null !== n) {
            const i = this.metadata.read;
            if (null !== i)
              if (i === jo || i === ha || (i === la && 0 === e.type))
                this.addMatch(e.index, -2);
              else {
                const n = ni(e, t, i, !1, !1);
                null !== n && this.addMatch(e.index, n);
              }
            else this.addMatch(e.index, n);
          }
        }
        addMatch(t, e) {
          null === this.matches
            ? (this.matches = [t, e])
            : this.matches.push(t, e);
        }
      }
      function Ba(t, e) {
        const n = t.localNames;
        if (null !== n)
          for (let i = 0; i < n.length; i += 2) if (n[i] === e) return n[i + 1];
        return null;
      }
      function Ua(t, e, n, i) {
        return -1 === n
          ? (function (t, e) {
              return 3 === t.type || 4 === t.type
                ? sr(jo, t, e)
                : 0 === t.type
                ? rr(la, jo, t, e)
                : null;
            })(e, t)
          : -2 === n
          ? (function (t, e, n) {
              return n === jo
                ? sr(jo, e, t)
                : n === la
                ? rr(la, jo, e, t)
                : n === ha
                ? or(ha, jo, e, t)
                : void 0;
            })(t, e, i)
          : ii(t, t[1], n, e);
      }
      function za(t, e, n, i) {
        const s = e[19].queries[i];
        if (null === s.matches) {
          const i = t.data,
            r = n.matches,
            o = [];
          for (let t = 0; t < r.length; t += 2) {
            const s = r[t];
            o.push(s < 0 ? null : Ua(e, i[s], r[t + 1], n.metadata.read));
          }
          s.matches = o;
        }
        return s.matches;
      }
      function qa(t) {
        const e = Ye(),
          n = Je(),
          i = pn();
        fn(i + 1);
        const s = el(n, i);
        if (t.dirty && qe(e) === s.metadata.isStatic) {
          if (null === s.matches) t.reset([]);
          else {
            const r = s.crossesNgTemplate
              ? (function t(e, n, i, s) {
                  const r = e.queries.getByIndex(i),
                    o = r.matches;
                  if (null !== o) {
                    const a = za(e, n, r, i);
                    for (let e = 0; e < o.length; e += 2) {
                      const i = o[e];
                      if (i > 0) s.push(a[e / 2]);
                      else {
                        const r = o[e + 1],
                          a = n[-i];
                        for (let e = 10; e < a.length; e++) {
                          const n = a[e];
                          n[17] === n[3] && t(n[1], n, r, s);
                        }
                        if (null !== a[9]) {
                          const e = a[9];
                          for (let n = 0; n < e.length; n++) {
                            const i = e[n];
                            t(i[1], i, r, s);
                          }
                        }
                      }
                    }
                  }
                  return s;
                })(n, e, i, [])
              : za(n, e, s, i);
            t.reset(r), t.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Wa(t, e, n) {
        Za(Je(), Ye(), t, e, n, !0);
      }
      function Ga(t, e, n) {
        Za(Je(), Ye(), t, e, n, !1);
      }
      function Za(t, e, n, i, s, r) {
        t.firstCreatePass &&
          (tl(t, new Va(n, i, r, s), -1), r && (t.staticViewQueries = !0)),
          Ja(t, e);
      }
      function Ka(t, e, n, i) {
        Xa(Je(), Ye(), e, n, i, !1, en(), t);
      }
      function Qa(t, e, n, i) {
        Xa(Je(), Ye(), e, n, i, !0, en(), t);
      }
      function Xa(t, e, n, i, s, r, o, a) {
        t.firstCreatePass &&
          (tl(t, new Va(n, i, r, s), o.index),
          (function (t, e) {
            const n = t.contentQueries || (t.contentQueries = []);
            e !== (t.contentQueries.length ? n[n.length - 1] : -1) &&
              n.push(t.queries.length - 1, e);
          })(t, a),
          r && (t.staticContentQueries = !0)),
          Ja(t, e);
      }
      function Ya() {
        return (t = Ye()), (e = pn()), t[19].queries[e].queryList;
        var t, e;
      }
      function Ja(t, e) {
        const n = new La();
        ns(t, e, n, n.destroy),
          null === e[19] && (e[19] = new ja()),
          e[19].queries.push(new Ma(n));
      }
      function tl(t, e, n) {
        null === t.queries && (t.queries = new $a()),
          t.queries.track(new Ha(e, n));
      }
      function el(t, e) {
        return t.queries.getByIndex(e);
      }
      const nl = new Lt("Application Initializer");
      let il = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                Zr(e) && t.push(e);
              }
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch((t) => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(nl, 8));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const sl = new Lt("AppId"),
        rl = {
          provide: sl,
          useFactory: function () {
            return `${ol()}${ol()}${ol()}`;
          },
          deps: [],
        };
      function ol() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const al = new Lt("Platform Initializer"),
        ll = new Lt("Platform ID"),
        cl = new Lt("appBootstrapListener");
      let hl = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ul = new Lt("LocaleId"),
        dl = new Lt("DefaultCurrencyCode");
      class pl {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const fl = function (t) {
          return new Ta(t);
        },
        ml = fl,
        gl = function (t) {
          return Promise.resolve(fl(t));
        },
        _l = function (t) {
          const e = fl(t),
            n = zn(we(t).declarations).reduce((t, e) => {
              const n = be(e);
              return n && t.push(new ga(n)), t;
            }, []);
          return new pl(e, n);
        },
        yl = _l,
        bl = function (t) {
          return Promise.resolve(_l(t));
        };
      let vl = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = ml),
              (this.compileModuleAsync = gl),
              (this.compileModuleAndAllComponentsSync = yl),
              (this.compileModuleAndAllComponentsAsync = bl);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const wl = (() => Promise.resolve(0))();
      function xl(t) {
        "undefined" == typeof Zone
          ? wl.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class Cl {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Na(!1)),
            (this.onMicrotaskEmpty = new Na(!1)),
            (this.onStable = new Na(!1)),
            (this.onError = new Na(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched(),
            (this._nesting = 0),
            (this._outer = this._inner = Zone.current),
            Zone.wtfZoneSpec &&
              (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
            Zone.TaskTrackingZoneSpec &&
              (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
            (this.shouldCoalesceEventChangeDetection = e),
            (this.lastRequestAnimationFrameId = -1),
            (this.nativeRequestAnimationFrame = (function () {
              let t = At.requestAnimationFrame,
                e = At.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const i = e[Zone.__symbol__("OriginalDelegate")];
                i && (e = i);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e =
                !!t.shouldCoalesceEventChangeDetection &&
                t.nativeRequestAnimationFrame &&
                (() => {
                  !(function (t) {
                    -1 === t.lastRequestAnimationFrameId &&
                      ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
                        At,
                        () => {
                          t.fakeTopEventTask ||
                            (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                              "fakeTopEventTask",
                              () => {
                                (t.lastRequestAnimationFrameId = -1),
                                  Tl(t),
                                  El(t);
                              },
                              void 0,
                              () => {},
                              () => {}
                            )),
                            t.fakeTopEventTask.invoke();
                        }
                      )),
                      Tl(t));
                  })(t);
                });
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0, maybeDelayChangeDetection: e },
                onInvokeTask: (n, i, s, r, o, a) => {
                  try {
                    return Al(t), n.invokeTask(s, r, o, a);
                  } finally {
                    e && "eventTask" === r.type && e(), Ol(t);
                  }
                },
                onInvoke: (e, n, i, s, r, o, a) => {
                  try {
                    return Al(t), e.invoke(i, s, r, o, a);
                  } finally {
                    Ol(t);
                  }
                },
                onHasTask: (e, n, i, s) => {
                  e.hasTask(i, s),
                    n === i &&
                      ("microTask" == s.change
                        ? ((t._hasPendingMicrotasks = s.microTask),
                          Tl(t),
                          El(t))
                        : "macroTask" == s.change &&
                          (t.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (e, n, i, s) => (
                  e.handleError(i, s),
                  t.runOutsideAngular(() => t.onError.emit(s)),
                  !1
                ),
              });
            })(this);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Cl.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Cl.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, i) {
          const s = this._inner,
            r = s.scheduleEventTask("NgZoneEvent: " + i, t, kl, Sl, Sl);
          try {
            return s.runTask(r, e, n);
          } finally {
            s.cancelTask(r);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      function Sl() {}
      const kl = {};
      function El(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function Tl(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          (t.shouldCoalesceEventChangeDetection &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function Al(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Ol(t) {
        t._nesting--, El(t);
      }
      class Il {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Na()),
            (this.onMicrotaskEmpty = new Na()),
            (this.onStable = new Na()),
            (this.onError = new Na());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, i) {
          return t.apply(e, n);
        }
      }
      let Pl = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Cl.assertNotInAngularZone(),
                        xl(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                xl(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (e) =>
                    !e.updateCb ||
                    !e.updateCb(t) ||
                    (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let i = -1;
              e &&
                e > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (t) => t.timeoutId !== i
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: i, updateCb: n });
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Cl));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Rl = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), Fl.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return Fl.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class Dl {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      let Nl,
        Fl = new Dl();
      const Ll = new Lt("AllowMultipleToken");
      class Ml {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function jl(t, e, n = []) {
        const i = "Platform: " + e,
          s = new Lt(i);
        return (e = []) => {
          let r = Vl();
          if (!r || r.injector.get(Ll, !1))
            if (t) t(n.concat(e).concat({ provide: s, useValue: !0 }));
            else {
              const t = n
                .concat(e)
                .concat(
                  { provide: s, useValue: !0 },
                  { provide: ur, useValue: "platform" }
                );
              !(function (t) {
                if (Nl && !Nl.destroyed && !Nl.injector.get(Ll, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                Nl = t.get($l);
                const e = t.get(al, null);
                e && e.forEach((t) => t());
              })(kr.create({ providers: t, name: i }));
            }
          return (function (t) {
            const e = Vl();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(s);
        };
      }
      function Vl() {
        return Nl && !Nl.destroyed ? Nl : null;
      }
      let $l = (() => {
        class t {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new Il()
                      : ("zone.js" === t ? void 0 : t) ||
                        new Cl({
                          enableLongStackTrace: mi(),
                          shouldCoalesceEventChangeDetection: e,
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, (e && e.ngZoneEventCoalescing) || !1),
              i = [{ provide: Cl, useValue: n }];
            return n.run(() => {
              const e = kr.create({
                  providers: i,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                s = t.create(e),
                r = s.injector.get(di, null);
              if (!r)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                s.onDestroy(() => Ul(this._modules, s)),
                n.runOutsideAngular(() =>
                  n.onError.subscribe({
                    next: (t) => {
                      r.handleError(t);
                    },
                  })
                ),
                (function (t, e, n) {
                  try {
                    const i = n();
                    return Zr(i)
                      ? i.catch((n) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(n)), n)
                          );
                        })
                      : i;
                  } catch (i) {
                    throw (e.runOutsideAngular(() => t.handleError(i)), i);
                  }
                })(r, n, () => {
                  const t = s.injector.get(il);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (
                        Sa(s.injector.get(ul, "en-US") || "en-US"),
                        this._moduleDoBootstrap(s),
                        s
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = Hl({}, e);
            return (function (t, e, n) {
              const i = new Ta(n);
              return Promise.resolve(i);
            })(0, 0, t).then((t) => this.bootstrapModuleFactory(t, n));
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(Bl);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((t) => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${yt(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(kr));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Hl(t, e) {
        return Array.isArray(e)
          ? e.reduce(Hl, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let Bl = (() => {
        class t {
          constructor(t, e, n, i, s, r) {
            (this._zone = t),
              (this._console = e),
              (this._injector = n),
              (this._exceptionHandler = i),
              (this._componentFactoryResolver = s),
              (this._initStatus = r),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._enforceNoNewChanges = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._enforceNoNewChanges = mi()),
              this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              });
            const o = new y((t) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              a = new y((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    Cl.assertNotInAngularZone(),
                      xl(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  Cl.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = q(
              o,
              a.pipe((t) => {
                return W()(
                  ((e = Y),
                  function (t) {
                    let n;
                    n =
                      "function" == typeof e
                        ? e
                        : function () {
                            return e;
                          };
                    const i = Object.create(t, Q);
                    return (i.source = t), (i.subjectFactory = n), i;
                  })(t)
                );
                var e;
              })
            );
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              t instanceof Fo
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const i = n.isBoundToModule ? void 0 : this._injector.get(Xt),
              s = n.create(kr.NULL, [], e || n.selector, i);
            s.onDestroy(() => {
              this._unloadComponent(s);
            });
            const r = s.injector.get(Pl, null);
            return (
              r &&
                s.injector
                  .get(Rl)
                  .registerApplication(s.location.nativeElement, r),
              this._loadComponent(s),
              mi() &&
                this._console.log(
                  "Angular is running in development mode. Call enableProdMode() to enable production mode."
                ),
              s
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
              if (this._enforceNoNewChanges)
                for (let t of this._views) t.checkNoChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            Ul(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(cl, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          _unloadComponent(t) {
            this.detachView(t.hostView), Ul(this.components, t);
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy());
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(Cl), Wt(hl), Wt(kr), Wt(di), Wt(Mo), Wt(il));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Ul(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      class zl {}
      class ql {}
      const Wl = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" };
      let Gl = (() => {
        class t {
          constructor(t, e) {
            (this._compiler = t), (this._config = e || Wl);
          }
          load(t) {
            return this.loadAndCompile(t);
          }
          loadAndCompile(t) {
            let [e, i] = t.split("#");
            return (
              void 0 === i && (i = "default"),
              n("zn8P")(e)
                .then((t) => t[i])
                .then((t) => Zl(t, e, i))
                .then((t) => this._compiler.compileModuleAsync(t))
            );
          }
          loadFactory(t) {
            let [e, i] = t.split("#"),
              s = "NgFactory";
            return (
              void 0 === i && ((i = "default"), (s = "")),
              n("zn8P")(
                this._config.factoryPathPrefix +
                  e +
                  this._config.factoryPathSuffix
              )
                .then((t) => t[i + s])
                .then((t) => Zl(t, e, i))
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(vl), Wt(ql, 8));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Zl(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t;
      }
      const Kl = jl(null, "core", [
          { provide: ll, useValue: "unknown" },
          { provide: $l, deps: [kr] },
          { provide: Rl, deps: [] },
          { provide: hl, deps: [] },
        ]),
        Ql = [
          { provide: Bl, useClass: Bl, deps: [Cl, hl, kr, di, Mo, il] },
          {
            provide: ma,
            deps: [Cl],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: il, useClass: il, deps: [[new nt(), nl]] },
          { provide: vl, useClass: vl, deps: [] },
          rl,
          {
            provide: ia,
            useFactory: function () {
              return oa;
            },
            deps: [],
          },
          {
            provide: sa,
            useFactory: function () {
              return aa;
            },
            deps: [],
          },
          {
            provide: ul,
            useFactory: function (t) {
              return (
                Sa(
                  (t =
                    t ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    "en-US")
                ),
                t
              );
            },
            deps: [[new et(ul), new nt(), new st()]],
          },
          { provide: dl, useValue: "USD" },
        ];
      let Xl = (() => {
          class t {
            constructor(t) {}
          }
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)(Wt(Bl));
              },
              providers: Ql,
            })),
            t
          );
        })(),
        Yl = null;
      function Jl() {
        return Yl;
      }
      const tc = new Lt("DocumentToken");
      let ec = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = lt({ factory: nc, token: t, providedIn: "platform" })),
          t
        );
      })();
      function nc() {
        return Wt(sc);
      }
      const ic = new Lt("Location Initialized");
      let sc = (() => {
        class t extends ec {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = Jl().getLocation()),
              (this._history = Jl().getHistory());
          }
          getBaseHrefFromDOM() {
            return Jl().getBaseHref(this._doc);
          }
          onPopState(t) {
            Jl()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("popstate", t, !1);
          }
          onHashChange(t) {
            Jl()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("hashchange", t, !1);
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, e, n) {
            rc() ? this._history.pushState(t, e, n) : (this.location.hash = n);
          }
          replaceState(t, e, n) {
            rc()
              ? this._history.replaceState(t, e, n)
              : (this.location.hash = n);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(tc));
          }),
          (t.ɵprov = lt({ factory: oc, token: t, providedIn: "platform" })),
          t
        );
      })();
      function rc() {
        return !!window.history.pushState;
      }
      function oc() {
        return new sc(Wt(tc));
      }
      function ac(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith("/") && n++,
          e.startsWith("/") && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        );
      }
      function lc(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function cc(t) {
        return t && "?" !== t[0] ? "?" + t : t;
      }
      let hc = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = lt({ factory: uc, token: t, providedIn: "root" })),
          t
        );
      })();
      function uc(t) {
        const e = Wt(tc).location;
        return new pc(Wt(ec), (e && e.origin) || "");
      }
      const dc = new Lt("appBaseHref");
      let pc = (() => {
          class t extends hc {
            constructor(t, e) {
              if (
                (super(),
                (this._platformLocation = t),
                null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
                null == e)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = e;
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return ac(this._baseHref, t);
            }
            path(t = !1) {
              const e =
                  this._platformLocation.pathname +
                  cc(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? `${e}${n}` : e;
            }
            pushState(t, e, n, i) {
              const s = this.prepareExternalUrl(n + cc(i));
              this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, i) {
              const s = this.prepareExternalUrl(n + cc(i));
              this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(ec), Wt(dc, 8));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        fc = (() => {
          class t extends hc {
            constructor(t, e) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                null != e && (this._baseHref = e);
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let e = this._platformLocation.hash;
              return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e;
            }
            prepareExternalUrl(t) {
              const e = ac(this._baseHref, t);
              return e.length > 0 ? "#" + e : e;
            }
            pushState(t, e, n, i) {
              let s = this.prepareExternalUrl(n + cc(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, i) {
              let s = this.prepareExternalUrl(n + cc(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(ec), Wt(dc, 8));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        mc = (() => {
          class t {
            constructor(t, e) {
              (this._subject = new Na()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t);
              const n = this._platformStrategy.getBaseHref();
              (this._platformLocation = e),
                (this._baseHref = lc(_c(n))),
                this._platformStrategy.onPopState((t) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: t.state,
                    type: t.type,
                  });
                });
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, e = "") {
              return this.path() == this.normalize(t + cc(e));
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, _c(e))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }
            go(t, e = "", n = null) {
              this._platformStrategy.pushState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + cc(e)),
                  n
                );
            }
            replaceState(t, e = "", n = null) {
              this._platformStrategy.replaceState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + cc(e)),
                  n
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((t) => {
                    this._notifyUrlChangeListeners(t.url, t.state);
                  }));
            }
            _notifyUrlChangeListeners(t = "", e) {
              this._urlChangeListeners.forEach((n) => n(t, e));
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({
                next: t,
                error: e,
                complete: n,
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(hc), Wt(ec));
            }),
            (t.normalizeQueryParams = cc),
            (t.joinWithSlash = ac),
            (t.stripTrailingSlash = lc),
            (t.ɵprov = lt({ factory: gc, token: t, providedIn: "root" })),
            t
          );
        })();
      function gc() {
        return new mc(Wt(hc), Wt(ec));
      }
      function _c(t) {
        return t.replace(/\/index.html$/, "");
      }
      var yc = (function (t) {
        return (
          (t[(t.Zero = 0)] = "Zero"),
          (t[(t.One = 1)] = "One"),
          (t[(t.Two = 2)] = "Two"),
          (t[(t.Few = 3)] = "Few"),
          (t[(t.Many = 4)] = "Many"),
          (t[(t.Other = 5)] = "Other"),
          t
        );
      })({});
      class bc {}
      let vc = (() => {
        class t extends bc {
          constructor(t) {
            super(), (this.locale = t);
          }
          getPluralCategory(t, e) {
            switch (
              (function (t) {
                return (function (t) {
                  const e = (function (t) {
                    return t.toLowerCase().replace(/_/g, "-");
                  })(t);
                  let n = wa(e);
                  if (n) return n;
                  const i = e.split("-")[0];
                  if (((n = wa(i)), n)) return n;
                  if ("en" === i) return ba;
                  throw new Error(`Missing locale data for the locale "${t}".`);
                })(t)[xa.PluralCase];
              })(e || this.locale)(t)
            ) {
              case yc.Zero:
                return "zero";
              case yc.One:
                return "one";
              case yc.Two:
                return "two";
              case yc.Few:
                return "few";
              case yc.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(ul));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function wc(t, e) {
        e = encodeURIComponent(e);
        for (const n of t.split(";")) {
          const t = n.indexOf("="),
            [i, s] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
          if (i.trim() === e) return decodeURIComponent(s);
        }
        return null;
      }
      let xc = (() => {
        class t {
          constructor(t, e, n, i) {
            (this._iterableDiffers = t),
              (this._keyValueDiffers = e),
              (this._ngEl = n),
              (this._renderer = i),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._initialClasses = []),
              (this._rawClass = null);
          }
          set klass(t) {
            this._removeClasses(this._initialClasses),
              (this._initialClasses =
                "string" == typeof t ? t.split(/\s+/) : []),
              this._applyClasses(this._initialClasses),
              this._applyClasses(this._rawClass);
          }
          set ngClass(t) {
            this._removeClasses(this._rawClass),
              this._applyClasses(this._initialClasses),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._rawClass = "string" == typeof t ? t.split(/\s+/) : t),
              this._rawClass &&
                (Pr(this._rawClass)
                  ? (this._iterableDiffer = this._iterableDiffers
                      .find(this._rawClass)
                      .create())
                  : (this._keyValueDiffer = this._keyValueDiffers
                      .find(this._rawClass)
                      .create()));
          }
          ngDoCheck() {
            if (this._iterableDiffer) {
              const t = this._iterableDiffer.diff(this._rawClass);
              t && this._applyIterableChanges(t);
            } else if (this._keyValueDiffer) {
              const t = this._keyValueDiffer.diff(this._rawClass);
              t && this._applyKeyValueChanges(t);
            }
          }
          _applyKeyValueChanges(t) {
            t.forEachAddedItem((t) => this._toggleClass(t.key, t.currentValue)),
              t.forEachChangedItem((t) =>
                this._toggleClass(t.key, t.currentValue)
              ),
              t.forEachRemovedItem((t) => {
                t.previousValue && this._toggleClass(t.key, !1);
              });
          }
          _applyIterableChanges(t) {
            t.forEachAddedItem((t) => {
              if ("string" != typeof t.item)
                throw new Error(
                  "NgClass can only toggle CSS classes expressed as strings, got " +
                    yt(t.item)
                );
              this._toggleClass(t.item, !0);
            }),
              t.forEachRemovedItem((t) => this._toggleClass(t.item, !1));
          }
          _applyClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((t) => this._toggleClass(t, !0))
                : Object.keys(t).forEach((e) => this._toggleClass(e, !!t[e])));
          }
          _removeClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((t) => this._toggleClass(t, !1))
                : Object.keys(t).forEach((t) => this._toggleClass(t, !1)));
          }
          _toggleClass(t, e) {
            (t = t.trim()) &&
              t.split(/\s+/g).forEach((t) => {
                e
                  ? this._renderer.addClass(this._ngEl.nativeElement, t)
                  : this._renderer.removeClass(this._ngEl.nativeElement, t);
              });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(jr(ia), jr(sa), jr(jo), jr(Bo));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
          })),
          t
        );
      })();
      class Cc {
        constructor(t, e, n, i) {
          (this.$implicit = t),
            (this.ngForOf = e),
            (this.index = n),
            (this.count = i);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Sc = (() => {
        class t {
          constructor(t, e, n) {
            (this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            mi() &&
              null != t &&
              "function" != typeof t &&
              console &&
              console.warn &&
              console.warn(
                `trackBy must be a function, but received ${JSON.stringify(
                  t
                )}. See https://angular.io/api/common/NgForOf#change-propagation for more information.`
              ),
              (this._trackByFn = t);
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              if (!this._differ && n)
                try {
                  this._differ = this._differs
                    .find(n)
                    .create(this.ngForTrackBy);
                } catch (e) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${
                      ((t = n), t.name || typeof t)
                    }'. NgFor only supports binding to Iterables such as Arrays.`
                  );
                }
            }
            var t;
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const e = [];
            t.forEachOperation((t, n, i) => {
              if (null == t.previousIndex) {
                const n = this._viewContainer.createEmbeddedView(
                    this._template,
                    new Cc(null, this._ngForOf, -1, -1),
                    null === i ? void 0 : i
                  ),
                  s = new kc(t, n);
                e.push(s);
              } else if (null == i)
                this._viewContainer.remove(null === n ? void 0 : n);
              else if (null !== n) {
                const s = this._viewContainer.get(n);
                this._viewContainer.move(s, i);
                const r = new kc(t, s);
                e.push(r);
              }
            });
            for (let n = 0; n < e.length; n++)
              this._perViewChange(e[n].view, e[n].record);
            for (let n = 0, i = this._viewContainer.length; n < i; n++) {
              const t = this._viewContainer.get(n);
              (t.context.index = n),
                (t.context.count = i),
                (t.context.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((t) => {
              this._viewContainer.get(t.currentIndex).context.$implicit =
                t.item;
            });
          }
          _perViewChange(t, e) {
            t.context.$implicit = e.item;
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(jr(ha), jr(la), jr(ia));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          t
        );
      })();
      class kc {
        constructor(t, e) {
          (this.record = t), (this.view = e);
        }
      }
      let Ec = (() => {
        class t {
          constructor(t, e) {
            (this._viewContainer = t),
              (this._context = new Tc()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = e);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            Ac("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            Ac("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(jr(ha), jr(la));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          t
        );
      })();
      class Tc {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Ac(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${t} must be a TemplateRef, but received '${yt(e)}'.`
          );
      }
      class Oc {
        constructor(t, e) {
          (this._viewContainerRef = t),
            (this._templateRef = e),
            (this._created = !1);
        }
        create() {
          (this._created = !0),
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
        destroy() {
          (this._created = !1), this._viewContainerRef.clear();
        }
        enforceState(t) {
          t && !this._created
            ? this.create()
            : !t && this._created && this.destroy();
        }
      }
      let Ic = (() => {
          class t {
            constructor() {
              (this._defaultUsed = !1),
                (this._caseCount = 0),
                (this._lastCaseCheckIndex = 0),
                (this._lastCasesMatched = !1);
            }
            set ngSwitch(t) {
              (this._ngSwitch = t),
                0 === this._caseCount && this._updateDefaultCases(!0);
            }
            _addCase() {
              return this._caseCount++;
            }
            _addDefault(t) {
              this._defaultViews || (this._defaultViews = []),
                this._defaultViews.push(t);
            }
            _matchCase(t) {
              const e = t == this._ngSwitch;
              return (
                (this._lastCasesMatched = this._lastCasesMatched || e),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                e
              );
            }
            _updateDefaultCases(t) {
              if (this._defaultViews && t !== this._defaultUsed) {
                this._defaultUsed = t;
                for (let e = 0; e < this._defaultViews.length; e++)
                  this._defaultViews[e].enforceState(t);
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["", "ngSwitch", ""]],
              inputs: { ngSwitch: "ngSwitch" },
            })),
            t
          );
        })(),
        Pc = (() => {
          class t {
            constructor(t, e, n) {
              (this.ngSwitch = n), n._addCase(), (this._view = new Oc(t, e));
            }
            ngDoCheck() {
              this._view.enforceState(
                this.ngSwitch._matchCase(this.ngSwitchCase)
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(jr(ha), jr(la), jr(Ic, 1));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["", "ngSwitchCase", ""]],
              inputs: { ngSwitchCase: "ngSwitchCase" },
            })),
            t
          );
        })(),
        Rc = (() => {
          class t {
            constructor(t, e, n) {
              (this._ngEl = t),
                (this._differs = e),
                (this._renderer = n),
                (this._ngStyle = null),
                (this._differ = null);
            }
            set ngStyle(t) {
              (this._ngStyle = t),
                !this._differ &&
                  t &&
                  (this._differ = this._differs.find(t).create());
            }
            ngDoCheck() {
              if (this._differ) {
                const t = this._differ.diff(this._ngStyle);
                t && this._applyChanges(t);
              }
            }
            _setStyle(t, e) {
              const [n, i] = t.split(".");
              null != (e = null != e && i ? `${e}${i}` : e)
                ? this._renderer.setStyle(this._ngEl.nativeElement, n, e)
                : this._renderer.removeStyle(this._ngEl.nativeElement, n);
            }
            _applyChanges(t) {
              t.forEachRemovedItem((t) => this._setStyle(t.key, null)),
                t.forEachAddedItem((t) =>
                  this._setStyle(t.key, t.currentValue)
                ),
                t.forEachChangedItem((t) =>
                  this._setStyle(t.key, t.currentValue)
                );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(jr(jo), jr(sa), jr(Bo));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["", "ngStyle", ""]],
              inputs: { ngStyle: "ngStyle" },
            })),
            t
          );
        })();
      class Dc {
        createSubscription(t, e) {
          return t.subscribe({
            next: e,
            error: (t) => {
              throw t;
            },
          });
        }
        dispose(t) {
          t.unsubscribe();
        }
        onDestroy(t) {
          t.unsubscribe();
        }
      }
      class Nc {
        createSubscription(t, e) {
          return t.then(e, (t) => {
            throw t;
          });
        }
        dispose(t) {}
        onDestroy(t) {}
      }
      const Fc = new Nc(),
        Lc = new Dc();
      let Mc = (() => {
          class t {
            constructor(t) {
              (this._ref = t),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null),
                (this._strategy = null);
            }
            ngOnDestroy() {
              this._subscription && this._dispose();
            }
            transform(t) {
              return this._obj
                ? t !== this._obj
                  ? (this._dispose(), this.transform(t))
                  : this._latestValue
                : (t && this._subscribe(t), this._latestValue);
            }
            _subscribe(t) {
              (this._obj = t),
                (this._strategy = this._selectStrategy(t)),
                (this._subscription = this._strategy.createSubscription(
                  t,
                  (e) => this._updateLatestValue(t, e)
                ));
            }
            _selectStrategy(e) {
              if (Zr(e)) return Fc;
              if (Kr(e)) return Lc;
              throw Error(`InvalidPipeArgument: '${e}' for pipe '${yt(t)}'`);
            }
            _dispose() {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null);
            }
            _updateLatestValue(t, e) {
              t === this._obj &&
                ((this._latestValue = e), this._ref.markForCheck());
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                (function (t = rt.Default) {
                  const e = ar(!0);
                  if (null != e || t & rt.Optional) return e;
                  throw new Error("No provider for ChangeDetectorRef!");
                })()
              );
            }),
            (t.ɵpipe = ye({ name: "async", type: t, pure: !1 })),
            t
          );
        })(),
        jc = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [{ provide: bc, useClass: vc }],
            })),
            t
          );
        })(),
        Vc = (() => {
          class t {}
          return (
            (t.ɵprov = lt({
              token: t,
              providedIn: "root",
              factory: () => new $c(Wt(tc), window, Wt(di)),
            })),
            t
          );
        })();
      class $c {
        constructor(t, e, n) {
          (this.document = t),
            (this.window = e),
            (this.errorHandler = n),
            (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportScrollRestoration()
            ? [this.window.scrollX, this.window.scrollY]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportScrollRestoration() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (this.supportScrollRestoration()) {
            t =
              this.window.CSS && this.window.CSS.escape
                ? this.window.CSS.escape(t)
                : t.replace(/(\"|\'\ |:|\.|\[|\]|,|=)/g, "\\$1");
            try {
              const e = this.document.querySelector("#" + t);
              if (e) return void this.scrollToElement(e);
              const n = this.document.querySelector(`[name='${t}']`);
              if (n) return void this.scrollToElement(n);
            } catch (e) {
              this.errorHandler.handleError(e);
            }
          }
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            i = e.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(n - s[0], i - s[1]);
        }
        supportScrollRestoration() {
          try {
            return !!this.window && !!this.window.scrollTo;
          } catch (t) {
            return !1;
          }
        }
      }
      class Hc extends class extends class {} {
        constructor() {
          super();
        }
        supportsDOMEvents() {
          return !0;
        }
      } {
        static makeCurrent() {
          var t;
          (t = new Hc()), Yl || (Yl = t);
        }
        getProperty(t, e) {
          return t[e];
        }
        log(t) {
          window.console && window.console.log && window.console.log(t);
        }
        logGroup(t) {
          window.console && window.console.group && window.console.group(t);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          return t.parentNode && t.parentNode.removeChild(t), t;
        }
        getValue(t) {
          return t.value;
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(t) {
          const e =
            Uc || ((Uc = document.querySelector("base")), Uc)
              ? Uc.getAttribute("href")
              : null;
          return null == e
            ? null
            : ((n = e),
              Bc || (Bc = document.createElement("a")),
              Bc.setAttribute("href", n),
              "/" === Bc.pathname.charAt(0) ? Bc.pathname : "/" + Bc.pathname);
          var n;
        }
        resetBaseElement() {
          Uc = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(t) {
          return wc(document.cookie, t);
        }
      }
      let Bc,
        Uc = null;
      const zc = new Lt("TRANSITION_ID"),
        qc = [
          {
            provide: nl,
            useFactory: function (t, e, n) {
              return () => {
                n.get(il).donePromise.then(() => {
                  const n = Jl();
                  Array.prototype.slice
                    .apply(e.querySelectorAll("style[ng-transition]"))
                    .filter((e) => e.getAttribute("ng-transition") === t)
                    .forEach((t) => n.remove(t));
                });
              };
            },
            deps: [zc, tc, kr],
            multi: !0,
          },
        ];
      class Wc {
        static init() {
          var t;
          (t = new Wc()), (Fl = t);
        }
        addToWindow(t) {
          (At.getAngularTestability = (e, n = !0) => {
            const i = t.findTestabilityInTree(e, n);
            if (null == i)
              throw new Error("Could not find testability for element.");
            return i;
          }),
            (At.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (At.getAllAngularRootElements = () => t.getAllRootElements()),
            At.frameworkStabilizers || (At.frameworkStabilizers = []),
            At.frameworkStabilizers.push((t) => {
              const e = At.getAllAngularTestabilities();
              let n = e.length,
                i = !1;
              const s = function (e) {
                (i = i || e), n--, 0 == n && t(i);
              };
              e.forEach(function (t) {
                t.whenStable(s);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const i = t.getTestability(e);
          return null != i
            ? i
            : n
            ? Jl().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      const Gc = new Lt("EventManagerPlugins");
      let Zc = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach((t) => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let i = 0; i < n.length; i++) {
              const e = n[i];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error("No event manager plugin found for event " + t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(Gc), Wt(Cl));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Kc {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const i = Jl().getGlobalEventTarget(this._doc, t);
          if (!i)
            throw new Error(`Unsupported event target ${i} for event ${e}`);
          return this.addEventListener(i, e, n);
        }
      }
      let Qc = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach((t) => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Xc = (() => {
          class t extends Qc {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Set()),
                (this._styleNodes = new Set()),
                this._hostNodes.add(t.head);
            }
            _addStylesToHost(t, e) {
              t.forEach((t) => {
                const n = this._doc.createElement("style");
                (n.textContent = t), this._styleNodes.add(e.appendChild(n));
              });
            }
            addHost(t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
            }
            removeHost(t) {
              this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e) => this._addStylesToHost(t, e));
            }
            ngOnDestroy() {
              this._styleNodes.forEach((t) => Jl().remove(t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(tc));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Yc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        Jc = /%COMP%/g;
      function th(t, e, n) {
        for (let i = 0; i < e.length; i++) {
          let s = e[i];
          Array.isArray(s) ? th(t, s, n) : ((s = s.replace(Jc, t)), n.push(s));
        }
        return n;
      }
      function eh(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let nh = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new ih(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case ae.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new sh(
                      this.eventManager,
                      this.sharedStylesHost,
                      e,
                      this.appId
                    )),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case ae.Native:
              case ae.ShadowDom:
                return new rh(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = th(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(Zc), Wt(Xc), Wt(sl));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class ih {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(Yc[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = "string" == typeof t ? document.querySelector(t) : t;
          if (!n)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ""), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, i) {
          if (i) {
            e = i + ":" + e;
            const s = Yc[i];
            s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const i = Yc[n];
            i ? t.removeAttributeNS(i, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, i) {
          i & Ho.DashCase
            ? t.style.setProperty(e, n, i & Ho.Important ? "important" : "")
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & Ho.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, eh(n))
            : this.eventManager.addEventListener(t, e, eh(n));
        }
      }
      class sh extends ih {
        constructor(t, e, n, i) {
          super(t), (this.component = n);
          const s = th(i + "-" + n.id, n.styles, []);
          e.addStyles(s),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              Jc,
              i + "-" + n.id
            )),
            (this.hostAttr = (function (t) {
              return "_nghost-%COMP%".replace(Jc, t);
            })(i + "-" + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class rh extends ih {
        constructor(t, e, n, i) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.component = i),
            (this.shadowRoot =
              i.encapsulation === ae.ShadowDom
                ? n.attachShadow({ mode: "open" })
                : n.createShadowRoot()),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = th(i.id, i.styles, []);
          for (let r = 0; r < s.length; r++) {
            const t = document.createElement("style");
            (t.textContent = s[r]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let oh = (() => {
        class t extends Kc {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return (
              t.addEventListener(e, n, !1),
              () => this.removeEventListener(t, e, n)
            );
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(tc));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ah = ["alt", "control", "meta", "shift"],
        lh = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        ch = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        hh = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let uh = (() => {
        class t extends Kc {
          constructor(t) {
            super(t);
          }
          supports(e) {
            return null != t.parseEventName(e);
          }
          addEventListener(e, n, i) {
            const s = t.parseEventName(n),
              r = t.eventCallback(s.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Jl().onAndCancel(e, s.domEventName, r));
          }
          static parseEventName(e) {
            const n = e.toLowerCase().split("."),
              i = n.shift();
            if (0 === n.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const s = t._normalizeKey(n.pop());
            let r = "";
            return (
              ah.forEach((t) => {
                const e = n.indexOf(t);
                e > -1 && (n.splice(e, 1), (r += t + "."));
              }),
              (r += s),
              0 != n.length || 0 === s.length
                ? null
                : { domEventName: i, fullKey: r }
            );
          }
          static getEventFullKey(t) {
            let e = "",
              n = (function (t) {
                let e = t.key;
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return "Unidentified";
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && ch.hasOwnProperty(e) && (e = ch[e]));
                }
                return lh[e] || e;
              })(t);
            return (
              (n = n.toLowerCase()),
              " " === n ? (n = "space") : "." === n && (n = "dot"),
              ah.forEach((i) => {
                i != n && (0, hh[i])(t) && (e += i + ".");
              }),
              (e += n),
              e
            );
          }
          static eventCallback(e, n, i) {
            return (s) => {
              t.getEventFullKey(s) === e && i.runGuarded(() => n(s));
            };
          }
          static _normalizeKey(t) {
            switch (t) {
              case "esc":
                return "escape";
              default:
                return t;
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(tc));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const dh = jl(Kl, "browser", [
          { provide: ll, useValue: "browser" },
          {
            provide: al,
            useValue: function () {
              Hc.makeCurrent(), Wc.init();
            },
            multi: !0,
          },
          {
            provide: tc,
            useFactory: function () {
              return (
                (function (t) {
                  Fe = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        ph = [
          [],
          { provide: ur, useValue: "root" },
          {
            provide: di,
            useFactory: function () {
              return new di();
            },
            deps: [],
          },
          { provide: Gc, useClass: oh, multi: !0, deps: [tc, Cl, ll] },
          { provide: Gc, useClass: uh, multi: !0, deps: [tc] },
          [],
          { provide: nh, useClass: nh, deps: [Zc, Xc, sl] },
          { provide: $o, useExisting: nh },
          { provide: Qc, useExisting: Xc },
          { provide: Xc, useClass: Xc, deps: [tc] },
          { provide: Pl, useClass: Pl, deps: [Cl] },
          { provide: Zc, useClass: Zc, deps: [Gc, Cl] },
          [],
        ];
      let fh = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [
                { provide: sl, useValue: e.appId },
                { provide: zc, useExisting: sl },
                qc,
              ],
            };
          }
        }
        return (
          (t.ɵmod = me({ type: t })),
          (t.ɵinj = ct({
            factory: function (e) {
              return new (e || t)(Wt(t, 12));
            },
            providers: ph,
            imports: [jc, Xl],
          })),
          t
        );
      })();
      "undefined" != typeof window && window;
      class mh {}
      function gh(t, e) {
        return { type: 7, name: t, definitions: e, options: {} };
      }
      function _h(t, e = null) {
        return { type: 4, styles: e, timings: t };
      }
      function yh(t, e = null) {
        return { type: 2, steps: t, options: e };
      }
      function bh(t) {
        return { type: 6, styles: t, offset: null };
      }
      function vh(t, e, n) {
        return { type: 0, name: t, styles: e, options: n };
      }
      function wh(t, e, n = null) {
        return { type: 1, expr: t, animation: e, options: n };
      }
      function xh(t) {
        Promise.resolve(null).then(t);
      }
      class Ch {
        constructor(t = 0, e = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this.parentPlayer = null),
            (this.totalTime = t + e);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          xh(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {}
        setPosition(t) {}
        getPosition() {
          return 0;
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
      }
      class Sh {
        constructor(t) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = t);
          let e = 0,
            n = 0,
            i = 0;
          const s = this.players.length;
          0 == s
            ? xh(() => this._onFinish())
            : this.players.forEach((t) => {
                t.onDone(() => {
                  ++e == s && this._onFinish();
                }),
                  t.onDestroy(() => {
                    ++n == s && this._onDestroy();
                  }),
                  t.onStart(() => {
                    ++i == s && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (t, e) => Math.max(t, e.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((t) => t.init());
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((t) => t()),
            (this._onStartFns = []));
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((t) => t.play());
        }
        pause() {
          this.players.forEach((t) => t.pause());
        }
        restart() {
          this.players.forEach((t) => t.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((t) => t.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((t) => t.destroy()),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((t) => t.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(t) {
          const e = t * this.totalTime;
          this.players.forEach((t) => {
            const n = t.totalTime ? Math.min(1, e / t.totalTime) : 1;
            t.setPosition(n);
          });
        }
        getPosition() {
          let t = 0;
          return (
            this.players.forEach((e) => {
              const n = e.getPosition();
              t = Math.min(n, t);
            }),
            t
          );
        }
        beforeDestroy() {
          this.players.forEach((t) => {
            t.beforeDestroy && t.beforeDestroy();
          });
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
      }
      function kh() {
        return (
          "undefined" != typeof process &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function Eh(t) {
        switch (t.length) {
          case 0:
            return new Ch();
          case 1:
            return t[0];
          default:
            return new Sh(t);
        }
      }
      function Th(t, e, n, i, s = {}, r = {}) {
        const o = [],
          a = [];
        let l = -1,
          c = null;
        if (
          (i.forEach((t) => {
            const n = t.offset,
              i = n == l,
              h = (i && c) || {};
            Object.keys(t).forEach((n) => {
              let i = n,
                a = t[n];
              if ("offset" !== n)
                switch (((i = e.normalizePropertyName(i, o)), a)) {
                  case "!":
                    a = s[n];
                    break;
                  case "*":
                    a = r[n];
                    break;
                  default:
                    a = e.normalizeStyleValue(n, i, a, o);
                }
              h[i] = a;
            }),
              i || a.push(h),
              (c = h),
              (l = n);
          }),
          o.length)
        ) {
          const t = "\n - ";
          throw new Error(
            `Unable to animate due to the following errors:${t}${o.join(t)}`
          );
        }
        return a;
      }
      function Ah(t, e, n, i) {
        switch (e) {
          case "start":
            t.onStart(() => i(n && Oh(n, "start", t)));
            break;
          case "done":
            t.onDone(() => i(n && Oh(n, "done", t)));
            break;
          case "destroy":
            t.onDestroy(() => i(n && Oh(n, "destroy", t)));
        }
      }
      function Oh(t, e, n) {
        const i = n.totalTime,
          s = Ih(
            t.element,
            t.triggerName,
            t.fromState,
            t.toState,
            e || t.phaseName,
            null == i ? t.totalTime : i,
            !!n.disabled
          ),
          r = t._data;
        return null != r && (s._data = r), s;
      }
      function Ih(t, e, n, i, s = "", r = 0, o) {
        return {
          element: t,
          triggerName: e,
          fromState: n,
          toState: i,
          phaseName: s,
          totalTime: r,
          disabled: !!o,
        };
      }
      function Ph(t, e, n) {
        let i;
        return (
          t instanceof Map
            ? ((i = t.get(e)), i || t.set(e, (i = n)))
            : ((i = t[e]), i || (i = t[e] = n)),
          i
        );
      }
      function Rh(t) {
        const e = t.indexOf(":");
        return [t.substring(1, e), t.substr(e + 1)];
      }
      let Dh = (t, e) => !1,
        Nh = (t, e) => !1,
        Fh = (t, e, n) => [];
      const Lh = kh();
      (Lh || "undefined" != typeof Element) &&
        ((Dh = (t, e) => t.contains(e)),
        (Nh = (() => {
          if (Lh || Element.prototype.matches) return (t, e) => t.matches(e);
          {
            const t = Element.prototype,
              e =
                t.matchesSelector ||
                t.mozMatchesSelector ||
                t.msMatchesSelector ||
                t.oMatchesSelector ||
                t.webkitMatchesSelector;
            return e ? (t, n) => e.apply(t, [n]) : Nh;
          }
        })()),
        (Fh = (t, e, n) => {
          let i = [];
          if (n) i.push(...t.querySelectorAll(e));
          else {
            const n = t.querySelector(e);
            n && i.push(n);
          }
          return i;
        }));
      let Mh = null,
        jh = !1;
      function Vh(t) {
        Mh ||
          ((Mh = ("undefined" != typeof document ? document.body : null) || {}),
          (jh = !!Mh.style && "WebkitAppearance" in Mh.style));
        let e = !0;
        return (
          Mh.style &&
            !(function (t) {
              return "ebkit" == t.substring(1, 6);
            })(t) &&
            ((e = t in Mh.style), !e && jh) &&
            (e =
              "Webkit" + t.charAt(0).toUpperCase() + t.substr(1) in Mh.style),
          e
        );
      }
      const $h = Nh,
        Hh = Dh,
        Bh = Fh;
      function Uh(t) {
        const e = {};
        return (
          Object.keys(t).forEach((n) => {
            const i = n.replace(/([a-z])([A-Z])/g, "$1-$2");
            e[i] = t[n];
          }),
          e
        );
      }
      let zh = (() => {
          class t {
            validateStyleProperty(t) {
              return Vh(t);
            }
            matchesElement(t, e) {
              return $h(t, e);
            }
            containsElement(t, e) {
              return Hh(t, e);
            }
            query(t, e, n) {
              return Bh(t, e, n);
            }
            computeStyle(t, e, n) {
              return n || "";
            }
            animate(t, e, n, i, s, r = [], o) {
              return new Ch(n, i);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        qh = (() => {
          class t {}
          return (t.NOOP = new zh()), t;
        })();
      function Wh(t) {
        if ("number" == typeof t) return t;
        const e = t.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : Gh(parseFloat(e[1]), e[2]);
      }
      function Gh(t, e) {
        switch (e) {
          case "s":
            return 1e3 * t;
          default:
            return t;
        }
      }
      function Zh(t, e, n) {
        return t.hasOwnProperty("duration")
          ? t
          : (function (t, e, n) {
              let i,
                s = 0,
                r = "";
              if ("string" == typeof t) {
                const n = t.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === n)
                  return (
                    e.push(`The provided timing value "${t}" is invalid.`),
                    { duration: 0, delay: 0, easing: "" }
                  );
                i = Gh(parseFloat(n[1]), n[2]);
                const o = n[3];
                null != o && (s = Gh(parseFloat(o), n[4]));
                const a = n[5];
                a && (r = a);
              } else i = t;
              if (!n) {
                let n = !1,
                  r = e.length;
                i < 0 &&
                  (e.push(
                    "Duration values below 0 are not allowed for this animation step."
                  ),
                  (n = !0)),
                  s < 0 &&
                    (e.push(
                      "Delay values below 0 are not allowed for this animation step."
                    ),
                    (n = !0)),
                  n &&
                    e.splice(
                      r,
                      0,
                      `The provided timing value "${t}" is invalid.`
                    );
              }
              return { duration: i, delay: s, easing: r };
            })(t, e, n);
      }
      function Kh(t, e = {}) {
        return (
          Object.keys(t).forEach((n) => {
            e[n] = t[n];
          }),
          e
        );
      }
      function Qh(t, e, n = {}) {
        if (e) for (let i in t) n[i] = t[i];
        else Kh(t, n);
        return n;
      }
      function Xh(t, e, n) {
        return n ? e + ":" + n + ";" : "";
      }
      function Yh(t) {
        let e = "";
        for (let n = 0; n < t.style.length; n++) {
          const i = t.style.item(n);
          e += Xh(0, i, t.style.getPropertyValue(i));
        }
        for (const n in t.style)
          t.style.hasOwnProperty(n) &&
            !n.startsWith("_") &&
            (e += Xh(
              0,
              n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
              t.style[n]
            ));
        t.setAttribute("style", e);
      }
      function Jh(t, e, n) {
        t.style &&
          (Object.keys(e).forEach((i) => {
            const s = au(i);
            n && !n.hasOwnProperty(i) && (n[i] = t.style[s]),
              (t.style[s] = e[i]);
          }),
          kh() && Yh(t));
      }
      function tu(t, e) {
        t.style &&
          (Object.keys(e).forEach((e) => {
            const n = au(e);
            t.style[n] = "";
          }),
          kh() && Yh(t));
      }
      function eu(t) {
        return Array.isArray(t) ? (1 == t.length ? t[0] : yh(t)) : t;
      }
      const nu = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function iu(t) {
        let e = [];
        if ("string" == typeof t) {
          let n;
          for (; (n = nu.exec(t)); ) e.push(n[1]);
          nu.lastIndex = 0;
        }
        return e;
      }
      function su(t, e, n) {
        const i = t.toString(),
          s = i.replace(nu, (t, i) => {
            let s = e[i];
            return (
              e.hasOwnProperty(i) ||
                (n.push("Please provide a value for the animation param " + i),
                (s = "")),
              s.toString()
            );
          });
        return s == i ? t : s;
      }
      function ru(t) {
        const e = [];
        let n = t.next();
        for (; !n.done; ) e.push(n.value), (n = t.next());
        return e;
      }
      const ou = /-+([a-z0-9])/g;
      function au(t) {
        return t.replace(ou, (...t) => t[1].toUpperCase());
      }
      function lu(t, e) {
        return 0 === t || 0 === e;
      }
      function cu(t, e, n) {
        const i = Object.keys(n);
        if (i.length && e.length) {
          let r = e[0],
            o = [];
          if (
            (i.forEach((t) => {
              r.hasOwnProperty(t) || o.push(t), (r[t] = n[t]);
            }),
            o.length)
          )
            for (var s = 1; s < e.length; s++) {
              let n = e[s];
              o.forEach(function (e) {
                n[e] = uu(t, e);
              });
            }
        }
        return e;
      }
      function hu(t, e, n) {
        switch (e.type) {
          case 7:
            return t.visitTrigger(e, n);
          case 0:
            return t.visitState(e, n);
          case 1:
            return t.visitTransition(e, n);
          case 2:
            return t.visitSequence(e, n);
          case 3:
            return t.visitGroup(e, n);
          case 4:
            return t.visitAnimate(e, n);
          case 5:
            return t.visitKeyframes(e, n);
          case 6:
            return t.visitStyle(e, n);
          case 8:
            return t.visitReference(e, n);
          case 9:
            return t.visitAnimateChild(e, n);
          case 10:
            return t.visitAnimateRef(e, n);
          case 11:
            return t.visitQuery(e, n);
          case 12:
            return t.visitStagger(e, n);
          default:
            throw new Error(
              "Unable to resolve animation metadata node #" + e.type
            );
        }
      }
      function uu(t, e) {
        return window.getComputedStyle(t)[e];
      }
      function du(t, e) {
        const n = [];
        return (
          "string" == typeof t
            ? t.split(/\s*,\s*/).forEach((t) =>
                (function (t, e, n) {
                  if (":" == t[0]) {
                    const i = (function (t, e) {
                      switch (t) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (t, e) => parseFloat(e) > parseFloat(t);
                        case ":decrement":
                          return (t, e) => parseFloat(e) < parseFloat(t);
                        default:
                          return (
                            e.push(
                              `The transition alias value "${t}" is not supported`
                            ),
                            "* => *"
                          );
                      }
                    })(t, n);
                    if ("function" == typeof i) return void e.push(i);
                    t = i;
                  }
                  const i = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == i || i.length < 4)
                    return (
                      n.push(
                        `The provided transition expression "${t}" is not supported`
                      ),
                      e
                    );
                  const s = i[1],
                    r = i[2],
                    o = i[3];
                  e.push(mu(s, o)),
                    "<" != r[0] || ("*" == s && "*" == o) || e.push(mu(o, s));
                })(t, n, e)
              )
            : n.push(t),
          n
        );
      }
      const pu = new Set(["true", "1"]),
        fu = new Set(["false", "0"]);
      function mu(t, e) {
        const n = pu.has(t) || fu.has(t),
          i = pu.has(e) || fu.has(e);
        return (s, r) => {
          let o = "*" == t || t == s,
            a = "*" == e || e == r;
          return (
            !o && n && "boolean" == typeof s && (o = s ? pu.has(t) : fu.has(t)),
            !a && i && "boolean" == typeof r && (a = r ? pu.has(e) : fu.has(e)),
            o && a
          );
        };
      }
      const gu = new RegExp("s*:selfs*,?", "g");
      function _u(t, e, n) {
        return new yu(t).build(e, n);
      }
      class yu {
        constructor(t) {
          this._driver = t;
        }
        build(t, e) {
          const n = new bu(e);
          return this._resetContextStyleTimingState(n), hu(this, eu(t), n);
        }
        _resetContextStyleTimingState(t) {
          (t.currentQuerySelector = ""),
            (t.collectedStyles = {}),
            (t.collectedStyles[""] = {}),
            (t.currentTime = 0);
        }
        visitTrigger(t, e) {
          let n = (e.queryCount = 0),
            i = (e.depCount = 0);
          const s = [],
            r = [];
          return (
            "@" == t.name.charAt(0) &&
              e.errors.push(
                "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
              ),
            t.definitions.forEach((t) => {
              if ((this._resetContextStyleTimingState(e), 0 == t.type)) {
                const n = t,
                  i = n.name;
                i
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((t) => {
                    (n.name = t), s.push(this.visitState(n, e));
                  }),
                  (n.name = i);
              } else if (1 == t.type) {
                const s = this.visitTransition(t, e);
                (n += s.queryCount), (i += s.depCount), r.push(s);
              } else
                e.errors.push(
                  "only state() and transition() definitions can sit inside of a trigger()"
                );
            }),
            {
              type: 7,
              name: t.name,
              states: s,
              transitions: r,
              queryCount: n,
              depCount: i,
              options: null,
            }
          );
        }
        visitState(t, e) {
          const n = this.visitStyle(t.styles, e),
            i = (t.options && t.options.params) || null;
          if (n.containsDynamicStyles) {
            const s = new Set(),
              r = i || {};
            if (
              (n.styles.forEach((t) => {
                if (vu(t)) {
                  const e = t;
                  Object.keys(e).forEach((t) => {
                    iu(e[t]).forEach((t) => {
                      r.hasOwnProperty(t) || s.add(t);
                    });
                  });
                }
              }),
              s.size)
            ) {
              const n = ru(s.values());
              e.errors.push(
                `state("${
                  t.name
                }", ...) must define default values for all the following style substitutions: ${n.join(
                  ", "
                )}`
              );
            }
          }
          return {
            type: 0,
            name: t.name,
            style: n,
            options: i ? { params: i } : null,
          };
        }
        visitTransition(t, e) {
          (e.queryCount = 0), (e.depCount = 0);
          const n = hu(this, eu(t.animation), e);
          return {
            type: 1,
            matchers: du(t.expr, e.errors),
            animation: n,
            queryCount: e.queryCount,
            depCount: e.depCount,
            options: wu(t.options),
          };
        }
        visitSequence(t, e) {
          return {
            type: 2,
            steps: t.steps.map((t) => hu(this, t, e)),
            options: wu(t.options),
          };
        }
        visitGroup(t, e) {
          const n = e.currentTime;
          let i = 0;
          const s = t.steps.map((t) => {
            e.currentTime = n;
            const s = hu(this, t, e);
            return (i = Math.max(i, e.currentTime)), s;
          });
          return (
            (e.currentTime = i), { type: 3, steps: s, options: wu(t.options) }
          );
        }
        visitAnimate(t, e) {
          const n = (function (t, e) {
            let n = null;
            if (t.hasOwnProperty("duration")) n = t;
            else if ("number" == typeof t) return xu(Zh(t, e).duration, 0, "");
            const i = t;
            if (
              i
                .split(/\s+/)
                .some((t) => "{" == t.charAt(0) && "{" == t.charAt(1))
            ) {
              const t = xu(0, 0, "");
              return (t.dynamic = !0), (t.strValue = i), t;
            }
            return (n = n || Zh(i, e)), xu(n.duration, n.delay, n.easing);
          })(t.timings, e.errors);
          let i;
          e.currentAnimateTimings = n;
          let s = t.styles ? t.styles : bh({});
          if (5 == s.type) i = this.visitKeyframes(s, e);
          else {
            let s = t.styles,
              r = !1;
            if (!s) {
              r = !0;
              const t = {};
              n.easing && (t.easing = n.easing), (s = bh(t));
            }
            e.currentTime += n.duration + n.delay;
            const o = this.visitStyle(s, e);
            (o.isEmptyStep = r), (i = o);
          }
          return (
            (e.currentAnimateTimings = null),
            { type: 4, timings: n, style: i, options: null }
          );
        }
        visitStyle(t, e) {
          const n = this._makeStyleAst(t, e);
          return this._validateStyleAst(n, e), n;
        }
        _makeStyleAst(t, e) {
          const n = [];
          Array.isArray(t.styles)
            ? t.styles.forEach((t) => {
                "string" == typeof t
                  ? "*" == t
                    ? n.push(t)
                    : e.errors.push(
                        `The provided style string value ${t} is not allowed.`
                      )
                  : n.push(t);
              })
            : n.push(t.styles);
          let i = !1,
            s = null;
          return (
            n.forEach((t) => {
              if (vu(t)) {
                const e = t,
                  n = e.easing;
                if ((n && ((s = n), delete e.easing), !i))
                  for (let t in e)
                    if (e[t].toString().indexOf("{{") >= 0) {
                      i = !0;
                      break;
                    }
              }
            }),
            {
              type: 6,
              styles: n,
              easing: s,
              offset: t.offset,
              containsDynamicStyles: i,
              options: null,
            }
          );
        }
        _validateStyleAst(t, e) {
          const n = e.currentAnimateTimings;
          let i = e.currentTime,
            s = e.currentTime;
          n && s > 0 && (s -= n.duration + n.delay),
            t.styles.forEach((t) => {
              "string" != typeof t &&
                Object.keys(t).forEach((n) => {
                  if (!this._driver.validateStyleProperty(n))
                    return void e.errors.push(
                      `The provided animation property "${n}" is not a supported CSS property for animations`
                    );
                  const r = e.collectedStyles[e.currentQuerySelector],
                    o = r[n];
                  let a = !0;
                  o &&
                    (s != i &&
                      s >= o.startTime &&
                      i <= o.endTime &&
                      (e.errors.push(
                        `The CSS property "${n}" that exists between the times of "${o.startTime}ms" and "${o.endTime}ms" is also being animated in a parallel animation between the times of "${s}ms" and "${i}ms"`
                      ),
                      (a = !1)),
                    (s = o.startTime)),
                    a && (r[n] = { startTime: s, endTime: i }),
                    e.options &&
                      (function (t, e, n) {
                        const i = e.params || {},
                          s = iu(t);
                        s.length &&
                          s.forEach((t) => {
                            i.hasOwnProperty(t) ||
                              n.push(
                                `Unable to resolve the local animation param ${t} in the given list of values`
                              );
                          });
                      })(t[n], e.options, e.errors);
                });
            });
        }
        visitKeyframes(t, e) {
          const n = { type: 5, styles: [], options: null };
          if (!e.currentAnimateTimings)
            return (
              e.errors.push(
                "keyframes() must be placed inside of a call to animate()"
              ),
              n
            );
          let i = 0;
          const s = [];
          let r = !1,
            o = !1,
            a = 0;
          const l = t.steps.map((t) => {
            const n = this._makeStyleAst(t, e);
            let l =
                null != n.offset
                  ? n.offset
                  : (function (t) {
                      if ("string" == typeof t) return null;
                      let e = null;
                      if (Array.isArray(t))
                        t.forEach((t) => {
                          if (vu(t) && t.hasOwnProperty("offset")) {
                            const n = t;
                            (e = parseFloat(n.offset)), delete n.offset;
                          }
                        });
                      else if (vu(t) && t.hasOwnProperty("offset")) {
                        const n = t;
                        (e = parseFloat(n.offset)), delete n.offset;
                      }
                      return e;
                    })(n.styles),
              c = 0;
            return (
              null != l && (i++, (c = n.offset = l)),
              (o = o || c < 0 || c > 1),
              (r = r || c < a),
              (a = c),
              s.push(c),
              n
            );
          });
          o &&
            e.errors.push(
              "Please ensure that all keyframe offsets are between 0 and 1"
            ),
            r &&
              e.errors.push(
                "Please ensure that all keyframe offsets are in order"
              );
          const c = t.steps.length;
          let h = 0;
          i > 0 && i < c
            ? e.errors.push(
                "Not all style() steps within the declared keyframes() contain offsets"
              )
            : 0 == i && (h = 1 / (c - 1));
          const u = c - 1,
            d = e.currentTime,
            p = e.currentAnimateTimings,
            f = p.duration;
          return (
            l.forEach((t, i) => {
              const r = h > 0 ? (i == u ? 1 : h * i) : s[i],
                o = r * f;
              (e.currentTime = d + p.delay + o),
                (p.duration = o),
                this._validateStyleAst(t, e),
                (t.offset = r),
                n.styles.push(t);
            }),
            n
          );
        }
        visitReference(t, e) {
          return {
            type: 8,
            animation: hu(this, eu(t.animation), e),
            options: wu(t.options),
          };
        }
        visitAnimateChild(t, e) {
          return e.depCount++, { type: 9, options: wu(t.options) };
        }
        visitAnimateRef(t, e) {
          return {
            type: 10,
            animation: this.visitReference(t.animation, e),
            options: wu(t.options),
          };
        }
        visitQuery(t, e) {
          const n = e.currentQuerySelector,
            i = t.options || {};
          e.queryCount++, (e.currentQuery = t);
          const [s, r] = (function (t) {
            const e = !!t.split(/\s*,\s*/).find((t) => ":self" == t);
            return (
              e && (t = t.replace(gu, "")),
              [
                (t = t
                  .replace(/@\*/g, ".ng-trigger")
                  .replace(/@\w+/g, (t) => ".ng-trigger-" + t.substr(1))
                  .replace(/:animating/g, ".ng-animating")),
                e,
              ]
            );
          })(t.selector);
          (e.currentQuerySelector = n.length ? n + " " + s : s),
            Ph(e.collectedStyles, e.currentQuerySelector, {});
          const o = hu(this, eu(t.animation), e);
          return (
            (e.currentQuery = null),
            (e.currentQuerySelector = n),
            {
              type: 11,
              selector: s,
              limit: i.limit || 0,
              optional: !!i.optional,
              includeSelf: r,
              animation: o,
              originalSelector: t.selector,
              options: wu(t.options),
            }
          );
        }
        visitStagger(t, e) {
          e.currentQuery ||
            e.errors.push("stagger() can only be used inside of query()");
          const n =
            "full" === t.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : Zh(t.timings, e.errors, !0);
          return {
            type: 12,
            animation: hu(this, eu(t.animation), e),
            timings: n,
            options: null,
          };
        }
      }
      class bu {
        constructor(t) {
          (this.errors = t),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = {}),
            (this.options = null);
        }
      }
      function vu(t) {
        return !Array.isArray(t) && "object" == typeof t;
      }
      function wu(t) {
        var e;
        return (
          t
            ? (t = Kh(t)).params && (t.params = (e = t.params) ? Kh(e) : null)
            : (t = {}),
          t
        );
      }
      function xu(t, e, n) {
        return { duration: t, delay: e, easing: n };
      }
      function Cu(t, e, n, i, s, r, o = null, a = !1) {
        return {
          type: 1,
          element: t,
          keyframes: e,
          preStyleProps: n,
          postStyleProps: i,
          duration: s,
          delay: r,
          totalTime: s + r,
          easing: o,
          subTimeline: a,
        };
      }
      class Su {
        constructor() {
          this._map = new Map();
        }
        consume(t) {
          let e = this._map.get(t);
          return e ? this._map.delete(t) : (e = []), e;
        }
        append(t, e) {
          let n = this._map.get(t);
          n || this._map.set(t, (n = [])), n.push(...e);
        }
        has(t) {
          return this._map.has(t);
        }
        clear() {
          this._map.clear();
        }
      }
      const ku = new RegExp(":enter", "g"),
        Eu = new RegExp(":leave", "g");
      function Tu(t, e, n, i, s, r = {}, o = {}, a, l, c = []) {
        return new Au().buildKeyframes(t, e, n, i, s, r, o, a, l, c);
      }
      class Au {
        buildKeyframes(t, e, n, i, s, r, o, a, l, c = []) {
          l = l || new Su();
          const h = new Iu(t, e, l, i, s, c, []);
          (h.options = a),
            h.currentTimeline.setStyles([r], null, h.errors, a),
            hu(this, n, h);
          const u = h.timelines.filter((t) => t.containsAnimation());
          if (u.length && Object.keys(o).length) {
            const t = u[u.length - 1];
            t.allowOnlyTimelineStyles() || t.setStyles([o], null, h.errors, a);
          }
          return u.length
            ? u.map((t) => t.buildKeyframes())
            : [Cu(e, [], [], [], 0, 0, "", !1)];
        }
        visitTrigger(t, e) {}
        visitState(t, e) {}
        visitTransition(t, e) {}
        visitAnimateChild(t, e) {
          const n = e.subInstructions.consume(e.element);
          if (n) {
            const i = e.createSubContext(t.options),
              s = e.currentTimeline.currentTime,
              r = this._visitSubInstructions(n, i, i.options);
            s != r && e.transformIntoNewTimeline(r);
          }
          e.previousNode = t;
        }
        visitAnimateRef(t, e) {
          const n = e.createSubContext(t.options);
          n.transformIntoNewTimeline(),
            this.visitReference(t.animation, n),
            e.transformIntoNewTimeline(n.currentTimeline.currentTime),
            (e.previousNode = t);
        }
        _visitSubInstructions(t, e, n) {
          let i = e.currentTimeline.currentTime;
          const s = null != n.duration ? Wh(n.duration) : null,
            r = null != n.delay ? Wh(n.delay) : null;
          return (
            0 !== s &&
              t.forEach((t) => {
                const n = e.appendInstructionToTimeline(t, s, r);
                i = Math.max(i, n.duration + n.delay);
              }),
            i
          );
        }
        visitReference(t, e) {
          e.updateOptions(t.options, !0),
            hu(this, t.animation, e),
            (e.previousNode = t);
        }
        visitSequence(t, e) {
          const n = e.subContextCount;
          let i = e;
          const s = t.options;
          if (
            s &&
            (s.params || s.delay) &&
            ((i = e.createSubContext(s)),
            i.transformIntoNewTimeline(),
            null != s.delay)
          ) {
            6 == i.previousNode.type &&
              (i.currentTimeline.snapshotCurrentStyles(),
              (i.previousNode = Ou));
            const t = Wh(s.delay);
            i.delayNextStep(t);
          }
          t.steps.length &&
            (t.steps.forEach((t) => hu(this, t, i)),
            i.currentTimeline.applyStylesToKeyframe(),
            i.subContextCount > n && i.transformIntoNewTimeline()),
            (e.previousNode = t);
        }
        visitGroup(t, e) {
          const n = [];
          let i = e.currentTimeline.currentTime;
          const s = t.options && t.options.delay ? Wh(t.options.delay) : 0;
          t.steps.forEach((r) => {
            const o = e.createSubContext(t.options);
            s && o.delayNextStep(s),
              hu(this, r, o),
              (i = Math.max(i, o.currentTimeline.currentTime)),
              n.push(o.currentTimeline);
          }),
            n.forEach((t) => e.currentTimeline.mergeTimelineCollectedStyles(t)),
            e.transformIntoNewTimeline(i),
            (e.previousNode = t);
        }
        _visitTiming(t, e) {
          if (t.dynamic) {
            const n = t.strValue;
            return Zh(e.params ? su(n, e.params, e.errors) : n, e.errors);
          }
          return { duration: t.duration, delay: t.delay, easing: t.easing };
        }
        visitAnimate(t, e) {
          const n = (e.currentAnimateTimings = this._visitTiming(t.timings, e)),
            i = e.currentTimeline;
          n.delay && (e.incrementTime(n.delay), i.snapshotCurrentStyles());
          const s = t.style;
          5 == s.type
            ? this.visitKeyframes(s, e)
            : (e.incrementTime(n.duration),
              this.visitStyle(s, e),
              i.applyStylesToKeyframe()),
            (e.currentAnimateTimings = null),
            (e.previousNode = t);
        }
        visitStyle(t, e) {
          const n = e.currentTimeline,
            i = e.currentAnimateTimings;
          !i && n.getCurrentStyleProperties().length && n.forwardFrame();
          const s = (i && i.easing) || t.easing;
          t.isEmptyStep
            ? n.applyEmptyStep(s)
            : n.setStyles(t.styles, s, e.errors, e.options),
            (e.previousNode = t);
        }
        visitKeyframes(t, e) {
          const n = e.currentAnimateTimings,
            i = e.currentTimeline.duration,
            s = n.duration,
            r = e.createSubContext().currentTimeline;
          (r.easing = n.easing),
            t.styles.forEach((t) => {
              r.forwardTime((t.offset || 0) * s),
                r.setStyles(t.styles, t.easing, e.errors, e.options),
                r.applyStylesToKeyframe();
            }),
            e.currentTimeline.mergeTimelineCollectedStyles(r),
            e.transformIntoNewTimeline(i + s),
            (e.previousNode = t);
        }
        visitQuery(t, e) {
          const n = e.currentTimeline.currentTime,
            i = t.options || {},
            s = i.delay ? Wh(i.delay) : 0;
          s &&
            (6 === e.previousNode.type ||
              (0 == n &&
                e.currentTimeline.getCurrentStyleProperties().length)) &&
            (e.currentTimeline.snapshotCurrentStyles(), (e.previousNode = Ou));
          let r = n;
          const o = e.invokeQuery(
            t.selector,
            t.originalSelector,
            t.limit,
            t.includeSelf,
            !!i.optional,
            e.errors
          );
          e.currentQueryTotal = o.length;
          let a = null;
          o.forEach((n, i) => {
            e.currentQueryIndex = i;
            const o = e.createSubContext(t.options, n);
            s && o.delayNextStep(s),
              n === e.element && (a = o.currentTimeline),
              hu(this, t.animation, o),
              o.currentTimeline.applyStylesToKeyframe(),
              (r = Math.max(r, o.currentTimeline.currentTime));
          }),
            (e.currentQueryIndex = 0),
            (e.currentQueryTotal = 0),
            e.transformIntoNewTimeline(r),
            a &&
              (e.currentTimeline.mergeTimelineCollectedStyles(a),
              e.currentTimeline.snapshotCurrentStyles()),
            (e.previousNode = t);
        }
        visitStagger(t, e) {
          const n = e.parentContext,
            i = e.currentTimeline,
            s = t.timings,
            r = Math.abs(s.duration),
            o = r * (e.currentQueryTotal - 1);
          let a = r * e.currentQueryIndex;
          switch (s.duration < 0 ? "reverse" : s.easing) {
            case "reverse":
              a = o - a;
              break;
            case "full":
              a = n.currentStaggerTime;
          }
          const l = e.currentTimeline;
          a && l.delayNextStep(a);
          const c = l.currentTime;
          hu(this, t.animation, e),
            (e.previousNode = t),
            (n.currentStaggerTime =
              i.currentTime - c + (i.startTime - n.currentTimeline.startTime));
        }
      }
      const Ou = {};
      class Iu {
        constructor(t, e, n, i, s, r, o, a) {
          (this._driver = t),
            (this.element = e),
            (this.subInstructions = n),
            (this._enterClassName = i),
            (this._leaveClassName = s),
            (this.errors = r),
            (this.timelines = o),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = Ou),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = a || new Pu(this._driver, e, 0)),
            o.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(t, e) {
          if (!t) return;
          const n = t;
          let i = this.options;
          null != n.duration && (i.duration = Wh(n.duration)),
            null != n.delay && (i.delay = Wh(n.delay));
          const s = n.params;
          if (s) {
            let t = i.params;
            t || (t = this.options.params = {}),
              Object.keys(s).forEach((n) => {
                (e && t.hasOwnProperty(n)) || (t[n] = su(s[n], t, this.errors));
              });
          }
        }
        _copyOptions() {
          const t = {};
          if (this.options) {
            const e = this.options.params;
            if (e) {
              const n = (t.params = {});
              Object.keys(e).forEach((t) => {
                n[t] = e[t];
              });
            }
          }
          return t;
        }
        createSubContext(t = null, e, n) {
          const i = e || this.element,
            s = new Iu(
              this._driver,
              i,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(i, n || 0)
            );
          return (
            (s.previousNode = this.previousNode),
            (s.currentAnimateTimings = this.currentAnimateTimings),
            (s.options = this._copyOptions()),
            s.updateOptions(t),
            (s.currentQueryIndex = this.currentQueryIndex),
            (s.currentQueryTotal = this.currentQueryTotal),
            (s.parentContext = this),
            this.subContextCount++,
            s
          );
        }
        transformIntoNewTimeline(t) {
          return (
            (this.previousNode = Ou),
            (this.currentTimeline = this.currentTimeline.fork(this.element, t)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(t, e, n) {
          const i = {
              duration: null != e ? e : t.duration,
              delay:
                this.currentTimeline.currentTime +
                (null != n ? n : 0) +
                t.delay,
              easing: "",
            },
            s = new Ru(
              this._driver,
              t.element,
              t.keyframes,
              t.preStyleProps,
              t.postStyleProps,
              i,
              t.stretchStartingKeyframe
            );
          return this.timelines.push(s), i;
        }
        incrementTime(t) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + t);
        }
        delayNextStep(t) {
          t > 0 && this.currentTimeline.delayNextStep(t);
        }
        invokeQuery(t, e, n, i, s, r) {
          let o = [];
          if ((i && o.push(this.element), t.length > 0)) {
            t = (t = t.replace(ku, "." + this._enterClassName)).replace(
              Eu,
              "." + this._leaveClassName
            );
            let e = this._driver.query(this.element, t, 1 != n);
            0 !== n &&
              (e = n < 0 ? e.slice(e.length + n, e.length) : e.slice(0, n)),
              o.push(...e);
          }
          return (
            s ||
              0 != o.length ||
              r.push(
                `\`query("${e}")\` returned zero elements. (Use \`query("${e}", { optional: true })\` if you wish to allow this.)`
              ),
            o
          );
        }
      }
      class Pu {
        constructor(t, e, n, i) {
          (this._driver = t),
            (this.element = e),
            (this.startTime = n),
            (this._elementTimelineStylesLookup = i),
            (this.duration = 0),
            (this._previousKeyframe = {}),
            (this._currentKeyframe = {}),
            (this._keyframes = new Map()),
            (this._styleSummary = {}),
            (this._pendingStyles = {}),
            (this._backFill = {}),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._localTimelineStyles = Object.create(this._backFill, {})),
            (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(
              e
            )),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                e,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0;
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe);
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(t) {
          const e =
            1 == this._keyframes.size &&
            Object.keys(this._pendingStyles).length;
          this.duration || e
            ? (this.forwardTime(this.currentTime + t),
              e && this.snapshotCurrentStyles())
            : (this.startTime += t);
        }
        fork(t, e) {
          return (
            this.applyStylesToKeyframe(),
            new Pu(
              this._driver,
              t,
              e || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = Object.create(this._backFill, {})),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(t) {
          this.applyStylesToKeyframe(),
            (this.duration = t),
            this._loadKeyframe();
        }
        _updateStyle(t, e) {
          (this._localTimelineStyles[t] = e),
            (this._globalTimelineStyles[t] = e),
            (this._styleSummary[t] = { time: this.currentTime, value: e });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(t) {
          t && (this._previousKeyframe.easing = t),
            Object.keys(this._globalTimelineStyles).forEach((t) => {
              (this._backFill[t] = this._globalTimelineStyles[t] || "*"),
                (this._currentKeyframe[t] = "*");
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe);
        }
        setStyles(t, e, n, i) {
          e && (this._previousKeyframe.easing = e);
          const s = (i && i.params) || {},
            r = (function (t, e) {
              const n = {};
              let i;
              return (
                t.forEach((t) => {
                  "*" === t
                    ? ((i = i || Object.keys(e)),
                      i.forEach((t) => {
                        n[t] = "*";
                      }))
                    : Qh(t, !1, n);
                }),
                n
              );
            })(t, this._globalTimelineStyles);
          Object.keys(r).forEach((t) => {
            const e = su(r[t], s, n);
            (this._pendingStyles[t] = e),
              this._localTimelineStyles.hasOwnProperty(t) ||
                (this._backFill[t] = this._globalTimelineStyles.hasOwnProperty(
                  t
                )
                  ? this._globalTimelineStyles[t]
                  : "*"),
              this._updateStyle(t, e);
          });
        }
        applyStylesToKeyframe() {
          const t = this._pendingStyles,
            e = Object.keys(t);
          0 != e.length &&
            ((this._pendingStyles = {}),
            e.forEach((e) => {
              this._currentKeyframe[e] = t[e];
            }),
            Object.keys(this._localTimelineStyles).forEach((t) => {
              this._currentKeyframe.hasOwnProperty(t) ||
                (this._currentKeyframe[t] = this._localTimelineStyles[t]);
            }));
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach((t) => {
            const e = this._localTimelineStyles[t];
            (this._pendingStyles[t] = e), this._updateStyle(t, e);
          });
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const t = [];
          for (let e in this._currentKeyframe) t.push(e);
          return t;
        }
        mergeTimelineCollectedStyles(t) {
          Object.keys(t._styleSummary).forEach((e) => {
            const n = this._styleSummary[e],
              i = t._styleSummary[e];
            (!n || i.time > n.time) && this._updateStyle(e, i.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const t = new Set(),
            e = new Set(),
            n = 1 === this._keyframes.size && 0 === this.duration;
          let i = [];
          this._keyframes.forEach((s, r) => {
            const o = Qh(s, !0);
            Object.keys(o).forEach((n) => {
              const i = o[n];
              "!" == i ? t.add(n) : "*" == i && e.add(n);
            }),
              n || (o.offset = r / this.duration),
              i.push(o);
          });
          const s = t.size ? ru(t.values()) : [],
            r = e.size ? ru(e.values()) : [];
          if (n) {
            const t = i[0],
              e = Kh(t);
            (t.offset = 0), (e.offset = 1), (i = [t, e]);
          }
          return Cu(
            this.element,
            i,
            s,
            r,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class Ru extends Pu {
        constructor(t, e, n, i, s, r, o = !1) {
          super(t, e, r.delay),
            (this.element = e),
            (this.keyframes = n),
            (this.preStyleProps = i),
            (this.postStyleProps = s),
            (this._stretchStartingKeyframe = o),
            (this.timings = {
              duration: r.duration,
              delay: r.delay,
              easing: r.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let t = this.keyframes,
            { delay: e, duration: n, easing: i } = this.timings;
          if (this._stretchStartingKeyframe && e) {
            const s = [],
              r = n + e,
              o = e / r,
              a = Qh(t[0], !1);
            (a.offset = 0), s.push(a);
            const l = Qh(t[0], !1);
            (l.offset = Du(o)), s.push(l);
            const c = t.length - 1;
            for (let i = 1; i <= c; i++) {
              let o = Qh(t[i], !1);
              (o.offset = Du((e + o.offset * n) / r)), s.push(o);
            }
            (n = r), (e = 0), (i = ""), (t = s);
          }
          return Cu(
            this.element,
            t,
            this.preStyleProps,
            this.postStyleProps,
            n,
            e,
            i,
            !0
          );
        }
      }
      function Du(t, e = 3) {
        const n = Math.pow(10, e - 1);
        return Math.round(t * n) / n;
      }
      class Nu {}
      class Fu extends Nu {
        normalizePropertyName(t, e) {
          return au(t);
        }
        normalizeStyleValue(t, e, n, i) {
          let s = "";
          const r = n.toString().trim();
          if (Lu[e] && 0 !== n && "0" !== n)
            if ("number" == typeof n) s = "px";
            else {
              const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
              e &&
                0 == e[1].length &&
                i.push(`Please provide a CSS unit value for ${t}:${n}`);
            }
          return r + s;
        }
      }
      const Lu = (() =>
        (function (t) {
          const e = {};
          return t.forEach((t) => (e[t] = !0)), e;
        })(
          "width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(
            ","
          )
        ))();
      function Mu(t, e, n, i, s, r, o, a, l, c, h, u, d) {
        return {
          type: 0,
          element: t,
          triggerName: e,
          isRemovalTransition: s,
          fromState: n,
          fromStyles: r,
          toState: i,
          toStyles: o,
          timelines: a,
          queriedElements: l,
          preStyleProps: c,
          postStyleProps: h,
          totalTime: u,
          errors: d,
        };
      }
      const ju = {};
      class Vu {
        constructor(t, e, n) {
          (this._triggerName = t), (this.ast = e), (this._stateStyles = n);
        }
        match(t, e, n, i) {
          return (function (t, e, n, i, s) {
            return t.some((t) => t(e, n, i, s));
          })(this.ast.matchers, t, e, n, i);
        }
        buildStyles(t, e, n) {
          const i = this._stateStyles["*"],
            s = this._stateStyles[t],
            r = i ? i.buildStyles(e, n) : {};
          return s ? s.buildStyles(e, n) : r;
        }
        build(t, e, n, i, s, r, o, a, l, c) {
          const h = [],
            u = (this.ast.options && this.ast.options.params) || ju,
            d = this.buildStyles(n, (o && o.params) || ju, h),
            p = (a && a.params) || ju,
            f = this.buildStyles(i, p, h),
            m = new Set(),
            g = new Map(),
            _ = new Map(),
            y = "void" === i,
            b = { params: Object.assign(Object.assign({}, u), p) },
            v = c ? [] : Tu(t, e, this.ast.animation, s, r, d, f, b, l, h);
          let w = 0;
          if (
            (v.forEach((t) => {
              w = Math.max(t.duration + t.delay, w);
            }),
            h.length)
          )
            return Mu(e, this._triggerName, n, i, y, d, f, [], [], g, _, w, h);
          v.forEach((t) => {
            const n = t.element,
              i = Ph(g, n, {});
            t.preStyleProps.forEach((t) => (i[t] = !0));
            const s = Ph(_, n, {});
            t.postStyleProps.forEach((t) => (s[t] = !0)), n !== e && m.add(n);
          });
          const x = ru(m.values());
          return Mu(e, this._triggerName, n, i, y, d, f, v, x, g, _, w);
        }
      }
      class $u {
        constructor(t, e) {
          (this.styles = t), (this.defaultParams = e);
        }
        buildStyles(t, e) {
          const n = {},
            i = Kh(this.defaultParams);
          return (
            Object.keys(t).forEach((e) => {
              const n = t[e];
              null != n && (i[e] = n);
            }),
            this.styles.styles.forEach((t) => {
              if ("string" != typeof t) {
                const s = t;
                Object.keys(s).forEach((t) => {
                  let r = s[t];
                  r.length > 1 && (r = su(r, i, e)), (n[t] = r);
                });
              }
            }),
            n
          );
        }
      }
      class Hu {
        constructor(t, e) {
          (this.name = t),
            (this.ast = e),
            (this.transitionFactories = []),
            (this.states = {}),
            e.states.forEach((t) => {
              this.states[t.name] = new $u(
                t.style,
                (t.options && t.options.params) || {}
              );
            }),
            Bu(this.states, "true", "1"),
            Bu(this.states, "false", "0"),
            e.transitions.forEach((e) => {
              this.transitionFactories.push(new Vu(t, e, this.states));
            }),
            (this.fallbackTransition = new Vu(
              t,
              {
                type: 1,
                animation: { type: 2, steps: [], options: null },
                matchers: [(t, e) => !0],
                options: null,
                queryCount: 0,
                depCount: 0,
              },
              this.states
            ));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(t, e, n, i) {
          return (
            this.transitionFactories.find((s) => s.match(t, e, n, i)) || null
          );
        }
        matchStyles(t, e, n) {
          return this.fallbackTransition.buildStyles(t, e, n);
        }
      }
      function Bu(t, e, n) {
        t.hasOwnProperty(e)
          ? t.hasOwnProperty(n) || (t[n] = t[e])
          : t.hasOwnProperty(n) && (t[e] = t[n]);
      }
      const Uu = new Su();
      class zu {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = n),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = []);
        }
        register(t, e) {
          const n = [],
            i = _u(this._driver, e, n);
          if (n.length)
            throw new Error(
              "Unable to build the animation due to the following errors: " +
                n.join("\n")
            );
          this._animations[t] = i;
        }
        _buildPlayer(t, e, n) {
          const i = t.element,
            s = Th(0, this._normalizer, 0, t.keyframes, e, n);
          return this._driver.animate(
            i,
            s,
            t.duration,
            t.delay,
            t.easing,
            [],
            !0
          );
        }
        create(t, e, n = {}) {
          const i = [],
            s = this._animations[t];
          let r;
          const o = new Map();
          if (
            (s
              ? ((r = Tu(
                  this._driver,
                  e,
                  s,
                  "ng-enter",
                  "ng-leave",
                  {},
                  {},
                  n,
                  Uu,
                  i
                )),
                r.forEach((t) => {
                  const e = Ph(o, t.element, {});
                  t.postStyleProps.forEach((t) => (e[t] = null));
                }))
              : (i.push(
                  "The requested animation doesn't exist or has already been destroyed"
                ),
                (r = [])),
            i.length)
          )
            throw new Error(
              "Unable to create the animation due to the following errors: " +
                i.join("\n")
            );
          o.forEach((t, e) => {
            Object.keys(t).forEach((n) => {
              t[n] = this._driver.computeStyle(e, n, "*");
            });
          });
          const a = Eh(
            r.map((t) => {
              const e = o.get(t.element);
              return this._buildPlayer(t, {}, e);
            })
          );
          return (
            (this._playersById[t] = a),
            a.onDestroy(() => this.destroy(t)),
            this.players.push(a),
            a
          );
        }
        destroy(t) {
          const e = this._getPlayer(t);
          e.destroy(), delete this._playersById[t];
          const n = this.players.indexOf(e);
          n >= 0 && this.players.splice(n, 1);
        }
        _getPlayer(t) {
          const e = this._playersById[t];
          if (!e)
            throw new Error(
              "Unable to find the timeline player referenced by " + t
            );
          return e;
        }
        listen(t, e, n, i) {
          const s = Ih(e, "", "", "");
          return Ah(this._getPlayer(t), n, s, i), () => {};
        }
        command(t, e, n, i) {
          if ("register" == n) return void this.register(t, i[0]);
          if ("create" == n) return void this.create(t, e, i[0] || {});
          const s = this._getPlayer(t);
          switch (n) {
            case "play":
              s.play();
              break;
            case "pause":
              s.pause();
              break;
            case "reset":
              s.reset();
              break;
            case "restart":
              s.restart();
              break;
            case "finish":
              s.finish();
              break;
            case "init":
              s.init();
              break;
            case "setPosition":
              s.setPosition(parseFloat(i[0]));
              break;
            case "destroy":
              this.destroy(t);
          }
        }
      }
      const qu = [],
        Wu = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        Gu = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        };
      class Zu {
        constructor(t, e = "") {
          this.namespaceId = e;
          const n = t && t.hasOwnProperty("value");
          if (((this.value = null != (i = n ? t.value : t) ? i : null), n)) {
            const e = Kh(t);
            delete e.value, (this.options = e);
          } else this.options = {};
          var i;
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(t) {
          const e = t.params;
          if (e) {
            const t = this.options.params;
            Object.keys(e).forEach((n) => {
              null == t[n] && (t[n] = e[n]);
            });
          }
        }
      }
      const Ku = new Zu("void");
      class Qu {
        constructor(t, e, n) {
          (this.id = t),
            (this.hostElement = e),
            (this._engine = n),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + t),
            id(e, this._hostClassName);
        }
        listen(t, e, n, i) {
          if (!this._triggers.hasOwnProperty(e))
            throw new Error(
              `Unable to listen on the animation trigger event "${n}" because the animation trigger "${e}" doesn't exist!`
            );
          if (null == n || 0 == n.length)
            throw new Error(
              `Unable to listen on the animation trigger "${e}" because the provided event is undefined!`
            );
          if ("start" != (s = n) && "done" != s)
            throw new Error(
              `The provided animation trigger event "${n}" for the animation trigger "${e}" is not supported!`
            );
          var s;
          const r = Ph(this._elementListeners, t, []),
            o = { name: e, phase: n, callback: i };
          r.push(o);
          const a = Ph(this._engine.statesByElement, t, {});
          return (
            a.hasOwnProperty(e) ||
              (id(t, "ng-trigger"), id(t, "ng-trigger-" + e), (a[e] = Ku)),
            () => {
              this._engine.afterFlush(() => {
                const t = r.indexOf(o);
                t >= 0 && r.splice(t, 1), this._triggers[e] || delete a[e];
              });
            }
          );
        }
        register(t, e) {
          return !this._triggers[t] && ((this._triggers[t] = e), !0);
        }
        _getTrigger(t) {
          const e = this._triggers[t];
          if (!e)
            throw new Error(
              `The provided animation trigger "${t}" has not been registered!`
            );
          return e;
        }
        trigger(t, e, n, i = !0) {
          const s = this._getTrigger(e),
            r = new Yu(this.id, e, t);
          let o = this._engine.statesByElement.get(t);
          o ||
            (id(t, "ng-trigger"),
            id(t, "ng-trigger-" + e),
            this._engine.statesByElement.set(t, (o = {})));
          let a = o[e];
          const l = new Zu(n, this.id);
          if (
            (!(n && n.hasOwnProperty("value")) &&
              a &&
              l.absorbOptions(a.options),
            (o[e] = l),
            a || (a = Ku),
            "void" !== l.value && a.value === l.value)
          ) {
            if (
              !(function (t, e) {
                const n = Object.keys(t),
                  i = Object.keys(e);
                if (n.length != i.length) return !1;
                for (let s = 0; s < n.length; s++) {
                  const i = n[s];
                  if (!e.hasOwnProperty(i) || t[i] !== e[i]) return !1;
                }
                return !0;
              })(a.params, l.params)
            ) {
              const e = [],
                n = s.matchStyles(a.value, a.params, e),
                i = s.matchStyles(l.value, l.params, e);
              e.length
                ? this._engine.reportError(e)
                : this._engine.afterFlush(() => {
                    tu(t, n), Jh(t, i);
                  });
            }
            return;
          }
          const c = Ph(this._engine.playersByElement, t, []);
          c.forEach((t) => {
            t.namespaceId == this.id &&
              t.triggerName == e &&
              t.queued &&
              t.destroy();
          });
          let h = s.matchTransition(a.value, l.value, t, l.params),
            u = !1;
          if (!h) {
            if (!i) return;
            (h = s.fallbackTransition), (u = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: t,
              triggerName: e,
              transition: h,
              fromState: a,
              toState: l,
              player: r,
              isFallbackTransition: u,
            }),
            u ||
              (id(t, "ng-animate-queued"),
              r.onStart(() => {
                sd(t, "ng-animate-queued");
              })),
            r.onDone(() => {
              let e = this.players.indexOf(r);
              e >= 0 && this.players.splice(e, 1);
              const n = this._engine.playersByElement.get(t);
              if (n) {
                let t = n.indexOf(r);
                t >= 0 && n.splice(t, 1);
              }
            }),
            this.players.push(r),
            c.push(r),
            r
          );
        }
        deregister(t) {
          delete this._triggers[t],
            this._engine.statesByElement.forEach((e, n) => {
              delete e[t];
            }),
            this._elementListeners.forEach((e, n) => {
              this._elementListeners.set(
                n,
                e.filter((e) => e.name != t)
              );
            });
        }
        clearElementCache(t) {
          this._engine.statesByElement.delete(t),
            this._elementListeners.delete(t);
          const e = this._engine.playersByElement.get(t);
          e &&
            (e.forEach((t) => t.destroy()),
            this._engine.playersByElement.delete(t));
        }
        _signalRemovalForInnerTriggers(t, e) {
          const n = this._engine.driver.query(t, ".ng-trigger", !0);
          n.forEach((t) => {
            if (t.__ng_removed) return;
            const n = this._engine.fetchNamespacesByElement(t);
            n.size
              ? n.forEach((n) => n.triggerLeaveAnimation(t, e, !1, !0))
              : this.clearElementCache(t);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              n.forEach((t) => this.clearElementCache(t))
            );
        }
        triggerLeaveAnimation(t, e, n, i) {
          const s = this._engine.statesByElement.get(t);
          if (s) {
            const r = [];
            if (
              (Object.keys(s).forEach((e) => {
                if (this._triggers[e]) {
                  const n = this.trigger(t, e, "void", i);
                  n && r.push(n);
                }
              }),
              r.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, t, !0, e),
                n && Eh(r).onDone(() => this._engine.processLeaveNode(t)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(t) {
          const e = this._elementListeners.get(t);
          if (e) {
            const n = new Set();
            e.forEach((e) => {
              const i = e.name;
              if (n.has(i)) return;
              n.add(i);
              const s = this._triggers[i].fallbackTransition,
                r = this._engine.statesByElement.get(t)[i] || Ku,
                o = new Zu("void"),
                a = new Yu(this.id, i, t);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: t,
                  triggerName: i,
                  transition: s,
                  fromState: r,
                  toState: o,
                  player: a,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(t, e) {
          const n = this._engine;
          if (
            (t.childElementCount && this._signalRemovalForInnerTriggers(t, e),
            this.triggerLeaveAnimation(t, e, !0))
          )
            return;
          let i = !1;
          if (n.totalAnimations) {
            const e = n.players.length ? n.playersByQueriedElement.get(t) : [];
            if (e && e.length) i = !0;
            else {
              let e = t;
              for (; (e = e.parentNode); )
                if (n.statesByElement.get(e)) {
                  i = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(t), i))
            n.markElementAsRemoved(this.id, t, !1, e);
          else {
            const i = t.__ng_removed;
            (i && i !== Wu) ||
              (n.afterFlush(() => this.clearElementCache(t)),
              n.destroyInnerAnimations(t),
              n._onRemovalComplete(t, e));
          }
        }
        insertNode(t, e) {
          id(t, this._hostClassName);
        }
        drainQueuedTransitions(t) {
          const e = [];
          return (
            this._queue.forEach((n) => {
              const i = n.player;
              if (i.destroyed) return;
              const s = n.element,
                r = this._elementListeners.get(s);
              r &&
                r.forEach((e) => {
                  if (e.name == n.triggerName) {
                    const i = Ih(
                      s,
                      n.triggerName,
                      n.fromState.value,
                      n.toState.value
                    );
                    (i._data = t), Ah(n.player, e.phase, i, e.callback);
                  }
                }),
                i.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      i.destroy();
                    })
                  : e.push(n);
            }),
            (this._queue = []),
            e.sort((t, e) => {
              const n = t.transition.ast.depCount,
                i = e.transition.ast.depCount;
              return 0 == n || 0 == i
                ? n - i
                : this._engine.driver.containsElement(t.element, e.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(t) {
          this.players.forEach((t) => t.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, t);
        }
        elementContainsData(t) {
          let e = !1;
          return (
            this._elementListeners.has(t) && (e = !0),
            (e = !!this._queue.find((e) => e.element === t) || e),
            e
          );
        }
      }
      class Xu {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this.driver = e),
            (this._normalizer = n),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (t, e) => {});
        }
        _onRemovalComplete(t, e) {
          this.onRemovalComplete(t, e);
        }
        get queuedPlayers() {
          const t = [];
          return (
            this._namespaceList.forEach((e) => {
              e.players.forEach((e) => {
                e.queued && t.push(e);
              });
            }),
            t
          );
        }
        createNamespace(t, e) {
          const n = new Qu(t, e, this);
          return (
            e.parentNode
              ? this._balanceNamespaceList(n, e)
              : (this.newHostElements.set(e, n), this.collectEnterElement(e)),
            (this._namespaceLookup[t] = n)
          );
        }
        _balanceNamespaceList(t, e) {
          const n = this._namespaceList.length - 1;
          if (n >= 0) {
            let i = !1;
            for (let s = n; s >= 0; s--)
              if (
                this.driver.containsElement(
                  this._namespaceList[s].hostElement,
                  e
                )
              ) {
                this._namespaceList.splice(s + 1, 0, t), (i = !0);
                break;
              }
            i || this._namespaceList.splice(0, 0, t);
          } else this._namespaceList.push(t);
          return this.namespacesByHostElement.set(e, t), t;
        }
        register(t, e) {
          let n = this._namespaceLookup[t];
          return n || (n = this.createNamespace(t, e)), n;
        }
        registerTrigger(t, e, n) {
          let i = this._namespaceLookup[t];
          i && i.register(e, n) && this.totalAnimations++;
        }
        destroy(t, e) {
          if (!t) return;
          const n = this._fetchNamespace(t);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(n.hostElement),
              delete this._namespaceLookup[t];
            const e = this._namespaceList.indexOf(n);
            e >= 0 && this._namespaceList.splice(e, 1);
          }),
            this.afterFlushAnimationsDone(() => n.destroy(e));
        }
        _fetchNamespace(t) {
          return this._namespaceLookup[t];
        }
        fetchNamespacesByElement(t) {
          const e = new Set(),
            n = this.statesByElement.get(t);
          if (n) {
            const t = Object.keys(n);
            for (let i = 0; i < t.length; i++) {
              const s = n[t[i]].namespaceId;
              if (s) {
                const t = this._fetchNamespace(s);
                t && e.add(t);
              }
            }
          }
          return e;
        }
        trigger(t, e, n, i) {
          if (Ju(e)) {
            const s = this._fetchNamespace(t);
            if (s) return s.trigger(e, n, i), !0;
          }
          return !1;
        }
        insertNode(t, e, n, i) {
          if (!Ju(e)) return;
          const s = e.__ng_removed;
          if (s && s.setForRemoval) {
            (s.setForRemoval = !1), (s.setForMove = !0);
            const t = this.collectedLeaveElements.indexOf(e);
            t >= 0 && this.collectedLeaveElements.splice(t, 1);
          }
          if (t) {
            const i = this._fetchNamespace(t);
            i && i.insertNode(e, n);
          }
          i && this.collectEnterElement(e);
        }
        collectEnterElement(t) {
          this.collectedEnterElements.push(t);
        }
        markElementAsDisabled(t, e) {
          e
            ? this.disabledNodes.has(t) ||
              (this.disabledNodes.add(t), id(t, "ng-animate-disabled"))
            : this.disabledNodes.has(t) &&
              (this.disabledNodes.delete(t), sd(t, "ng-animate-disabled"));
        }
        removeNode(t, e, n, i) {
          if (Ju(e)) {
            const s = t ? this._fetchNamespace(t) : null;
            if (
              (s ? s.removeNode(e, i) : this.markElementAsRemoved(t, e, !1, i),
              n)
            ) {
              const n = this.namespacesByHostElement.get(e);
              n && n.id !== t && n.removeNode(e, i);
            }
          } else this._onRemovalComplete(e, i);
        }
        markElementAsRemoved(t, e, n, i) {
          this.collectedLeaveElements.push(e),
            (e.__ng_removed = {
              namespaceId: t,
              setForRemoval: i,
              hasAnimation: n,
              removedBeforeQueried: !1,
            });
        }
        listen(t, e, n, i, s) {
          return Ju(e) ? this._fetchNamespace(t).listen(e, n, i, s) : () => {};
        }
        _buildInstruction(t, e, n, i, s) {
          return t.transition.build(
            this.driver,
            t.element,
            t.fromState.value,
            t.toState.value,
            n,
            i,
            t.fromState.options,
            t.toState.options,
            e,
            s
          );
        }
        destroyInnerAnimations(t) {
          let e = this.driver.query(t, ".ng-trigger", !0);
          e.forEach((t) => this.destroyActiveAnimationsForElement(t)),
            0 != this.playersByQueriedElement.size &&
              ((e = this.driver.query(t, ".ng-animating", !0)),
              e.forEach((t) => this.finishActiveQueriedAnimationOnElement(t)));
        }
        destroyActiveAnimationsForElement(t) {
          const e = this.playersByElement.get(t);
          e &&
            e.forEach((t) => {
              t.queued ? (t.markedForDestroy = !0) : t.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(t) {
          const e = this.playersByQueriedElement.get(t);
          e && e.forEach((t) => t.finish());
        }
        whenRenderingDone() {
          return new Promise((t) => {
            if (this.players.length) return Eh(this.players).onDone(() => t());
            t();
          });
        }
        processLeaveNode(t) {
          const e = t.__ng_removed;
          if (e && e.setForRemoval) {
            if (((t.__ng_removed = Wu), e.namespaceId)) {
              this.destroyInnerAnimations(t);
              const n = this._fetchNamespace(e.namespaceId);
              n && n.clearElementCache(t);
            }
            this._onRemovalComplete(t, e.setForRemoval);
          }
          this.driver.matchesElement(t, ".ng-animate-disabled") &&
            this.markElementAsDisabled(t, !1),
            this.driver.query(t, ".ng-animate-disabled", !0).forEach((t) => {
              this.markElementAsDisabled(t, !1);
            });
        }
        flush(t = -1) {
          let e = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((t, e) =>
                this._balanceNamespaceList(t, e)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let n = 0; n < this.collectedEnterElements.length; n++)
              id(this.collectedEnterElements[n], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const n = [];
            try {
              e = this._flushAnimations(n, t);
            } finally {
              for (let t = 0; t < n.length; t++) n[t]();
            }
          } else
            for (let n = 0; n < this.collectedLeaveElements.length; n++)
              this.processLeaveNode(this.collectedLeaveElements[n]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((t) => t()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const t = this._whenQuietFns;
            (this._whenQuietFns = []),
              e.length
                ? Eh(e).onDone(() => {
                    t.forEach((t) => t());
                  })
                : t.forEach((t) => t());
          }
        }
        reportError(t) {
          throw new Error(
            "Unable to process animations due to the following failed trigger transitions\n " +
              t.join("\n")
          );
        }
        _flushAnimations(t, e) {
          const n = new Su(),
            i = [],
            s = new Map(),
            r = [],
            o = new Map(),
            a = new Map(),
            l = new Map(),
            c = new Set();
          this.disabledNodes.forEach((t) => {
            c.add(t);
            const e = this.driver.query(t, ".ng-animate-queued", !0);
            for (let n = 0; n < e.length; n++) c.add(e[n]);
          });
          const h = this.bodyNode,
            u = Array.from(this.statesByElement.keys()),
            d = nd(u, this.collectedEnterElements),
            p = new Map();
          let f = 0;
          d.forEach((t, e) => {
            const n = "ng-enter" + f++;
            p.set(e, n), t.forEach((t) => id(t, n));
          });
          const m = [],
            g = new Set(),
            _ = new Set();
          for (let I = 0; I < this.collectedLeaveElements.length; I++) {
            const t = this.collectedLeaveElements[I],
              e = t.__ng_removed;
            e &&
              e.setForRemoval &&
              (m.push(t),
              g.add(t),
              e.hasAnimation
                ? this.driver
                    .query(t, ".ng-star-inserted", !0)
                    .forEach((t) => g.add(t))
                : _.add(t));
          }
          const y = new Map(),
            b = nd(u, Array.from(g));
          b.forEach((t, e) => {
            const n = "ng-leave" + f++;
            y.set(e, n), t.forEach((t) => id(t, n));
          }),
            t.push(() => {
              d.forEach((t, e) => {
                const n = p.get(e);
                t.forEach((t) => sd(t, n));
              }),
                b.forEach((t, e) => {
                  const n = y.get(e);
                  t.forEach((t) => sd(t, n));
                }),
                m.forEach((t) => {
                  this.processLeaveNode(t);
                });
            });
          const v = [],
            w = [];
          for (let I = this._namespaceList.length - 1; I >= 0; I--)
            this._namespaceList[I].drainQueuedTransitions(e).forEach((t) => {
              const e = t.player,
                s = t.element;
              if ((v.push(e), this.collectedEnterElements.length)) {
                const t = s.__ng_removed;
                if (t && t.setForMove) return void e.destroy();
              }
              const c = !h || !this.driver.containsElement(h, s),
                u = y.get(s),
                d = p.get(s),
                f = this._buildInstruction(t, n, d, u, c);
              if (f.errors && f.errors.length) w.push(f);
              else {
                if (c)
                  return (
                    e.onStart(() => tu(s, f.fromStyles)),
                    e.onDestroy(() => Jh(s, f.toStyles)),
                    void i.push(e)
                  );
                if (t.isFallbackTransition)
                  return (
                    e.onStart(() => tu(s, f.fromStyles)),
                    e.onDestroy(() => Jh(s, f.toStyles)),
                    void i.push(e)
                  );
                f.timelines.forEach((t) => (t.stretchStartingKeyframe = !0)),
                  n.append(s, f.timelines),
                  r.push({ instruction: f, player: e, element: s }),
                  f.queriedElements.forEach((t) => Ph(o, t, []).push(e)),
                  f.preStyleProps.forEach((t, e) => {
                    const n = Object.keys(t);
                    if (n.length) {
                      let t = a.get(e);
                      t || a.set(e, (t = new Set())),
                        n.forEach((e) => t.add(e));
                    }
                  }),
                  f.postStyleProps.forEach((t, e) => {
                    const n = Object.keys(t);
                    let i = l.get(e);
                    i || l.set(e, (i = new Set())), n.forEach((t) => i.add(t));
                  });
              }
            });
          if (w.length) {
            const t = [];
            w.forEach((e) => {
              t.push(`@${e.triggerName} has failed due to:\n`),
                e.errors.forEach((e) => t.push(`- ${e}\n`));
            }),
              v.forEach((t) => t.destroy()),
              this.reportError(t);
          }
          const x = new Map(),
            C = new Map();
          r.forEach((t) => {
            const e = t.element;
            n.has(e) &&
              (C.set(e, e),
              this._beforeAnimationBuild(
                t.player.namespaceId,
                t.instruction,
                x
              ));
          }),
            i.forEach((t) => {
              const e = t.element;
              this._getPreviousPlayers(
                e,
                !1,
                t.namespaceId,
                t.triggerName,
                null
              ).forEach((t) => {
                Ph(x, e, []).push(t), t.destroy();
              });
            });
          const S = m.filter((t) => od(t, a, l)),
            k = new Map();
          ed(k, this.driver, _, l, "*").forEach((t) => {
            od(t, a, l) && S.push(t);
          });
          const E = new Map();
          d.forEach((t, e) => {
            ed(E, this.driver, new Set(t), a, "!");
          }),
            S.forEach((t) => {
              const e = k.get(t),
                n = E.get(t);
              k.set(t, Object.assign(Object.assign({}, e), n));
            });
          const T = [],
            A = [],
            O = {};
          r.forEach((t) => {
            const { element: e, player: r, instruction: o } = t;
            if (n.has(e)) {
              if (c.has(e))
                return (
                  r.onDestroy(() => Jh(e, o.toStyles)),
                  (r.disabled = !0),
                  r.overrideTotalTime(o.totalTime),
                  void i.push(r)
                );
              let t = O;
              if (C.size > 1) {
                let n = e;
                const i = [];
                for (; (n = n.parentNode); ) {
                  const e = C.get(n);
                  if (e) {
                    t = e;
                    break;
                  }
                  i.push(n);
                }
                i.forEach((e) => C.set(e, t));
              }
              const n = this._buildAnimation(r.namespaceId, o, x, s, E, k);
              if ((r.setRealPlayer(n), t === O)) T.push(r);
              else {
                const e = this.playersByElement.get(t);
                e && e.length && (r.parentPlayer = Eh(e)), i.push(r);
              }
            } else
              tu(e, o.fromStyles),
                r.onDestroy(() => Jh(e, o.toStyles)),
                A.push(r),
                c.has(e) && i.push(r);
          }),
            A.forEach((t) => {
              const e = s.get(t.element);
              if (e && e.length) {
                const n = Eh(e);
                t.setRealPlayer(n);
              }
            }),
            i.forEach((t) => {
              t.parentPlayer ? t.syncPlayerEvents(t.parentPlayer) : t.destroy();
            });
          for (let I = 0; I < m.length; I++) {
            const t = m[I],
              e = t.__ng_removed;
            if ((sd(t, "ng-leave"), e && e.hasAnimation)) continue;
            let n = [];
            if (o.size) {
              let e = o.get(t);
              e && e.length && n.push(...e);
              let i = this.driver.query(t, ".ng-animating", !0);
              for (let t = 0; t < i.length; t++) {
                let e = o.get(i[t]);
                e && e.length && n.push(...e);
              }
            }
            const i = n.filter((t) => !t.destroyed);
            i.length ? rd(this, t, i) : this.processLeaveNode(t);
          }
          return (
            (m.length = 0),
            T.forEach((t) => {
              this.players.push(t),
                t.onDone(() => {
                  t.destroy();
                  const e = this.players.indexOf(t);
                  this.players.splice(e, 1);
                }),
                t.play();
            }),
            T
          );
        }
        elementContainsData(t, e) {
          let n = !1;
          const i = e.__ng_removed;
          return (
            i && i.setForRemoval && (n = !0),
            this.playersByElement.has(e) && (n = !0),
            this.playersByQueriedElement.has(e) && (n = !0),
            this.statesByElement.has(e) && (n = !0),
            this._fetchNamespace(t).elementContainsData(e) || n
          );
        }
        afterFlush(t) {
          this._flushFns.push(t);
        }
        afterFlushAnimationsDone(t) {
          this._whenQuietFns.push(t);
        }
        _getPreviousPlayers(t, e, n, i, s) {
          let r = [];
          if (e) {
            const e = this.playersByQueriedElement.get(t);
            e && (r = e);
          } else {
            const e = this.playersByElement.get(t);
            if (e) {
              const t = !s || "void" == s;
              e.forEach((e) => {
                e.queued || ((t || e.triggerName == i) && r.push(e));
              });
            }
          }
          return (
            (n || i) &&
              (r = r.filter(
                (t) => !((n && n != t.namespaceId) || (i && i != t.triggerName))
              )),
            r
          );
        }
        _beforeAnimationBuild(t, e, n) {
          const i = e.element,
            s = e.isRemovalTransition ? void 0 : t,
            r = e.isRemovalTransition ? void 0 : e.triggerName;
          for (const o of e.timelines) {
            const t = o.element,
              a = t !== i,
              l = Ph(n, t, []);
            this._getPreviousPlayers(t, a, s, r, e.toState).forEach((t) => {
              const e = t.getRealPlayer();
              e.beforeDestroy && e.beforeDestroy(), t.destroy(), l.push(t);
            });
          }
          tu(i, e.fromStyles);
        }
        _buildAnimation(t, e, n, i, s, r) {
          const o = e.triggerName,
            a = e.element,
            l = [],
            c = new Set(),
            h = new Set(),
            u = e.timelines.map((e) => {
              const u = e.element;
              c.add(u);
              const d = u.__ng_removed;
              if (d && d.removedBeforeQueried)
                return new Ch(e.duration, e.delay);
              const p = u !== a,
                f = (function (t) {
                  const e = [];
                  return (
                    (function t(e, n) {
                      for (let i = 0; i < e.length; i++) {
                        const s = e[i];
                        s instanceof Sh ? t(s.players, n) : n.push(s);
                      }
                    })(t, e),
                    e
                  );
                })((n.get(u) || qu).map((t) => t.getRealPlayer())).filter(
                  (t) => !!t.element && t.element === u
                ),
                m = s.get(u),
                g = r.get(u),
                _ = Th(0, this._normalizer, 0, e.keyframes, m, g),
                y = this._buildPlayer(e, _, f);
              if ((e.subTimeline && i && h.add(u), p)) {
                const e = new Yu(t, o, u);
                e.setRealPlayer(y), l.push(e);
              }
              return y;
            });
          l.forEach((t) => {
            Ph(this.playersByQueriedElement, t.element, []).push(t),
              t.onDone(() =>
                (function (t, e, n) {
                  let i;
                  if (t instanceof Map) {
                    if (((i = t.get(e)), i)) {
                      if (i.length) {
                        const t = i.indexOf(n);
                        i.splice(t, 1);
                      }
                      0 == i.length && t.delete(e);
                    }
                  } else if (((i = t[e]), i)) {
                    if (i.length) {
                      const t = i.indexOf(n);
                      i.splice(t, 1);
                    }
                    0 == i.length && delete t[e];
                  }
                  return i;
                })(this.playersByQueriedElement, t.element, t)
              );
          }),
            c.forEach((t) => id(t, "ng-animating"));
          const d = Eh(u);
          return (
            d.onDestroy(() => {
              c.forEach((t) => sd(t, "ng-animating")), Jh(a, e.toStyles);
            }),
            h.forEach((t) => {
              Ph(i, t, []).push(d);
            }),
            d
          );
        }
        _buildPlayer(t, e, n) {
          return e.length > 0
            ? this.driver.animate(
                t.element,
                e,
                t.duration,
                t.delay,
                t.easing,
                n
              )
            : new Ch(t.duration, t.delay);
        }
      }
      class Yu {
        constructor(t, e, n) {
          (this.namespaceId = t),
            (this.triggerName = e),
            (this.element = n),
            (this._player = new Ch()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = {}),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(t) {
          this._containsRealPlayer ||
            ((this._player = t),
            Object.keys(this._queuedCallbacks).forEach((e) => {
              this._queuedCallbacks[e].forEach((n) => Ah(t, e, void 0, n));
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(t.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(t) {
          this.totalTime = t;
        }
        syncPlayerEvents(t) {
          const e = this._player;
          e.triggerCallback && t.onStart(() => e.triggerCallback("start")),
            t.onDone(() => this.finish()),
            t.onDestroy(() => this.destroy());
        }
        _queueEvent(t, e) {
          Ph(this._queuedCallbacks, t, []).push(e);
        }
        onDone(t) {
          this.queued && this._queueEvent("done", t), this._player.onDone(t);
        }
        onStart(t) {
          this.queued && this._queueEvent("start", t), this._player.onStart(t);
        }
        onDestroy(t) {
          this.queued && this._queueEvent("destroy", t),
            this._player.onDestroy(t);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(t) {
          this.queued || this._player.setPosition(t);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(t) {
          const e = this._player;
          e.triggerCallback && e.triggerCallback(t);
        }
      }
      function Ju(t) {
        return t && 1 === t.nodeType;
      }
      function td(t, e) {
        const n = t.style.display;
        return (t.style.display = null != e ? e : "none"), n;
      }
      function ed(t, e, n, i, s) {
        const r = [];
        n.forEach((t) => r.push(td(t)));
        const o = [];
        i.forEach((n, i) => {
          const r = {};
          n.forEach((t) => {
            const n = (r[t] = e.computeStyle(i, t, s));
            (n && 0 != n.length) || ((i.__ng_removed = Gu), o.push(i));
          }),
            t.set(i, r);
        });
        let a = 0;
        return n.forEach((t) => td(t, r[a++])), o;
      }
      function nd(t, e) {
        const n = new Map();
        if ((t.forEach((t) => n.set(t, [])), 0 == e.length)) return n;
        const i = new Set(e),
          s = new Map();
        return (
          e.forEach((t) => {
            const e = (function t(e) {
              if (!e) return 1;
              let r = s.get(e);
              if (r) return r;
              const o = e.parentNode;
              return (r = n.has(o) ? o : i.has(o) ? 1 : t(o)), s.set(e, r), r;
            })(t);
            1 !== e && n.get(e).push(t);
          }),
          n
        );
      }
      function id(t, e) {
        if (t.classList) t.classList.add(e);
        else {
          let n = t.$$classes;
          n || (n = t.$$classes = {}), (n[e] = !0);
        }
      }
      function sd(t, e) {
        if (t.classList) t.classList.remove(e);
        else {
          let n = t.$$classes;
          n && delete n[e];
        }
      }
      function rd(t, e, n) {
        Eh(n).onDone(() => t.processLeaveNode(e));
      }
      function od(t, e, n) {
        const i = n.get(t);
        if (!i) return !1;
        let s = e.get(t);
        return s ? i.forEach((t) => s.add(t)) : e.set(t, i), n.delete(t), !0;
      }
      class ad {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (t, e) => {}),
            (this._transitionEngine = new Xu(t, e, n)),
            (this._timelineEngine = new zu(t, e, n)),
            (this._transitionEngine.onRemovalComplete = (t, e) =>
              this.onRemovalComplete(t, e));
        }
        registerTrigger(t, e, n, i, s) {
          const r = t + "-" + i;
          let o = this._triggerCache[r];
          if (!o) {
            const t = [],
              e = _u(this._driver, s, t);
            if (t.length)
              throw new Error(
                `The animation trigger "${i}" has failed to build due to the following errors:\n - ${t.join(
                  "\n - "
                )}`
              );
            (o = (function (t, e) {
              return new Hu(t, e);
            })(i, e)),
              (this._triggerCache[r] = o);
          }
          this._transitionEngine.registerTrigger(e, i, o);
        }
        register(t, e) {
          this._transitionEngine.register(t, e);
        }
        destroy(t, e) {
          this._transitionEngine.destroy(t, e);
        }
        onInsert(t, e, n, i) {
          this._transitionEngine.insertNode(t, e, n, i);
        }
        onRemove(t, e, n, i) {
          this._transitionEngine.removeNode(t, e, i || !1, n);
        }
        disableAnimations(t, e) {
          this._transitionEngine.markElementAsDisabled(t, e);
        }
        process(t, e, n, i) {
          if ("@" == n.charAt(0)) {
            const [t, s] = Rh(n);
            this._timelineEngine.command(t, e, s, i);
          } else this._transitionEngine.trigger(t, e, n, i);
        }
        listen(t, e, n, i, s) {
          if ("@" == n.charAt(0)) {
            const [t, i] = Rh(n);
            return this._timelineEngine.listen(t, e, i, s);
          }
          return this._transitionEngine.listen(t, e, n, i, s);
        }
        flush(t = -1) {
          this._transitionEngine.flush(t);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      function ld(t, e) {
        let n = null,
          i = null;
        return (
          Array.isArray(e) && e.length
            ? ((n = hd(e[0])), e.length > 1 && (i = hd(e[e.length - 1])))
            : e && (n = hd(e)),
          n || i ? new cd(t, n, i) : null
        );
      }
      let cd = (() => {
        class t {
          constructor(e, n, i) {
            (this._element = e),
              (this._startStyles = n),
              (this._endStyles = i),
              (this._state = 0);
            let s = t.initialStylesByElement.get(e);
            s || t.initialStylesByElement.set(e, (s = {})),
              (this._initialStyles = s);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Jh(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Jh(this._element, this._initialStyles),
                this._endStyles &&
                  (Jh(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (t.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (tu(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (tu(this._element, this._endStyles),
                  (this._endStyles = null)),
                Jh(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (t.initialStylesByElement = new WeakMap()), t;
      })();
      function hd(t) {
        let e = null;
        const n = Object.keys(t);
        for (let i = 0; i < n.length; i++) {
          const s = n[i];
          ud(s) && ((e = e || {}), (e[s] = t[s]));
        }
        return e;
      }
      function ud(t) {
        return "display" === t || "position" === t;
      }
      class dd {
        constructor(t, e, n, i, s, r, o) {
          (this._element = t),
            (this._name = e),
            (this._duration = n),
            (this._delay = i),
            (this._easing = s),
            (this._fillMode = r),
            (this._onDoneFn = o),
            (this._finished = !1),
            (this._destroyed = !1),
            (this._startTime = 0),
            (this._position = 0),
            (this._eventFn = (t) => this._handleCallback(t));
        }
        apply() {
          !(function (t, e) {
            const n = yd(t, "").trim();
            n.length &&
              ((function (t, e) {
                let n = 0;
                for (let i = 0; i < t.length; i++) "," === t.charAt(i) && n++;
              })(n),
              (e = `${n}, ${e}`)),
              _d(t, "", e);
          })(
            this._element,
            `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`
          ),
            gd(this._element, this._eventFn, !1),
            (this._startTime = Date.now());
        }
        pause() {
          pd(this._element, this._name, "paused");
        }
        resume() {
          pd(this._element, this._name, "running");
        }
        setPosition(t) {
          const e = fd(this._element, this._name);
          (this._position = t * this._duration),
            _d(this._element, "Delay", `-${this._position}ms`, e);
        }
        getPosition() {
          return this._position;
        }
        _handleCallback(t) {
          const e = t._ngTestManualTimestamp || Date.now(),
            n = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
          t.animationName == this._name &&
            Math.max(e - this._startTime, 0) >= this._delay &&
            n >= this._duration &&
            this.finish();
        }
        finish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFn(),
            gd(this._element, this._eventFn, !0));
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.finish(),
            (function (t, e) {
              const n = yd(t, "").split(","),
                i = md(n, e);
              i >= 0 && (n.splice(i, 1), _d(t, "", n.join(",")));
            })(this._element, this._name));
        }
      }
      function pd(t, e, n) {
        _d(t, "PlayState", n, fd(t, e));
      }
      function fd(t, e) {
        const n = yd(t, "");
        return n.indexOf(",") > 0 ? md(n.split(","), e) : md([n], e);
      }
      function md(t, e) {
        for (let n = 0; n < t.length; n++) if (t[n].indexOf(e) >= 0) return n;
        return -1;
      }
      function gd(t, e, n) {
        n
          ? t.removeEventListener("animationend", e)
          : t.addEventListener("animationend", e);
      }
      function _d(t, e, n, i) {
        const s = "animation" + e;
        if (null != i) {
          const e = t.style[s];
          if (e.length) {
            const t = e.split(",");
            (t[i] = n), (n = t.join(","));
          }
        }
        t.style[s] = n;
      }
      function yd(t, e) {
        return t.style["animation" + e];
      }
      class bd {
        constructor(t, e, n, i, s, r, o, a) {
          (this.element = t),
            (this.keyframes = e),
            (this.animationName = n),
            (this._duration = i),
            (this._delay = s),
            (this._finalStyles = o),
            (this._specialStyles = a),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this.currentSnapshot = {}),
            (this._state = 0),
            (this.easing = r || "linear"),
            (this.totalTime = i + s),
            this._buildStyler();
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        destroy() {
          this.init(),
            this._state >= 4 ||
              ((this._state = 4),
              this._styler.destroy(),
              this._flushStartFns(),
              this._flushDoneFns(),
              this._specialStyles && this._specialStyles.destroy(),
              this._onDestroyFns.forEach((t) => t()),
              (this._onDestroyFns = []));
        }
        _flushDoneFns() {
          this._onDoneFns.forEach((t) => t()), (this._onDoneFns = []);
        }
        _flushStartFns() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        finish() {
          this.init(),
            this._state >= 3 ||
              ((this._state = 3),
              this._styler.finish(),
              this._flushStartFns(),
              this._specialStyles && this._specialStyles.finish(),
              this._flushDoneFns());
        }
        setPosition(t) {
          this._styler.setPosition(t);
        }
        getPosition() {
          return this._styler.getPosition();
        }
        hasStarted() {
          return this._state >= 2;
        }
        init() {
          this._state >= 1 ||
            ((this._state = 1),
            this._styler.apply(),
            this._delay && this._styler.pause());
        }
        play() {
          this.init(),
            this.hasStarted() ||
              (this._flushStartFns(),
              (this._state = 2),
              this._specialStyles && this._specialStyles.start()),
            this._styler.resume();
        }
        pause() {
          this.init(), this._styler.pause();
        }
        restart() {
          this.reset(), this.play();
        }
        reset() {
          this._styler.destroy(), this._buildStyler(), this._styler.apply();
        }
        _buildStyler() {
          this._styler = new dd(
            this.element,
            this.animationName,
            this._duration,
            this._delay,
            this.easing,
            "forwards",
            () => this.finish()
          );
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
        beforeDestroy() {
          this.init();
          const t = {};
          if (this.hasStarted()) {
            const e = this._state >= 3;
            Object.keys(this._finalStyles).forEach((n) => {
              "offset" != n &&
                (t[n] = e ? this._finalStyles[n] : uu(this.element, n));
            });
          }
          this.currentSnapshot = t;
        }
      }
      class vd extends Ch {
        constructor(t, e) {
          super(),
            (this.element = t),
            (this._startingStyles = {}),
            (this.__initialized = !1),
            (this._styles = Uh(e));
        }
        init() {
          !this.__initialized &&
            this._startingStyles &&
            ((this.__initialized = !0),
            Object.keys(this._styles).forEach((t) => {
              this._startingStyles[t] = this.element.style[t];
            }),
            super.init());
        }
        play() {
          this._startingStyles &&
            (this.init(),
            Object.keys(this._styles).forEach((t) =>
              this.element.style.setProperty(t, this._styles[t])
            ),
            super.play());
        }
        destroy() {
          this._startingStyles &&
            (Object.keys(this._startingStyles).forEach((t) => {
              const e = this._startingStyles[t];
              e
                ? this.element.style.setProperty(t, e)
                : this.element.style.removeProperty(t);
            }),
            (this._startingStyles = null),
            super.destroy());
        }
      }
      class wd {
        constructor() {
          (this._count = 0),
            (this._head = document.querySelector("head")),
            (this._warningIssued = !1);
        }
        validateStyleProperty(t) {
          return Vh(t);
        }
        matchesElement(t, e) {
          return $h(t, e);
        }
        containsElement(t, e) {
          return Hh(t, e);
        }
        query(t, e, n) {
          return Bh(t, e, n);
        }
        computeStyle(t, e, n) {
          return window.getComputedStyle(t)[e];
        }
        buildKeyframeElement(t, e, n) {
          n = n.map((t) => Uh(t));
          let i = `@keyframes ${e} {\n`,
            s = "";
          n.forEach((t) => {
            s = " ";
            const e = parseFloat(t.offset);
            (i += `${s}${100 * e}% {\n`),
              (s += " "),
              Object.keys(t).forEach((e) => {
                const n = t[e];
                switch (e) {
                  case "offset":
                    return;
                  case "easing":
                    return void (
                      n && (i += `${s}animation-timing-function: ${n};\n`)
                    );
                  default:
                    return void (i += `${s}${e}: ${n};\n`);
                }
              }),
              (i += s + "}\n");
          }),
            (i += "}\n");
          const r = document.createElement("style");
          return (r.innerHTML = i), r;
        }
        animate(t, e, n, i, s, r = [], o) {
          o && this._notifyFaultyScrubber();
          const a = r.filter((t) => t instanceof bd),
            l = {};
          lu(n, i) &&
            a.forEach((t) => {
              let e = t.currentSnapshot;
              Object.keys(e).forEach((t) => (l[t] = e[t]));
            });
          const c = (function (t) {
            let e = {};
            return (
              t &&
                (Array.isArray(t) ? t : [t]).forEach((t) => {
                  Object.keys(t).forEach((n) => {
                    "offset" != n && "easing" != n && (e[n] = t[n]);
                  });
                }),
              e
            );
          })((e = cu(t, e, l)));
          if (0 == n) return new vd(t, c);
          const h = "gen_css_kf_" + this._count++,
            u = this.buildKeyframeElement(t, h, e);
          document.querySelector("head").appendChild(u);
          const d = ld(t, e),
            p = new bd(t, e, h, n, i, s, c, d);
          return (
            p.onDestroy(() => {
              var t;
              (t = u).parentNode.removeChild(t);
            }),
            p
          );
        }
        _notifyFaultyScrubber() {
          this._warningIssued ||
            (console.warn(
              "@angular/animations: please load the web-animations.js polyfill to allow programmatic access...\n",
              "  visit http://bit.ly/IWukam to learn more about using the web-animation-js polyfill."
            ),
            (this._warningIssued = !0));
        }
      }
      class xd {
        constructor(t, e, n, i) {
          (this.element = t),
            (this.keyframes = e),
            (this.options = n),
            (this._specialStyles = i),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = {}),
            (this._duration = n.duration),
            (this._delay = n.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const t = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            t,
            this.options
          )),
            (this._finalKeyframe = t.length ? t[t.length - 1] : {}),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _triggerWebAnimation(t, e, n) {
          return t.animate(e, n);
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((t) => t()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        setPosition(t) {
          this.domPlayer.currentTime = t * this.time;
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const t = {};
          this.hasStarted() &&
            Object.keys(this._finalKeyframe).forEach((e) => {
              "offset" != e &&
                (t[e] = this._finished
                  ? this._finalKeyframe[e]
                  : uu(this.element, e));
            }),
            (this.currentSnapshot = t);
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((t) => t()), (e.length = 0);
        }
      }
      class Cd {
        constructor() {
          (this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
            Sd().toString()
          )),
            (this._cssKeyframesDriver = new wd());
        }
        validateStyleProperty(t) {
          return Vh(t);
        }
        matchesElement(t, e) {
          return $h(t, e);
        }
        containsElement(t, e) {
          return Hh(t, e);
        }
        query(t, e, n) {
          return Bh(t, e, n);
        }
        computeStyle(t, e, n) {
          return window.getComputedStyle(t)[e];
        }
        overrideWebAnimationsSupport(t) {
          this._isNativeImpl = t;
        }
        animate(t, e, n, i, s, r = [], o) {
          if (!o && !this._isNativeImpl)
            return this._cssKeyframesDriver.animate(t, e, n, i, s, r);
          const a = {
            duration: n,
            delay: i,
            fill: 0 == i ? "both" : "forwards",
          };
          s && (a.easing = s);
          const l = {},
            c = r.filter((t) => t instanceof xd);
          lu(n, i) &&
            c.forEach((t) => {
              let e = t.currentSnapshot;
              Object.keys(e).forEach((t) => (l[t] = e[t]));
            });
          const h = ld(t, (e = cu(t, (e = e.map((t) => Qh(t, !1))), l)));
          return new xd(t, e, a, h);
        }
      }
      function Sd() {
        return (
          ("undefined" != typeof window &&
            void 0 !== window.document &&
            Element.prototype.animate) ||
          {}
        );
      }
      let kd = (() => {
        class t extends mh {
          constructor(t, e) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = t.createRenderer(e.body, {
                id: "0",
                encapsulation: ae.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(t) {
            const e = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const n = Array.isArray(t) ? yh(t) : t;
            return (
              Ad(this._renderer, null, e, "register", [n]),
              new Ed(e, this._renderer)
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt($o), Wt(tc));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Ed extends class {} {
        constructor(t, e) {
          super(), (this._id = t), (this._renderer = e);
        }
        create(t, e) {
          return new Td(this._id, t, e || {}, this._renderer);
        }
      }
      class Td {
        constructor(t, e, n, i) {
          (this.id = t),
            (this.element = e),
            (this._renderer = i),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", n);
        }
        _listen(t, e) {
          return this._renderer.listen(this.element, `@@${this.id}:${t}`, e);
        }
        _command(t, ...e) {
          return Ad(this._renderer, this.element, this.id, t, e);
        }
        onDone(t) {
          this._listen("done", t);
        }
        onStart(t) {
          this._listen("start", t);
        }
        onDestroy(t) {
          this._listen("destroy", t);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset");
        }
        setPosition(t) {
          this._command("setPosition", t);
        }
        getPosition() {
          return 0;
        }
      }
      function Ad(t, e, n, i, s) {
        return t.setProperty(e, `@@${n}:${i}`, s);
      }
      let Od = (() => {
        class t {
          constructor(t, e, n) {
            (this.delegate = t),
              (this.engine = e),
              (this._zone = n),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (e.onRemovalComplete = (t, e) => {
                e && e.parentNode(t) && e.removeChild(t.parentNode, t);
              });
          }
          createRenderer(t, e) {
            const n = this.delegate.createRenderer(t, e);
            if (!(t && e && e.data && e.data.animation)) {
              let t = this._rendererCache.get(n);
              return (
                t ||
                  ((t = new Id("", n, this.engine)),
                  this._rendererCache.set(n, t)),
                t
              );
            }
            const i = e.id,
              s = e.id + "-" + this._currentId;
            this._currentId++, this.engine.register(s, t);
            const r = (e) => {
              Array.isArray(e)
                ? e.forEach(r)
                : this.engine.registerTrigger(i, s, t, e.name, e);
            };
            return e.data.animation.forEach(r), new Pd(this, s, n, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(t, e, n) {
            t >= 0 && t < this._microtaskId
              ? this._zone.run(() => e(n))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((t) => {
                        const [e, n] = t;
                        e(n);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([e, n]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt($o), Wt(ad), Wt(Cl));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Id {
        constructor(t, e, n) {
          (this.namespaceId = t),
            (this.delegate = e),
            (this.engine = n),
            (this.destroyNode = this.delegate.destroyNode
              ? (t) => e.destroyNode(t)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(t, e) {
          return this.delegate.createElement(t, e);
        }
        createComment(t) {
          return this.delegate.createComment(t);
        }
        createText(t) {
          return this.delegate.createText(t);
        }
        appendChild(t, e) {
          this.delegate.appendChild(t, e),
            this.engine.onInsert(this.namespaceId, e, t, !1);
        }
        insertBefore(t, e, n) {
          this.delegate.insertBefore(t, e, n),
            this.engine.onInsert(this.namespaceId, e, t, !0);
        }
        removeChild(t, e, n) {
          this.engine.onRemove(this.namespaceId, e, this.delegate, n);
        }
        selectRootElement(t, e) {
          return this.delegate.selectRootElement(t, e);
        }
        parentNode(t) {
          return this.delegate.parentNode(t);
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t);
        }
        setAttribute(t, e, n, i) {
          this.delegate.setAttribute(t, e, n, i);
        }
        removeAttribute(t, e, n) {
          this.delegate.removeAttribute(t, e, n);
        }
        addClass(t, e) {
          this.delegate.addClass(t, e);
        }
        removeClass(t, e) {
          this.delegate.removeClass(t, e);
        }
        setStyle(t, e, n, i) {
          this.delegate.setStyle(t, e, n, i);
        }
        removeStyle(t, e, n) {
          this.delegate.removeStyle(t, e, n);
        }
        setProperty(t, e, n) {
          "@" == e.charAt(0) && "@.disabled" == e
            ? this.disableAnimations(t, !!n)
            : this.delegate.setProperty(t, e, n);
        }
        setValue(t, e) {
          this.delegate.setValue(t, e);
        }
        listen(t, e, n) {
          return this.delegate.listen(t, e, n);
        }
        disableAnimations(t, e) {
          this.engine.disableAnimations(t, e);
        }
      }
      class Pd extends Id {
        constructor(t, e, n, i) {
          super(e, n, i), (this.factory = t), (this.namespaceId = e);
        }
        setProperty(t, e, n) {
          "@" == e.charAt(0)
            ? "." == e.charAt(1) && "@.disabled" == e
              ? this.disableAnimations(t, (n = void 0 === n || !!n))
              : this.engine.process(this.namespaceId, t, e.substr(1), n)
            : this.delegate.setProperty(t, e, n);
        }
        listen(t, e, n) {
          if ("@" == e.charAt(0)) {
            const i = (function (t) {
              switch (t) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return t;
              }
            })(t);
            let s = e.substr(1),
              r = "";
            return (
              "@" != s.charAt(0) &&
                ([s, r] = (function (t) {
                  const e = t.indexOf(".");
                  return [t.substring(0, e), t.substr(e + 1)];
                })(s)),
              this.engine.listen(this.namespaceId, i, s, r, (t) => {
                this.factory.scheduleListenerCallback(t._data || -1, n, t);
              })
            );
          }
          return this.delegate.listen(t, e, n);
        }
      }
      let Rd = (() => {
        class t extends ad {
          constructor(t, e, n) {
            super(t.body, e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(tc), Wt(qh), Wt(Nu));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Dd = new Lt("AnimationModuleType"),
        Nd = [
          {
            provide: qh,
            useFactory: function () {
              return "function" == typeof Sd() ? new Cd() : new wd();
            },
          },
          { provide: Dd, useValue: "BrowserAnimations" },
          { provide: mh, useClass: kd },
          {
            provide: Nu,
            useFactory: function () {
              return new Fu();
            },
          },
          { provide: ad, useClass: Rd },
          {
            provide: $o,
            useFactory: function (t, e, n) {
              return new Od(t, e, n);
            },
            deps: [nh, ad, Cl],
          },
        ];
      let Fd = (() => {
        class t {}
        return (
          (t.ɵmod = me({ type: t })),
          (t.ɵinj = ct({
            factory: function (e) {
              return new (e || t)();
            },
            providers: Nd,
            imports: [fh],
          })),
          t
        );
      })();
      function Ld(...t) {
        let e = t[t.length - 1];
        return k(e) ? (t.pop(), j(t, e)) : z(t);
      }
      class Md extends C {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return e && !e.closed && t.next(this._value), e;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new v();
          return this._value;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const jd = (() => {
          function t() {
            return (
              Error.call(this),
              (this.message = "no elements in sequence"),
              (this.name = "EmptyError"),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        Vd = {};
      function $d(...t) {
        let e = null,
          n = null;
        return (
          k(t[t.length - 1]) && (n = t.pop()),
          "function" == typeof t[t.length - 1] && (e = t.pop()),
          1 === t.length && l(t[0]) && (t = t[0]),
          z(t, n).lift(new Hd(e))
        );
      }
      class Hd {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, e) {
          return e.subscribe(new Bd(t, this.resultSelector));
        }
      }
      class Bd extends N {
        constructor(t, e) {
          super(t),
            (this.resultSelector = e),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(t) {
          this.values.push(Vd), this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            (this.active = e), (this.toRespond = e);
            for (let n = 0; n < e; n++) {
              const e = t[n];
              this.add(D(this, e, e, n));
            }
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(t, e, n, i, s) {
          const r = this.values,
            o = this.toRespond
              ? r[n] === Vd
                ? --this.toRespond
                : this.toRespond
              : 0;
          (r[n] = e),
            0 === o &&
              (this.resultSelector
                ? this._tryResultSelector(r)
                : this.destination.next(r.slice()));
        }
        _tryResultSelector(t) {
          let e;
          try {
            e = this.resultSelector.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const Ud = new y((t) => t.complete());
      function zd(t) {
        return t
          ? (function (t) {
              return new y((e) => t.schedule(() => e.complete()));
            })(t)
          : Ud;
      }
      function qd(t) {
        return new y((e) => {
          let n;
          try {
            n = t();
          } catch (i) {
            return void e.error(i);
          }
          return (n ? V(n) : zd()).subscribe(e);
        });
      }
      function Wd() {
        return U(1);
      }
      function Gd(t, e) {
        return function (n) {
          return n.lift(new Zd(t, e));
        };
      }
      class Zd {
        constructor(t, e) {
          (this.predicate = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new Kd(t, this.predicate, this.thisArg));
        }
      }
      class Kd extends f {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          e && this.destination.next(t);
        }
      }
      const Qd = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function Xd(t) {
        return function (e) {
          return 0 === t ? zd() : e.lift(new Yd(t));
        };
      }
      class Yd {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Qd();
        }
        call(t, e) {
          return e.subscribe(new Jd(t, this.total));
        }
      }
      class Jd extends f {
        constructor(t, e) {
          super(t),
            (this.total = e),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(t) {
          const e = this.ring,
            n = this.total,
            i = this.count++;
          e.length < n ? e.push(t) : (e[i % n] = t);
        }
        _complete() {
          const t = this.destination;
          let e = this.count;
          if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              i = this.ring;
            for (let s = 0; s < n; s++) {
              const s = e++ % n;
              t.next(i[s]);
            }
          }
          t.complete();
        }
      }
      function tp(t = ip) {
        return (e) => e.lift(new ep(t));
      }
      class ep {
        constructor(t) {
          this.errorFactory = t;
        }
        call(t, e) {
          return e.subscribe(new np(t, this.errorFactory));
        }
      }
      class np extends f {
        constructor(t, e) {
          super(t), (this.errorFactory = e), (this.hasValue = !1);
        }
        _next(t) {
          (this.hasValue = !0), this.destination.next(t);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let e;
            try {
              e = this.errorFactory();
            } catch (t) {
              e = t;
            }
            this.destination.error(e);
          }
        }
      }
      function ip() {
        return new jd();
      }
      function sp(t = null) {
        return (e) => e.lift(new rp(t));
      }
      class rp {
        constructor(t) {
          this.defaultValue = t;
        }
        call(t, e) {
          return e.subscribe(new op(t, this.defaultValue));
        }
      }
      class op extends f {
        constructor(t, e) {
          super(t), (this.defaultValue = e), (this.isEmpty = !0);
        }
        _next(t) {
          (this.isEmpty = !1), this.destination.next(t);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function ap(t) {
        return function (e) {
          const n = new lp(t),
            i = e.lift(n);
          return (n.caught = i);
        };
      }
      class lp {
        constructor(t) {
          this.selector = t;
        }
        call(t, e) {
          return e.subscribe(new cp(t, this.selector, this.caught));
        }
      }
      class cp extends N {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (e) {
              return void super.error(e);
            }
            this._unsubscribeAndRecycle();
            const i = new E(this, void 0, void 0);
            this.add(i);
            const s = D(this, n, void 0, void 0, i);
            s !== i && this.add(s);
          }
        }
      }
      function hp(t) {
        return (e) => (0 === t ? zd() : e.lift(new up(t)));
      }
      class up {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Qd();
        }
        call(t, e) {
          return e.subscribe(new dp(t, this.total));
        }
      }
      class dp extends f {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e &&
            (this.destination.next(t),
            n === e && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function pp(t, e) {
        const n = arguments.length >= 2;
        return (i) =>
          i.pipe(
            t ? Gd((e, n) => t(e, n, i)) : _,
            hp(1),
            n ? sp(e) : tp(() => new jd())
          );
      }
      function fp() {}
      function mp(t, e, n) {
        return function (i) {
          return i.lift(new gp(t, e, n));
        };
      }
      class gp {
        constructor(t, e, n) {
          (this.nextOrObserver = t), (this.error = e), (this.complete = n);
        }
        call(t, e) {
          return e.subscribe(
            new _p(t, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class _p extends f {
        constructor(t, e, n, s) {
          super(t),
            (this._tapNext = fp),
            (this._tapError = fp),
            (this._tapComplete = fp),
            (this._tapError = n || fp),
            (this._tapComplete = s || fp),
            i(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || fp),
                (this._tapError = e.error || fp),
                (this._tapComplete = e.complete || fp));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
      class yp {
        constructor(t, e, n) {
          (this.predicate = t), (this.thisArg = e), (this.source = n);
        }
        call(t, e) {
          return e.subscribe(
            new bp(t, this.predicate, this.thisArg, this.source)
          );
        }
      }
      class bp extends f {
        constructor(t, e, n, i) {
          super(t),
            (this.predicate = e),
            (this.thisArg = n),
            (this.source = i),
            (this.index = 0),
            (this.thisArg = n || this);
        }
        notifyComplete(t) {
          this.destination.next(t), this.destination.complete();
        }
        _next(t) {
          let e = !1;
          try {
            e = this.predicate.call(this.thisArg, t, this.index++, this.source);
          } catch (n) {
            return void this.destination.error(n);
          }
          e || this.notifyComplete(!1);
        }
        _complete() {
          this.notifyComplete(!0);
        }
      }
      function vp(t, e) {
        return "function" == typeof e
          ? (n) =>
              n.pipe(vp((n, i) => V(t(n, i)).pipe(F((t, s) => e(n, t, i, s)))))
          : (e) => e.lift(new wp(t));
      }
      class wp {
        constructor(t) {
          this.project = t;
        }
        call(t, e) {
          return e.subscribe(new xp(t, this.project));
        }
      }
      class xp extends N {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0);
        }
        _next(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (i) {
            return void this.destination.error(i);
          }
          this._innerSub(e, t, n);
        }
        _innerSub(t, e, n) {
          const i = this.innerSubscription;
          i && i.unsubscribe();
          const s = new E(this, e, n),
            r = this.destination;
          r.add(s),
            (this.innerSubscription = D(this, t, void 0, void 0, s)),
            this.innerSubscription !== s && r.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: t } = this;
          (t && !t.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = null;
        }
        notifyComplete(t) {
          this.destination.remove(t),
            (this.innerSubscription = null),
            this.isStopped && super._complete();
        }
        notifyNext(t, e, n, i, s) {
          this.destination.next(e);
        }
      }
      function Cp(...t) {
        return Wd()(Ld(...t));
      }
      function Sp(...t) {
        const e = t[t.length - 1];
        return k(e) ? (t.pop(), (n) => Cp(t, n, e)) : (e) => Cp(t, e);
      }
      class kp {
        constructor(t, e, n = !1) {
          (this.accumulator = t), (this.seed = e), (this.hasSeed = n);
        }
        call(t, e) {
          return e.subscribe(
            new Ep(t, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class Ep extends f {
        constructor(t, e, n, i) {
          super(t),
            (this.accumulator = e),
            (this._seed = n),
            (this.hasSeed = i),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(t) {
          (this.hasSeed = !0), (this._seed = t);
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t);
          (this.seed = t), this.destination.next(t);
        }
        _tryNext(t) {
          const e = this.index++;
          let n;
          try {
            n = this.accumulator(this.seed, t, e);
          } catch (i) {
            this.destination.error(i);
          }
          (this.seed = n), this.destination.next(n);
        }
      }
      function Tp(t, e) {
        return $(t, e, 1);
      }
      class Ap {
        constructor(t) {
          this.callback = t;
        }
        call(t, e) {
          return e.subscribe(new Op(t, this.callback));
        }
      }
      class Op extends f {
        constructor(t, e) {
          super(t), this.add(new u(e));
        }
      }
      class Ip {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class Pp extends Ip {
        constructor(t, e, n = "imperative", i = null) {
          super(t, e), (this.navigationTrigger = n), (this.restoredState = i);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Rp extends Ip {
        constructor(t, e, n) {
          super(t, e), (this.urlAfterRedirects = n);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Dp extends Ip {
        constructor(t, e, n) {
          super(t, e), (this.reason = n);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Np extends Ip {
        constructor(t, e, n) {
          super(t, e), (this.error = n);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class Fp extends Ip {
        constructor(t, e, n, i) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = i);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Lp extends Ip {
        constructor(t, e, n, i) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = i);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Mp extends Ip {
        constructor(t, e, n, i, s) {
          super(t, e),
            (this.urlAfterRedirects = n),
            (this.state = i),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class jp extends Ip {
        constructor(t, e, n, i) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = i);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Vp extends Ip {
        constructor(t, e, n, i) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = i);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class $p {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class Hp {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class Bp {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Up {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class zp {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class qp {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Wp {
        constructor(t, e, n) {
          (this.routerEvent = t), (this.position = e), (this.anchor = n);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class Gp {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Zp(t) {
        return new Gp(t);
      }
      function Kp(t) {
        const e = Error("NavigationCancelingError: " + t);
        return (e.ngNavigationCancelingError = !0), e;
      }
      function Qp(t, e, n) {
        const i = n.path.split("/");
        if (i.length > t.length) return null;
        if ("full" === n.pathMatch && (e.hasChildren() || i.length < t.length))
          return null;
        const s = {};
        for (let r = 0; r < i.length; r++) {
          const e = i[r],
            n = t[r];
          if (e.startsWith(":")) s[e.substring(1)] = n;
          else if (e !== n.path) return null;
        }
        return { consumed: t.slice(0, i.length), posParams: s };
      }
      function Xp(t, e) {
        const n = Object.keys(t),
          i = Object.keys(e);
        if (!n || !i || n.length != i.length) return !1;
        let s;
        for (let r = 0; r < n.length; r++)
          if (((s = n[r]), !Yp(t[s], e[s]))) return !1;
        return !0;
      }
      function Yp(t, e) {
        return Array.isArray(t) && Array.isArray(e)
          ? t.length == e.length && t.every((t) => e.indexOf(t) > -1)
          : t === e;
      }
      function Jp(t) {
        return Array.prototype.concat.apply([], t);
      }
      function tf(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function ef(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function nf(t) {
        return Kr(t) ? t : Zr(t) ? V(Promise.resolve(t)) : Ld(t);
      }
      function sf(t, e, n) {
        return n
          ? (function (t, e) {
              return Xp(t, e);
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                if (!lf(e.segments, n.segments)) return !1;
                if (e.numberOfChildren !== n.numberOfChildren) return !1;
                for (const i in n.children) {
                  if (!e.children[i]) return !1;
                  if (!t(e.children[i], n.children[i])) return !1;
                }
                return !0;
              })(t.root, e.root)
          : (function (t, e) {
              return (
                Object.keys(e).length <= Object.keys(t).length &&
                Object.keys(e).every((n) => Yp(t[n], e[n]))
              );
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                return (function e(n, i, s) {
                  if (n.segments.length > s.length)
                    return (
                      !!lf(n.segments.slice(0, s.length), s) && !i.hasChildren()
                    );
                  if (n.segments.length === s.length) {
                    if (!lf(n.segments, s)) return !1;
                    for (const e in i.children) {
                      if (!n.children[e]) return !1;
                      if (!t(n.children[e], i.children[e])) return !1;
                    }
                    return !0;
                  }
                  {
                    const t = s.slice(0, n.segments.length),
                      r = s.slice(n.segments.length);
                    return (
                      !!lf(n.segments, t) &&
                      !!n.children.primary &&
                      e(n.children.primary, i, r)
                    );
                  }
                })(e, n, n.segments);
              })(t.root, e.root);
      }
      class rf {
        constructor(t, e, n) {
          (this.root = t), (this.queryParams = e), (this.fragment = n);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Zp(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return df.serialize(this);
        }
      }
      class of {
        constructor(t, e) {
          (this.segments = t),
            (this.children = e),
            (this.parent = null),
            ef(e, (t, e) => (t.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return pf(this);
        }
      }
      class af {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Zp(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return bf(this);
        }
      }
      function lf(t, e) {
        return t.length === e.length && t.every((t, n) => t.path === e[n].path);
      }
      function cf(t, e) {
        let n = [];
        return (
          ef(t.children, (t, i) => {
            "primary" === i && (n = n.concat(e(t, i)));
          }),
          ef(t.children, (t, i) => {
            "primary" !== i && (n = n.concat(e(t, i)));
          }),
          n
        );
      }
      class hf {}
      class uf {
        parse(t) {
          const e = new Sf(t);
          return new rf(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment()
          );
        }
        serialize(t) {
          return `${
            "/" +
            (function t(e, n) {
              if (!e.hasChildren()) return pf(e);
              if (n) {
                const n = e.children.primary ? t(e.children.primary, !1) : "",
                  i = [];
                return (
                  ef(e.children, (e, n) => {
                    "primary" !== n && i.push(`${n}:${t(e, !1)}`);
                  }),
                  i.length > 0 ? `${n}(${i.join("//")})` : n
                );
              }
              {
                const n = cf(e, (n, i) =>
                  "primary" === i
                    ? [t(e.children.primary, !1)]
                    : [`${i}:${t(n, !1)}`]
                );
                return `${pf(e)}/(${n.join("//")})`;
              }
            })(t.root, !0)
          }${(function (t) {
            const e = Object.keys(t).map((e) => {
              const n = t[e];
              return Array.isArray(n)
                ? n.map((t) => `${mf(e)}=${mf(t)}`).join("&")
                : `${mf(e)}=${mf(n)}`;
            });
            return e.length ? "?" + e.join("&") : "";
          })(t.queryParams)}${
            "string" == typeof t.fragment ? "#" + encodeURI(t.fragment) : ""
          }`;
        }
      }
      const df = new uf();
      function pf(t) {
        return t.segments.map((t) => bf(t)).join("/");
      }
      function ff(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function mf(t) {
        return ff(t).replace(/%3B/gi, ";");
      }
      function gf(t) {
        return ff(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function _f(t) {
        return decodeURIComponent(t);
      }
      function yf(t) {
        return _f(t.replace(/\+/g, "%20"));
      }
      function bf(t) {
        return `${gf(t.path)}${
          ((e = t.parameters),
          Object.keys(e)
            .map((t) => `;${gf(t)}=${gf(e[t])}`)
            .join(""))
        }`;
        var e;
      }
      const vf = /^[^\/()?;=#]+/;
      function wf(t) {
        const e = t.match(vf);
        return e ? e[0] : "";
      }
      const xf = /^[^=?&#]+/,
        Cf = /^[^?&#]+/;
      class Sf {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new of([], {})
              : new of([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (e = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) &&
              (n.primary = new of(t, e)),
            n
          );
        }
        parseSegment() {
          const t = wf(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new af(_f(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = wf(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = wf(this.remaining);
            t && ((n = t), this.capture(n));
          }
          t[_f(e)] = _f(n);
        }
        parseQueryParam(t) {
          const e = (function (t) {
            const e = t.match(xf);
            return e ? e[0] : "";
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = (function (t) {
              const e = t.match(Cf);
              return e ? e[0] : "";
            })(this.remaining);
            t && ((n = t), this.capture(n));
          }
          const i = yf(e),
            s = yf(n);
          if (t.hasOwnProperty(i)) {
            let e = t[i];
            Array.isArray(e) || ((e = [e]), (t[i] = e)), e.push(s);
          } else t[i] = s;
        }
        parseParens(t) {
          const e = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const n = wf(this.remaining),
              i = this.remaining[n.length];
            if ("/" !== i && ")" !== i && ";" !== i)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s = void 0;
            n.indexOf(":") > -1
              ? ((s = n.substr(0, n.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : t && (s = "primary");
            const r = this.parseChildren();
            (e[s] = 1 === Object.keys(r).length ? r.primary : new of([], r)),
              this.consumeOptional("//");
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class kf {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = Ef(t, this._root);
          return e ? e.children.map((t) => t.value) : [];
        }
        firstChild(t) {
          const e = Ef(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = Tf(t, this._root);
          return e.length < 2
            ? []
            : e[e.length - 2].children
                .map((t) => t.value)
                .filter((e) => e !== t);
        }
        pathFromRoot(t) {
          return Tf(t, this._root).map((t) => t.value);
        }
      }
      function Ef(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const e = Ef(t, n);
          if (e) return e;
        }
        return null;
      }
      function Tf(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const i = Tf(t, n);
          if (i.length) return i.unshift(e), i;
        }
        return [];
      }
      class Af {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Of(t) {
        const e = {};
        return t && t.children.forEach((t) => (e[t.value.outlet] = t)), e;
      }
      class If extends kf {
        constructor(t, e) {
          super(t), (this.snapshot = e), Lf(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Pf(t, e) {
        const n = (function (t, e) {
            const n = new Nf(
              [],
              {},
              {},
              "",
              {},
              "primary",
              e,
              null,
              t.root,
              -1,
              {}
            );
            return new Ff("", new Af(n, []));
          })(t, e),
          i = new Md([new af("", {})]),
          s = new Md({}),
          r = new Md({}),
          o = new Md({}),
          a = new Md(""),
          l = new Rf(i, s, o, a, r, "primary", e, n.root);
        return (l.snapshot = n.root), new If(new Af(l, []), n);
      }
      class Rf {
        constructor(t, e, n, i, s, r, o, a) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = i),
            (this.data = s),
            (this.outlet = r),
            (this.component = o),
            (this._futureSnapshot = a);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(F((t) => Zp(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(F((t) => Zp(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Df(t, e = "emptyOnly") {
        const n = t.pathFromRoot;
        let i = 0;
        if ("always" !== e)
          for (i = n.length - 1; i >= 1; ) {
            const t = n[i],
              e = n[i - 1];
            if (t.routeConfig && "" === t.routeConfig.path) i--;
            else {
              if (e.component) break;
              i--;
            }
          }
        return (function (t) {
          return t.reduce(
            (t, e) => ({
              params: Object.assign(Object.assign({}, t.params), e.params),
              data: Object.assign(Object.assign({}, t.data), e.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                e._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(i));
      }
      class Nf {
        constructor(t, e, n, i, s, r, o, a, l, c, h) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = i),
            (this.data = s),
            (this.outlet = r),
            (this.component = o),
            (this.routeConfig = a),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = h);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Zp(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Zp(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((t) => t.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Ff extends kf {
        constructor(t, e) {
          super(e), (this.url = t), Lf(this, e);
        }
        toString() {
          return Mf(this._root);
        }
      }
      function Lf(t, e) {
        (e.value._routerState = t), e.children.forEach((e) => Lf(t, e));
      }
      function Mf(t) {
        const e =
          t.children.length > 0 ? ` { ${t.children.map(Mf).join(", ")} } ` : "";
        return `${t.value}${e}`;
      }
      function jf(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            Xp(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            Xp(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n) if (!Xp(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            Xp(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function Vf(t, e) {
        var n, i;
        return (
          Xp(t.params, e.params) &&
          lf((n = t.url), (i = e.url)) &&
          n.every((t, e) => Xp(t.parameters, i[e].parameters)) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || Vf(t.parent, e.parent))
        );
      }
      function $f(t) {
        return (
          "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function Hf(t, e, n, i, s) {
        let r = {};
        return (
          i &&
            ef(i, (t, e) => {
              r[e] = Array.isArray(t) ? t.map((t) => "" + t) : "" + t;
            }),
          new rf(
            n.root === t
              ? e
              : (function t(e, n, i) {
                  const s = {};
                  return (
                    ef(e.children, (e, r) => {
                      s[r] = e === n ? i : t(e, n, i);
                    }),
                    new of(e.segments, s)
                  );
                })(n.root, t, e),
            r,
            s
          )
        );
      }
      class Bf {
        constructor(t, e, n) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = n),
            t && n.length > 0 && $f(n[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const i = n.find(
            (t) => "object" == typeof t && null != t && t.outlets
          );
          if (i && i !== tf(n))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Uf {
        constructor(t, e, n) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = n);
        }
      }
      function zf(t) {
        return "object" == typeof t && null != t && t.outlets
          ? t.outlets.primary
          : "" + t;
      }
      function qf(t, e, n) {
        if (
          (t || (t = new of([], {})),
          0 === t.segments.length && t.hasChildren())
        )
          return Wf(t, e, n);
        const i = (function (t, e, n) {
            let i = 0,
              s = e;
            const r = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; s < t.segments.length; ) {
              if (i >= n.length) return r;
              const e = t.segments[s],
                o = zf(n[i]),
                a = i < n.length - 1 ? n[i + 1] : null;
              if (s > 0 && void 0 === o) break;
              if (o && a && "object" == typeof a && void 0 === a.outlets) {
                if (!Qf(o, a, e)) return r;
                i += 2;
              } else {
                if (!Qf(o, {}, e)) return r;
                i++;
              }
              s++;
            }
            return { match: !0, pathIndex: s, commandIndex: i };
          })(t, e, n),
          s = n.slice(i.commandIndex);
        if (i.match && i.pathIndex < t.segments.length) {
          const e = new of(t.segments.slice(0, i.pathIndex), {});
          return (
            (e.children.primary = new of(
              t.segments.slice(i.pathIndex),
              t.children
            )),
            Wf(e, 0, s)
          );
        }
        return i.match && 0 === s.length
          ? new of(t.segments, {})
          : i.match && !t.hasChildren()
          ? Gf(t, e, n)
          : i.match
          ? Wf(t, 0, s)
          : Gf(t, e, n);
      }
      function Wf(t, e, n) {
        if (0 === n.length) return new of(t.segments, {});
        {
          const i = (function (t) {
              return "object" == typeof t[0] && null !== t[0] && t[0].outlets
                ? t[0].outlets
                : { primary: t };
            })(n),
            s = {};
          return (
            ef(i, (n, i) => {
              null !== n && (s[i] = qf(t.children[i], e, n));
            }),
            ef(t.children, (t, e) => {
              void 0 === i[e] && (s[e] = t);
            }),
            new of(t.segments, s)
          );
        }
      }
      function Gf(t, e, n) {
        const i = t.segments.slice(0, e);
        let s = 0;
        for (; s < n.length; ) {
          if (
            "object" == typeof n[s] &&
            null !== n[s] &&
            void 0 !== n[s].outlets
          ) {
            const t = Zf(n[s].outlets);
            return new of(i, t);
          }
          if (0 === s && $f(n[0])) {
            i.push(new af(t.segments[e].path, n[0])), s++;
            continue;
          }
          const r = zf(n[s]),
            o = s < n.length - 1 ? n[s + 1] : null;
          r && o && $f(o)
            ? (i.push(new af(r, Kf(o))), (s += 2))
            : (i.push(new af(r, {})), s++);
        }
        return new of(i, {});
      }
      function Zf(t) {
        const e = {};
        return (
          ef(t, (t, n) => {
            null !== t && (e[n] = Gf(new of([], {}), 0, t));
          }),
          e
        );
      }
      function Kf(t) {
        const e = {};
        return ef(t, (t, n) => (e[n] = "" + t)), e;
      }
      function Qf(t, e, n) {
        return t == n.path && Xp(e, n.parameters);
      }
      class Xf {
        constructor(t, e, n, i) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = n),
            (this.forwardEvent = i);
        }
        activate(t) {
          const e = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, n, t),
            jf(this.futureState.root),
            this.activateChildRoutes(e, n, t);
        }
        deactivateChildRoutes(t, e, n) {
          const i = Of(e);
          t.children.forEach((t) => {
            const e = t.value.outlet;
            this.deactivateRoutes(t, i[e], n), delete i[e];
          }),
            ef(i, (t, e) => {
              this.deactivateRouteAndItsChildren(t, n);
            });
        }
        deactivateRoutes(t, e, n) {
          const i = t.value,
            s = e ? e.value : null;
          if (i === s)
            if (i.component) {
              const s = n.getContext(i.outlet);
              s && this.deactivateChildRoutes(t, e, s.children);
            } else this.deactivateChildRoutes(t, e, n);
          else s && this.deactivateRouteAndItsChildren(e, n);
        }
        deactivateRouteAndItsChildren(t, e) {
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n && n.outlet) {
            const e = n.outlet.detach(),
              i = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: e,
              route: t,
              contexts: i,
            });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n) {
            const i = Of(t),
              s = t.value.component ? n.children : e;
            ef(i, (t, e) => this.deactivateRouteAndItsChildren(t, s)),
              n.outlet &&
                (n.outlet.deactivate(), n.children.onOutletDeactivated());
          }
        }
        activateChildRoutes(t, e, n) {
          const i = Of(e);
          t.children.forEach((t) => {
            this.activateRoutes(t, i[t.value.outlet], n),
              this.forwardEvent(new qp(t.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new Up(t.value.snapshot));
        }
        activateRoutes(t, e, n) {
          const i = t.value,
            s = e ? e.value : null;
          if ((jf(i), i === s))
            if (i.component) {
              const s = n.getOrCreateContext(i.outlet);
              this.activateChildRoutes(t, e, s.children);
            } else this.activateChildRoutes(t, e, n);
          else if (i.component) {
            const e = n.getOrCreateContext(i.outlet);
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const t = this.routeReuseStrategy.retrieve(i.snapshot);
              this.routeReuseStrategy.store(i.snapshot, null),
                e.children.onOutletReAttached(t.contexts),
                (e.attachRef = t.componentRef),
                (e.route = t.route.value),
                e.outlet && e.outlet.attach(t.componentRef, t.route.value),
                Yf(t.route);
            } else {
              const n = (function (t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig;
                    if (t && t.component) return null;
                  }
                  return null;
                })(i.snapshot),
                s = n ? n.module.componentFactoryResolver : null;
              (e.attachRef = null),
                (e.route = i),
                (e.resolver = s),
                e.outlet && e.outlet.activateWith(i, s),
                this.activateChildRoutes(t, null, e.children);
            }
          } else this.activateChildRoutes(t, null, n);
        }
      }
      function Yf(t) {
        jf(t.value), t.children.forEach(Yf);
      }
      class Jf {
        constructor(t, e) {
          (this.routes = t), (this.module = e);
        }
      }
      function tm(t) {
        return "function" == typeof t;
      }
      function em(t) {
        return t instanceof rf;
      }
      class nm {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class im {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function sm(t) {
        return new y((e) => e.error(new nm(t)));
      }
      function rm(t) {
        return new y((e) => e.error(new im(t)));
      }
      function om(t) {
        return new y((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${t}'`
            )
          )
        );
      }
      class am {
        constructor(t, e, n, i, s) {
          (this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = i),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(Xt));
        }
        apply() {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            this.urlTree.root,
            "primary"
          )
            .pipe(
              F((t) =>
                this.createUrlTree(
                  t,
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              ap((t) => {
                if (t instanceof im)
                  return (this.allowRedirects = !1), this.match(t.urlTree);
                if (t instanceof nm) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            t.root,
            "primary"
          )
            .pipe(F((e) => this.createUrlTree(e, t.queryParams, t.fragment)))
            .pipe(
              ap((t) => {
                if (t instanceof nm) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, e, n) {
          const i = t.segments.length > 0 ? new of([], { primary: t }) : t;
          return new rf(i, e, n);
        }
        expandSegmentGroup(t, e, n, i) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(t, e, n).pipe(F((t) => new of([], t)))
            : this.expandSegment(t, n, e, n.segments, i, !0);
        }
        expandChildren(t, e, n) {
          return (function (t, e) {
            if (0 === Object.keys(t).length) return Ld({});
            const n = [],
              i = [],
              s = {};
            return (
              ef(t, (t, r) => {
                const o = e(r, t).pipe(F((t) => (s[r] = t)));
                "primary" === r ? n.push(o) : i.push(o);
              }),
              Ld.apply(null, n.concat(i)).pipe(
                Wd(),
                (function (t, e) {
                  const n = arguments.length >= 2;
                  return (i) =>
                    i.pipe(
                      t ? Gd((e, n) => t(e, n, i)) : _,
                      Xd(1),
                      n ? sp(e) : tp(() => new jd())
                    );
                })(),
                F(() => s)
              )
            );
          })(n.children, (n, i) => this.expandSegmentGroup(t, e, i, n));
        }
        expandSegment(t, e, n, i, s, r) {
          return Ld(...n).pipe(
            F((o) =>
              this.expandSegmentAgainstRoute(t, e, n, o, i, s, r).pipe(
                ap((t) => {
                  if (t instanceof nm) return Ld(null);
                  throw t;
                })
              )
            ),
            Wd(),
            pp((t) => !!t),
            ap((t, n) => {
              if (t instanceof jd || "EmptyError" === t.name) {
                if (this.noLeftoversInUrl(e, i, s)) return Ld(new of([], {}));
                throw new nm(e);
              }
              throw t;
            })
          );
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        expandSegmentAgainstRoute(t, e, n, i, s, r, o) {
          return um(i) !== r
            ? sm(e)
            : void 0 === i.redirectTo
            ? this.matchSegmentAgainstRoute(t, e, i, s)
            : o && this.allowRedirects
            ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, i, s, r)
            : sm(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, n, i, s, r) {
          return "**" === i.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, i, r)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                n,
                i,
                s,
                r
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, i) {
          const s = this.applyRedirectCommands([], n.redirectTo, {});
          return n.redirectTo.startsWith("/")
            ? rm(s)
            : this.lineralizeSegments(n, s).pipe(
                $((n) => {
                  const s = new of(n, {});
                  return this.expandSegment(t, s, e, n, i, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, i, s, r) {
          const {
            matched: o,
            consumedSegments: a,
            lastChild: l,
            positionalParamSegments: c,
          } = lm(e, i, s);
          if (!o) return sm(e);
          const h = this.applyRedirectCommands(a, i.redirectTo, c);
          return i.redirectTo.startsWith("/")
            ? rm(h)
            : this.lineralizeSegments(i, h).pipe(
                $((i) =>
                  this.expandSegment(t, e, n, i.concat(s.slice(l)), r, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, e, n, i) {
          if ("**" === n.path)
            return n.loadChildren
              ? this.configLoader
                  .load(t.injector, n)
                  .pipe(F((t) => ((n._loadedConfig = t), new of(i, {}))))
              : Ld(new of(i, {}));
          const { matched: s, consumedSegments: r, lastChild: o } = lm(e, n, i);
          if (!s) return sm(e);
          const a = i.slice(o);
          return this.getChildConfig(t, n, i).pipe(
            $((t) => {
              const n = t.module,
                i = t.routes,
                { segmentGroup: s, slicedSegments: o } = (function (
                  t,
                  e,
                  n,
                  i
                ) {
                  return n.length > 0 &&
                    (function (t, e, n) {
                      return n.some((n) => hm(t, e, n) && "primary" !== um(n));
                    })(t, n, i)
                    ? {
                        segmentGroup: cm(
                          new of(
                            e,
                            (function (t, e) {
                              const n = {};
                              n.primary = e;
                              for (const i of t)
                                "" === i.path &&
                                  "primary" !== um(i) &&
                                  (n[um(i)] = new of([], {}));
                              return n;
                            })(i, new of(n, t.children))
                          )
                        ),
                        slicedSegments: [],
                      }
                    : 0 === n.length &&
                      (function (t, e, n) {
                        return n.some((n) => hm(t, e, n));
                      })(t, n, i)
                    ? {
                        segmentGroup: cm(
                          new of(
                            t.segments,
                            (function (t, e, n, i) {
                              const s = {};
                              for (const r of n)
                                hm(t, e, r) &&
                                  !i[um(r)] &&
                                  (s[um(r)] = new of([], {}));
                              return Object.assign(Object.assign({}, i), s);
                            })(t, n, i, t.children)
                          )
                        ),
                        slicedSegments: n,
                      }
                    : { segmentGroup: t, slicedSegments: n };
                })(e, r, a, i);
              return 0 === o.length && s.hasChildren()
                ? this.expandChildren(n, i, s).pipe(F((t) => new of(r, t)))
                : 0 === i.length && 0 === o.length
                ? Ld(new of(r, {}))
                : this.expandSegment(n, s, i, o, "primary", !0).pipe(
                    F((t) => new of(r.concat(t.segments), t.children))
                  );
            })
          );
        }
        getChildConfig(t, e, n) {
          return e.children
            ? Ld(new Jf(e.children, t))
            : e.loadChildren
            ? void 0 !== e._loadedConfig
              ? Ld(e._loadedConfig)
              : this.runCanLoadGuards(t.injector, e, n).pipe(
                  $((n) =>
                    n
                      ? this.configLoader
                          .load(t.injector, e)
                          .pipe(F((t) => ((e._loadedConfig = t), t)))
                      : (function (t) {
                          return new y((e) =>
                            e.error(
                              Kp(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          );
                        })(e)
                  )
                )
            : Ld(new Jf([], t));
        }
        runCanLoadGuards(t, e, n) {
          const i = e.canLoad;
          return i && 0 !== i.length
            ? V(i)
                .pipe(
                  F((i) => {
                    const s = t.get(i);
                    let r;
                    if (
                      (function (t) {
                        return t && tm(t.canLoad);
                      })(s)
                    )
                      r = s.canLoad(e, n);
                    else {
                      if (!tm(s)) throw new Error("Invalid CanLoad guard");
                      r = s(e, n);
                    }
                    return nf(r);
                  })
                )
                .pipe(
                  Wd(),
                  mp((t) => {
                    if (!em(t)) return;
                    const e = Kp(
                      `Redirecting to "${this.urlSerializer.serialize(t)}"`
                    );
                    throw ((e.url = t), e);
                  }),
                  ((s = (t) => !0 === t), (t) => t.lift(new yp(s, void 0, t)))
                )
            : Ld(!0);
          var s;
        }
        lineralizeSegments(t, e) {
          let n = [],
            i = e.root;
          for (;;) {
            if (((n = n.concat(i.segments)), 0 === i.numberOfChildren))
              return Ld(n);
            if (i.numberOfChildren > 1 || !i.children.primary)
              return om(t.redirectTo);
            i = i.children.primary;
          }
        }
        applyRedirectCommands(t, e, n) {
          return this.applyRedirectCreatreUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            n
          );
        }
        applyRedirectCreatreUrlTree(t, e, n, i) {
          const s = this.createSegmentGroup(t, e.root, n, i);
          return new rf(
            s,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment
          );
        }
        createQueryParams(t, e) {
          const n = {};
          return (
            ef(t, (t, i) => {
              if ("string" == typeof t && t.startsWith(":")) {
                const s = t.substring(1);
                n[i] = e[s];
              } else n[i] = t;
            }),
            n
          );
        }
        createSegmentGroup(t, e, n, i) {
          const s = this.createSegments(t, e.segments, n, i);
          let r = {};
          return (
            ef(e.children, (e, s) => {
              r[s] = this.createSegmentGroup(t, e, n, i);
            }),
            new of(s, r)
          );
        }
        createSegments(t, e, n, i) {
          return e.map((e) =>
            e.path.startsWith(":")
              ? this.findPosParam(t, e, i)
              : this.findOrReturn(e, n)
          );
        }
        findPosParam(t, e, n) {
          const i = n[e.path.substring(1)];
          if (!i)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${e.path}'.`
            );
          return i;
        }
        findOrReturn(t, e) {
          let n = 0;
          for (const i of e) {
            if (i.path === t.path) return e.splice(n), i;
            n++;
          }
          return t;
        }
      }
      function lm(t, e, n) {
        if ("" === e.path)
          return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? {
                matched: !1,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              }
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              };
        const i = (e.matcher || Qp)(n, t, e);
        return i
          ? {
              matched: !0,
              consumedSegments: i.consumed,
              lastChild: i.consumed.length,
              positionalParamSegments: i.posParams,
            }
          : {
              matched: !1,
              consumedSegments: [],
              lastChild: 0,
              positionalParamSegments: {},
            };
      }
      function cm(t) {
        if (1 === t.numberOfChildren && t.children.primary) {
          const e = t.children.primary;
          return new of(t.segments.concat(e.segments), e.children);
        }
        return t;
      }
      function hm(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 !== n.redirectTo
        );
      }
      function um(t) {
        return t.outlet || "primary";
      }
      class dm {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class pm {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function fm(t, e, n) {
        const i = t._root;
        return (function t(
          e,
          n,
          i,
          s,
          r = { canDeactivateChecks: [], canActivateChecks: [] }
        ) {
          const o = Of(n);
          return (
            e.children.forEach((e) => {
              !(function (
                e,
                n,
                i,
                s,
                r = { canDeactivateChecks: [], canActivateChecks: [] }
              ) {
                const o = e.value,
                  a = n ? n.value : null,
                  l = i ? i.getContext(e.value.outlet) : null;
                if (a && o.routeConfig === a.routeConfig) {
                  const c = (function (t, e, n) {
                    if ("function" == typeof n) return n(t, e);
                    switch (n) {
                      case "pathParamsChange":
                        return !lf(t.url, e.url);
                      case "pathParamsOrQueryParamsChange":
                        return (
                          !lf(t.url, e.url) || !Xp(t.queryParams, e.queryParams)
                        );
                      case "always":
                        return !0;
                      case "paramsOrQueryParamsChange":
                        return !Vf(t, e) || !Xp(t.queryParams, e.queryParams);
                      case "paramsChange":
                      default:
                        return !Vf(t, e);
                    }
                  })(a, o, o.routeConfig.runGuardsAndResolvers);
                  c
                    ? r.canActivateChecks.push(new dm(s))
                    : ((o.data = a.data), (o._resolvedData = a._resolvedData)),
                    t(e, n, o.component ? (l ? l.children : null) : i, s, r),
                    c &&
                      r.canDeactivateChecks.push(
                        new pm((l && l.outlet && l.outlet.component) || null, a)
                      );
                } else
                  a && gm(n, l, r),
                    r.canActivateChecks.push(new dm(s)),
                    t(e, null, o.component ? (l ? l.children : null) : i, s, r);
              })(e, o[e.value.outlet], i, s.concat([e.value]), r),
                delete o[e.value.outlet];
            }),
            ef(o, (t, e) => gm(t, i.getContext(e), r)),
            r
          );
        })(i, e ? e._root : null, n, [i.value]);
      }
      function mm(t, e, n) {
        const i = (function (t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig;
          }
          return null;
        })(e);
        return (i ? i.module.injector : n).get(t);
      }
      function gm(t, e, n) {
        const i = Of(t),
          s = t.value;
        ef(i, (t, i) => {
          gm(t, s.component ? (e ? e.children.getContext(i) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new pm(
              s.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              s
            )
          );
      }
      const _m = Symbol("INITIAL_VALUE");
      function ym() {
        return vp((t) =>
          $d(...t.map((t) => t.pipe(hp(1), Sp(_m)))).pipe(
            (function (t, e) {
              let n = !1;
              return (
                arguments.length >= 2 && (n = !0),
                function (i) {
                  return i.lift(new kp(t, e, n));
                }
              );
            })((t, e) => {
              let n = !1;
              return e.reduce((t, i, s) => {
                if (t !== _m) return t;
                if ((i === _m && (n = !0), !n)) {
                  if (!1 === i) return i;
                  if (s === e.length - 1 || em(i)) return i;
                }
                return t;
              }, t);
            }, _m),
            Gd((t) => t !== _m),
            F((t) => (em(t) ? t : !0 === t)),
            hp(1)
          )
        );
      }
      function bm(t, e) {
        return null !== t && e && e(new zp(t)), Ld(!0);
      }
      function vm(t, e) {
        return null !== t && e && e(new Bp(t)), Ld(!0);
      }
      function wm(t, e, n) {
        const i = e.routeConfig ? e.routeConfig.canActivate : null;
        return i && 0 !== i.length
          ? Ld(
              i.map((i) =>
                qd(() => {
                  const s = mm(i, e, n);
                  let r;
                  if (
                    (function (t) {
                      return t && tm(t.canActivate);
                    })(s)
                  )
                    r = nf(s.canActivate(e, t));
                  else {
                    if (!tm(s)) throw new Error("Invalid CanActivate guard");
                    r = nf(s(e, t));
                  }
                  return r.pipe(pp());
                })
              )
            ).pipe(ym())
          : Ld(!0);
      }
      function xm(t, e, n) {
        const i = e[e.length - 1],
          s = e
            .slice(0, e.length - 1)
            .reverse()
            .map((t) =>
              (function (t) {
                const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                return e && 0 !== e.length ? { node: t, guards: e } : null;
              })(t)
            )
            .filter((t) => null !== t)
            .map((e) =>
              qd(() =>
                Ld(
                  e.guards.map((s) => {
                    const r = mm(s, e.node, n);
                    let o;
                    if (
                      (function (t) {
                        return t && tm(t.canActivateChild);
                      })(r)
                    )
                      o = nf(r.canActivateChild(i, t));
                    else {
                      if (!tm(r))
                        throw new Error("Invalid CanActivateChild guard");
                      o = nf(r(i, t));
                    }
                    return o.pipe(pp());
                  })
                ).pipe(ym())
              )
            );
        return Ld(s).pipe(ym());
      }
      class Cm {}
      class Sm {
        constructor(t, e, n, i, s, r) {
          (this.rootComponentType = t),
            (this.config = e),
            (this.urlTree = n),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = r);
        }
        recognize() {
          try {
            const t = Tm(
                this.urlTree.root,
                [],
                [],
                this.config,
                this.relativeLinkResolution
              ).segmentGroup,
              e = this.processSegmentGroup(this.config, t, "primary"),
              n = new Nf(
                [],
                Object.freeze({}),
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                {},
                "primary",
                this.rootComponentType,
                null,
                this.urlTree.root,
                -1,
                {}
              ),
              i = new Af(n, e),
              s = new Ff(this.url, i);
            return this.inheritParamsAndData(s._root), Ld(s);
          } catch (t) {
            return new y((e) => e.error(t));
          }
        }
        inheritParamsAndData(t) {
          const e = t.value,
            n = Df(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(n.params)),
            (e.data = Object.freeze(n.data)),
            t.children.forEach((t) => this.inheritParamsAndData(t));
        }
        processSegmentGroup(t, e, n) {
          return 0 === e.segments.length && e.hasChildren()
            ? this.processChildren(t, e)
            : this.processSegment(t, e, e.segments, n);
        }
        processChildren(t, e) {
          const n = cf(e, (e, n) => this.processSegmentGroup(t, e, n));
          return (
            (function (t) {
              const e = {};
              t.forEach((t) => {
                const n = e[t.value.outlet];
                if (n) {
                  const e = n.url.map((t) => t.toString()).join("/"),
                    i = t.value.url.map((t) => t.toString()).join("/");
                  throw new Error(
                    `Two segments cannot have the same outlet name: '${e}' and '${i}'.`
                  );
                }
                e[t.value.outlet] = t.value;
              });
            })(n),
            n.sort((t, e) =>
              "primary" === t.value.outlet
                ? -1
                : "primary" === e.value.outlet
                ? 1
                : t.value.outlet.localeCompare(e.value.outlet)
            ),
            n
          );
        }
        processSegment(t, e, n, i) {
          for (const r of t)
            try {
              return this.processSegmentAgainstRoute(r, e, n, i);
            } catch (s) {
              if (!(s instanceof Cm)) throw s;
            }
          if (this.noLeftoversInUrl(e, n, i)) return [];
          throw new Cm();
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        processSegmentAgainstRoute(t, e, n, i) {
          if (t.redirectTo) throw new Cm();
          if ((t.outlet || "primary") !== i) throw new Cm();
          let s,
            r = [],
            o = [];
          if ("**" === t.path) {
            const r = n.length > 0 ? tf(n).parameters : {};
            s = new Nf(
              n,
              r,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              Im(t),
              i,
              t.component,
              t,
              km(e),
              Em(e) + n.length,
              Pm(t)
            );
          } else {
            const a = (function (t, e, n) {
              if ("" === e.path) {
                if ("full" === e.pathMatch && (t.hasChildren() || n.length > 0))
                  throw new Cm();
                return { consumedSegments: [], lastChild: 0, parameters: {} };
              }
              const i = (e.matcher || Qp)(n, t, e);
              if (!i) throw new Cm();
              const s = {};
              ef(i.posParams, (t, e) => {
                s[e] = t.path;
              });
              const r =
                i.consumed.length > 0
                  ? Object.assign(
                      Object.assign({}, s),
                      i.consumed[i.consumed.length - 1].parameters
                    )
                  : s;
              return {
                consumedSegments: i.consumed,
                lastChild: i.consumed.length,
                parameters: r,
              };
            })(e, t, n);
            (r = a.consumedSegments),
              (o = n.slice(a.lastChild)),
              (s = new Nf(
                r,
                a.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                Im(t),
                i,
                t.component,
                t,
                km(e),
                Em(e) + r.length,
                Pm(t)
              ));
          }
          const a = (function (t) {
              return t.children
                ? t.children
                : t.loadChildren
                ? t._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: l, slicedSegments: c } = Tm(
              e,
              r,
              o,
              a,
              this.relativeLinkResolution
            );
          if (0 === c.length && l.hasChildren()) {
            const t = this.processChildren(a, l);
            return [new Af(s, t)];
          }
          if (0 === a.length && 0 === c.length) return [new Af(s, [])];
          const h = this.processSegment(a, l, c, "primary");
          return [new Af(s, h)];
        }
      }
      function km(t) {
        let e = t;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function Em(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return n - 1;
      }
      function Tm(t, e, n, i, s) {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return n.some((n) => Am(t, e, n) && "primary" !== Om(n));
          })(t, n, i)
        ) {
          const s = new of(
            e,
            (function (t, e, n, i) {
              const s = {};
              (s.primary = i),
                (i._sourceSegment = t),
                (i._segmentIndexShift = e.length);
              for (const r of n)
                if ("" === r.path && "primary" !== Om(r)) {
                  const n = new of([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift = e.length),
                    (s[Om(r)] = n);
                }
              return s;
            })(t, e, i, new of(n, t.children))
          );
          return (
            (s._sourceSegment = t),
            (s._segmentIndexShift = e.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return n.some((n) => Am(t, e, n));
          })(t, n, i)
        ) {
          const r = new of(
            t.segments,
            (function (t, e, n, i, s, r) {
              const o = {};
              for (const a of i)
                if (Am(t, n, a) && !s[Om(a)]) {
                  const n = new of([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift =
                      "legacy" === r ? t.segments.length : e.length),
                    (o[Om(a)] = n);
                }
              return Object.assign(Object.assign({}, s), o);
            })(t, e, n, i, t.children, s)
          );
          return (
            (r._sourceSegment = t),
            (r._segmentIndexShift = e.length),
            { segmentGroup: r, slicedSegments: n }
          );
        }
        const r = new of(t.segments, t.children);
        return (
          (r._sourceSegment = t),
          (r._segmentIndexShift = e.length),
          { segmentGroup: r, slicedSegments: n }
        );
      }
      function Am(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 === n.redirectTo
        );
      }
      function Om(t) {
        return t.outlet || "primary";
      }
      function Im(t) {
        return t.data || {};
      }
      function Pm(t) {
        return t.resolve || {};
      }
      function Rm(t) {
        return function (e) {
          return e.pipe(
            vp((e) => {
              const n = t(e);
              return n ? V(n).pipe(F(() => e)) : V([e]);
            })
          );
        };
      }
      class Dm {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      }
      let Nm = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = ue({
            type: t,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (t, e) {
              1 & t && zr(0, "router-outlet");
            },
            directives: function () {
              return [Zm];
            },
            encapsulation: 2,
          })),
          t
        );
      })();
      function Fm(t, e = "") {
        for (let n = 0; n < t.length; n++) {
          const i = t[n];
          Lm(i, Mm(e, i));
        }
      }
      function Lm(t, e) {
        if (!t)
          throw new Error(
            `\n      Invalid configuration of route '${e}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `
          );
        if (Array.isArray(t))
          throw new Error(
            `Invalid configuration of route '${e}': Array cannot be specified`
          );
        if (
          !t.component &&
          !t.children &&
          !t.loadChildren &&
          t.outlet &&
          "primary" !== t.outlet
        )
          throw new Error(
            `Invalid configuration of route '${e}': a componentless route without children or loadChildren cannot have a named outlet set`
          );
        if (t.redirectTo && t.children)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and children cannot be used together`
          );
        if (t.redirectTo && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and loadChildren cannot be used together`
          );
        if (t.children && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': children and loadChildren cannot be used together`
          );
        if (t.redirectTo && t.component)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and component cannot be used together`
          );
        if (t.path && t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': path and matcher cannot be used together`
          );
        if (
          void 0 === t.redirectTo &&
          !t.component &&
          !t.children &&
          !t.loadChildren
        )
          throw new Error(
            `Invalid configuration of route '${e}'. One of the following must be provided: component, redirectTo, children or loadChildren`
          );
        if (void 0 === t.path && void 0 === t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': routes must have either a path or a matcher specified`
          );
        if ("string" == typeof t.path && "/" === t.path.charAt(0))
          throw new Error(
            `Invalid configuration of route '${e}': path cannot start with a slash`
          );
        if ("" === t.path && void 0 !== t.redirectTo && void 0 === t.pathMatch)
          throw new Error(
            `Invalid configuration of route '{path: "${e}", redirectTo: "${t.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`
          );
        if (
          void 0 !== t.pathMatch &&
          "full" !== t.pathMatch &&
          "prefix" !== t.pathMatch
        )
          throw new Error(
            `Invalid configuration of route '${e}': pathMatch can only be set to 'prefix' or 'full'`
          );
        t.children && Fm(t.children, e);
      }
      function Mm(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? t + "/"
              : !t && e.path
              ? e.path
              : `${t}/${e.path}`
            : ""
          : t;
      }
      function jm(t) {
        const e = t.children && t.children.map(jm),
          n = e
            ? Object.assign(Object.assign({}, t), { children: e })
            : Object.assign({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            "primary" !== n.outlet &&
            (n.component = Nm),
          n
        );
      }
      const Vm = new Lt("ROUTES");
      class $m {
        constructor(t, e, n, i) {
          (this.loader = t),
            (this.compiler = e),
            (this.onLoadStartListener = n),
            (this.onLoadEndListener = i);
        }
        load(t, e) {
          return (
            this.onLoadStartListener && this.onLoadStartListener(e),
            this.loadModuleFactory(e.loadChildren).pipe(
              F((n) => {
                this.onLoadEndListener && this.onLoadEndListener(e);
                const i = n.create(t);
                return new Jf(Jp(i.injector.get(Vm)).map(jm), i);
              })
            )
          );
        }
        loadModuleFactory(t) {
          return "string" == typeof t
            ? V(this.loader.load(t))
            : nf(t()).pipe(
                $((t) =>
                  t instanceof Yt
                    ? Ld(t)
                    : V(this.compiler.compileModuleAsync(t))
                )
              );
        }
      }
      class Hm {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new Bm()),
            (this.attachRef = null);
        }
      }
      class Bm {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, e) {
          const n = this.getOrCreateContext(t);
          (n.outlet = e), this.contexts.set(t, n);
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t);
          e && (e.outlet = null);
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let e = this.getContext(t);
          return e || ((e = new Hm()), this.contexts.set(t, e)), e;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      class Um {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, e) {
          return t;
        }
      }
      function zm(t) {
        throw t;
      }
      function qm(t, e, n) {
        return e.parse("/");
      }
      function Wm(t, e) {
        return Ld(null);
      }
      let Gm = (() => {
          class t {
            constructor(t, e, n, i, s, r, o, a) {
              (this.rootComponentType = t),
                (this.urlSerializer = e),
                (this.rootContexts = n),
                (this.location = i),
                (this.config = a),
                (this.lastSuccessfulNavigation = null),
                (this.currentNavigation = null),
                (this.navigationId = 0),
                (this.isNgZoneEnabled = !1),
                (this.events = new C()),
                (this.errorHandler = zm),
                (this.malformedUriErrorHandler = qm),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.hooks = {
                  beforePreactivation: Wm,
                  afterPreactivation: Wm,
                }),
                (this.urlHandlingStrategy = new Um()),
                (this.routeReuseStrategy = new Dm()),
                (this.onSameUrlNavigation = "ignore"),
                (this.paramsInheritanceStrategy = "emptyOnly"),
                (this.urlUpdateStrategy = "deferred"),
                (this.relativeLinkResolution = "legacy"),
                (this.ngModule = s.get(Xt)),
                (this.console = s.get(hl));
              const l = s.get(Cl);
              (this.isNgZoneEnabled = l instanceof Cl),
                this.resetConfig(a),
                (this.currentUrlTree = new rf(new of([], {}), {}, null)),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.configLoader = new $m(
                  r,
                  o,
                  (t) => this.triggerEvent(new $p(t)),
                  (t) => this.triggerEvent(new Hp(t))
                )),
                (this.routerState = Pf(
                  this.currentUrlTree,
                  this.rootComponentType
                )),
                (this.transitions = new Md({
                  id: 0,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  extractedUrl: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  urlAfterRedirects: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  rawUrl: this.currentUrlTree,
                  extras: {},
                  resolve: null,
                  reject: null,
                  promise: Promise.resolve(!0),
                  source: "imperative",
                  restoredState: null,
                  currentSnapshot: this.routerState.snapshot,
                  targetSnapshot: null,
                  currentRouterState: this.routerState,
                  targetRouterState: null,
                  guards: { canActivateChecks: [], canDeactivateChecks: [] },
                  guardsResult: null,
                })),
                (this.navigations = this.setupNavigations(this.transitions)),
                this.processNavigations();
            }
            setupNavigations(t) {
              const e = this.events;
              return t.pipe(
                Gd((t) => 0 !== t.id),
                F((t) =>
                  Object.assign(Object.assign({}, t), {
                    extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl),
                  })
                ),
                vp((t) => {
                  let n = !1,
                    i = !1;
                  return Ld(t).pipe(
                    mp((t) => {
                      this.currentNavigation = {
                        id: t.id,
                        initialUrl: t.currentRawUrl,
                        extractedUrl: t.extractedUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? Object.assign(
                              Object.assign({}, this.lastSuccessfulNavigation),
                              { previousNavigation: null }
                            )
                          : null,
                      };
                    }),
                    vp((t) => {
                      const n =
                        !this.navigated ||
                        t.extractedUrl.toString() !==
                          this.browserUrlTree.toString();
                      if (
                        ("reload" === this.onSameUrlNavigation || n) &&
                        this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                      )
                        return Ld(t).pipe(
                          vp((t) => {
                            const n = this.transitions.getValue();
                            return (
                              e.next(
                                new Pp(
                                  t.id,
                                  this.serializeUrl(t.extractedUrl),
                                  t.source,
                                  t.restoredState
                                )
                              ),
                              n !== this.transitions.getValue() ? Ud : [t]
                            );
                          }),
                          vp((t) => Promise.resolve(t)),
                          ((i = this.ngModule.injector),
                          (s = this.configLoader),
                          (r = this.urlSerializer),
                          (o = this.config),
                          function (t) {
                            return t.pipe(
                              vp((t) =>
                                (function (t, e, n, i, s) {
                                  return new am(t, e, n, i, s).apply();
                                })(i, s, r, t.extractedUrl, o).pipe(
                                  F((e) =>
                                    Object.assign(Object.assign({}, t), {
                                      urlAfterRedirects: e,
                                    })
                                  )
                                )
                              )
                            );
                          }),
                          mp((t) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: t.urlAfterRedirects }
                            );
                          }),
                          (function (t, e, n, i, s) {
                            return function (r) {
                              return r.pipe(
                                $((r) =>
                                  (function (
                                    t,
                                    e,
                                    n,
                                    i,
                                    s = "emptyOnly",
                                    r = "legacy"
                                  ) {
                                    return new Sm(t, e, n, i, s, r).recognize();
                                  })(
                                    t,
                                    e,
                                    r.urlAfterRedirects,
                                    n(r.urlAfterRedirects),
                                    i,
                                    s
                                  ).pipe(
                                    F((t) =>
                                      Object.assign(Object.assign({}, r), {
                                        targetSnapshot: t,
                                      })
                                    )
                                  )
                                )
                              );
                            };
                          })(
                            this.rootComponentType,
                            this.config,
                            (t) => this.serializeUrl(t),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          mp((t) => {
                            "eager" === this.urlUpdateStrategy &&
                              (t.extras.skipLocationChange ||
                                this.setBrowserUrl(
                                  t.urlAfterRedirects,
                                  !!t.extras.replaceUrl,
                                  t.id,
                                  t.extras.state
                                ),
                              (this.browserUrlTree = t.urlAfterRedirects));
                          }),
                          mp((t) => {
                            const n = new Fp(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            e.next(n);
                          })
                        );
                      var i, s, r, o;
                      if (
                        n &&
                        this.rawUrlTree &&
                        this.urlHandlingStrategy.shouldProcessUrl(
                          this.rawUrlTree
                        )
                      ) {
                        const {
                            id: n,
                            extractedUrl: i,
                            source: s,
                            restoredState: r,
                            extras: o,
                          } = t,
                          a = new Pp(n, this.serializeUrl(i), s, r);
                        e.next(a);
                        const l = Pf(i, this.rootComponentType).snapshot;
                        return Ld(
                          Object.assign(Object.assign({}, t), {
                            targetSnapshot: l,
                            urlAfterRedirects: i,
                            extras: Object.assign(Object.assign({}, o), {
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            }),
                          })
                        );
                      }
                      return (
                        (this.rawUrlTree = t.rawUrl),
                        (this.browserUrlTree = t.urlAfterRedirects),
                        t.resolve(null),
                        Ud
                      );
                    }),
                    Rm((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: i,
                        rawUrl: s,
                        extras: { skipLocationChange: r, replaceUrl: o },
                      } = t;
                      return this.hooks.beforePreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: i,
                        rawUrlTree: s,
                        skipLocationChange: !!r,
                        replaceUrl: !!o,
                      });
                    }),
                    mp((t) => {
                      const e = new Lp(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot
                      );
                      this.triggerEvent(e);
                    }),
                    F((t) =>
                      Object.assign(Object.assign({}, t), {
                        guards: fm(
                          t.targetSnapshot,
                          t.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                    ),
                    (function (t, e) {
                      return function (n) {
                        return n.pipe(
                          $((n) => {
                            const {
                              targetSnapshot: i,
                              currentSnapshot: s,
                              guards: {
                                canActivateChecks: r,
                                canDeactivateChecks: o,
                              },
                            } = n;
                            return 0 === o.length && 0 === r.length
                              ? Ld(
                                  Object.assign(Object.assign({}, n), {
                                    guardsResult: !0,
                                  })
                                )
                              : (function (t, e, n, i) {
                                  return V(t).pipe(
                                    $((t) =>
                                      (function (t, e, n, i, s) {
                                        const r =
                                          e && e.routeConfig
                                            ? e.routeConfig.canDeactivate
                                            : null;
                                        return r && 0 !== r.length
                                          ? Ld(
                                              r.map((r) => {
                                                const o = mm(r, e, s);
                                                let a;
                                                if (
                                                  (function (t) {
                                                    return (
                                                      t && tm(t.canDeactivate)
                                                    );
                                                  })(o)
                                                )
                                                  a = nf(
                                                    o.canDeactivate(t, e, n, i)
                                                  );
                                                else {
                                                  if (!tm(o))
                                                    throw new Error(
                                                      "Invalid CanDeactivate guard"
                                                    );
                                                  a = nf(o(t, e, n, i));
                                                }
                                                return a.pipe(pp());
                                              })
                                            ).pipe(ym())
                                          : Ld(!0);
                                      })(t.component, t.route, n, e, i)
                                    ),
                                    pp((t) => !0 !== t, !0)
                                  );
                                })(o, i, s, t).pipe(
                                  $((n) =>
                                    n && "boolean" == typeof n
                                      ? (function (t, e, n, i) {
                                          return V(e).pipe(
                                            Tp((e) =>
                                              V([
                                                vm(e.route.parent, i),
                                                bm(e.route, i),
                                                xm(t, e.path, n),
                                                wm(t, e.route, n),
                                              ]).pipe(
                                                Wd(),
                                                pp((t) => !0 !== t, !0)
                                              )
                                            ),
                                            pp((t) => !0 !== t, !0)
                                          );
                                        })(i, r, t, e)
                                      : Ld(n)
                                  ),
                                  F((t) =>
                                    Object.assign(Object.assign({}, n), {
                                      guardsResult: t,
                                    })
                                  )
                                );
                          })
                        );
                      };
                    })(this.ngModule.injector, (t) => this.triggerEvent(t)),
                    mp((t) => {
                      if (em(t.guardsResult)) {
                        const e = Kp(
                          `Redirecting to "${this.serializeUrl(
                            t.guardsResult
                          )}"`
                        );
                        throw ((e.url = t.guardsResult), e);
                      }
                    }),
                    mp((t) => {
                      const e = new Mp(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot,
                        !!t.guardsResult
                      );
                      this.triggerEvent(e);
                    }),
                    Gd((t) => {
                      if (!t.guardsResult) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new Dp(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          ""
                        );
                        return e.next(n), t.resolve(!1), !1;
                      }
                      return !0;
                    }),
                    Rm((t) => {
                      if (t.guards.canActivateChecks.length)
                        return Ld(t).pipe(
                          mp((t) => {
                            const e = new jp(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          }),
                          vp((t) => {
                            let n = !1;
                            return Ld(t).pipe(
                              ((i = this.paramsInheritanceStrategy),
                              (s = this.ngModule.injector),
                              function (t) {
                                return t.pipe(
                                  $((t) => {
                                    const {
                                      targetSnapshot: e,
                                      guards: { canActivateChecks: n },
                                    } = t;
                                    if (!n.length) return Ld(t);
                                    let r = 0;
                                    return V(n).pipe(
                                      Tp((t) =>
                                        (function (t, e, n, i) {
                                          return (function (t, e, n, i) {
                                            const s = Object.keys(t);
                                            if (0 === s.length) return Ld({});
                                            const r = {};
                                            return V(s).pipe(
                                              $((s) =>
                                                (function (t, e, n, i) {
                                                  const s = mm(t, e, i);
                                                  return nf(
                                                    s.resolve
                                                      ? s.resolve(e, n)
                                                      : s(e, n)
                                                  );
                                                })(t[s], e, n, i).pipe(
                                                  mp((t) => {
                                                    r[s] = t;
                                                  })
                                                )
                                              ),
                                              Xd(1),
                                              $(() =>
                                                Object.keys(r).length ===
                                                s.length
                                                  ? Ld(r)
                                                  : Ud
                                              )
                                            );
                                          })(t._resolve, t, e, i).pipe(
                                            F(
                                              (e) => (
                                                (t._resolvedData = e),
                                                (t.data = Object.assign(
                                                  Object.assign({}, t.data),
                                                  Df(t, n).resolve
                                                )),
                                                null
                                              )
                                            )
                                          );
                                        })(t.route, e, i, s)
                                      ),
                                      mp(() => r++),
                                      Xd(1),
                                      $((e) => (r === n.length ? Ld(t) : Ud))
                                    );
                                  })
                                );
                              }),
                              mp({
                                next: () => (n = !0),
                                complete: () => {
                                  if (!n) {
                                    const n = new Dp(
                                      t.id,
                                      this.serializeUrl(t.extractedUrl),
                                      "At least one route resolver didn't emit any value."
                                    );
                                    e.next(n), t.resolve(!1);
                                  }
                                },
                              })
                            );
                            var i, s;
                          }),
                          mp((t) => {
                            const e = new Vp(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          })
                        );
                    }),
                    Rm((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: i,
                        rawUrl: s,
                        extras: { skipLocationChange: r, replaceUrl: o },
                      } = t;
                      return this.hooks.afterPreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: i,
                        rawUrlTree: s,
                        skipLocationChange: !!r,
                        replaceUrl: !!o,
                      });
                    }),
                    F((t) => {
                      const e = (function (t, e, n) {
                        const i = (function t(e, n, i) {
                          if (
                            i &&
                            e.shouldReuseRoute(n.value, i.value.snapshot)
                          ) {
                            const s = i.value;
                            s._futureSnapshot = n.value;
                            const r = (function (e, n, i) {
                              return n.children.map((n) => {
                                for (const s of i.children)
                                  if (
                                    e.shouldReuseRoute(
                                      s.value.snapshot,
                                      n.value
                                    )
                                  )
                                    return t(e, n, s);
                                return t(e, n);
                              });
                            })(e, n, i);
                            return new Af(s, r);
                          }
                          {
                            const i = e.retrieve(n.value);
                            if (i) {
                              const t = i.route;
                              return (
                                (function t(e, n) {
                                  if (
                                    e.value.routeConfig !== n.value.routeConfig
                                  )
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot created from a different route"
                                    );
                                  if (e.children.length !== n.children.length)
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot with a different number of children"
                                    );
                                  n.value._futureSnapshot = e.value;
                                  for (let i = 0; i < e.children.length; ++i)
                                    t(e.children[i], n.children[i]);
                                })(n, t),
                                t
                              );
                            }
                            {
                              const i = new Rf(
                                  new Md((s = n.value).url),
                                  new Md(s.params),
                                  new Md(s.queryParams),
                                  new Md(s.fragment),
                                  new Md(s.data),
                                  s.outlet,
                                  s.component,
                                  s
                                ),
                                r = n.children.map((n) => t(e, n));
                              return new Af(i, r);
                            }
                          }
                          var s;
                        })(t, e._root, n ? n._root : void 0);
                        return new If(i, e);
                      })(
                        this.routeReuseStrategy,
                        t.targetSnapshot,
                        t.currentRouterState
                      );
                      return Object.assign(Object.assign({}, t), {
                        targetRouterState: e,
                      });
                    }),
                    mp((t) => {
                      (this.currentUrlTree = t.urlAfterRedirects),
                        (this.rawUrlTree = this.urlHandlingStrategy.merge(
                          this.currentUrlTree,
                          t.rawUrl
                        )),
                        (this.routerState = t.targetRouterState),
                        "deferred" === this.urlUpdateStrategy &&
                          (t.extras.skipLocationChange ||
                            this.setBrowserUrl(
                              this.rawUrlTree,
                              !!t.extras.replaceUrl,
                              t.id,
                              t.extras.state
                            ),
                          (this.browserUrlTree = t.urlAfterRedirects));
                    }),
                    ((r = this.rootContexts),
                    (o = this.routeReuseStrategy),
                    (a = (t) => this.triggerEvent(t)),
                    F(
                      (t) => (
                        new Xf(
                          o,
                          t.targetRouterState,
                          t.currentRouterState,
                          a
                        ).activate(r),
                        t
                      )
                    )),
                    mp({
                      next() {
                        n = !0;
                      },
                      complete() {
                        n = !0;
                      },
                    }),
                    ((s = () => {
                      if (!n && !i) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new Dp(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
                        );
                        e.next(n), t.resolve(!1);
                      }
                      this.currentNavigation = null;
                    }),
                    (t) => t.lift(new Ap(s))),
                    ap((n) => {
                      if (((i = !0), (s = n) && s.ngNavigationCancelingError)) {
                        const i = em(n.url);
                        i ||
                          ((this.navigated = !0),
                          this.resetStateAndUrl(
                            t.currentRouterState,
                            t.currentUrlTree,
                            t.rawUrl
                          ));
                        const s = new Dp(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n.message
                        );
                        e.next(s),
                          i
                            ? setTimeout(() => {
                                const e = this.urlHandlingStrategy.merge(
                                  n.url,
                                  this.rawUrlTree
                                );
                                return this.scheduleNavigation(
                                  e,
                                  "imperative",
                                  null,
                                  {
                                    skipLocationChange:
                                      t.extras.skipLocationChange,
                                    replaceUrl:
                                      "eager" === this.urlUpdateStrategy,
                                  },
                                  {
                                    resolve: t.resolve,
                                    reject: t.reject,
                                    promise: t.promise,
                                  }
                                );
                              }, 0)
                            : t.resolve(!1);
                      } else {
                        this.resetStateAndUrl(
                          t.currentRouterState,
                          t.currentUrlTree,
                          t.rawUrl
                        );
                        const i = new Np(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n
                        );
                        e.next(i);
                        try {
                          t.resolve(this.errorHandler(n));
                        } catch (r) {
                          t.reject(r);
                        }
                      }
                      var s;
                      return Ud;
                    })
                  );
                  var s, r, o, a;
                })
              );
            }
            resetRootComponentType(t) {
              (this.rootComponentType = t),
                (this.routerState.root.component = this.rootComponentType);
            }
            getTransition() {
              const t = this.transitions.value;
              return (t.urlAfterRedirects = this.browserUrlTree), t;
            }
            setTransition(t) {
              this.transitions.next(
                Object.assign(Object.assign({}, this.getTransition()), t)
              );
            }
            initialNavigation() {
              this.setUpLocationChangeListener(),
                0 === this.navigationId &&
                  this.navigateByUrl(this.location.path(!0), {
                    replaceUrl: !0,
                  });
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((t) => {
                  let e = this.parseUrl(t.url);
                  const n = "popstate" === t.type ? "popstate" : "hashchange",
                    i = t.state && t.state.navigationId ? t.state : null;
                  setTimeout(() => {
                    this.scheduleNavigation(e, n, i, { replaceUrl: !0 });
                  }, 0);
                }));
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.currentNavigation;
            }
            triggerEvent(t) {
              this.events.next(t);
            }
            resetConfig(t) {
              Fm(t),
                (this.config = t.map(jm)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = null));
            }
            createUrlTree(t, e = {}) {
              const {
                relativeTo: n,
                queryParams: i,
                fragment: s,
                preserveQueryParams: r,
                queryParamsHandling: o,
                preserveFragment: a,
              } = e;
              mi() &&
                r &&
                console &&
                console.warn &&
                console.warn(
                  "preserveQueryParams is deprecated, use queryParamsHandling instead."
                );
              const l = n || this.routerState.root,
                c = a ? this.currentUrlTree.fragment : s;
              let h = null;
              if (o)
                switch (o) {
                  case "merge":
                    h = Object.assign(
                      Object.assign({}, this.currentUrlTree.queryParams),
                      i
                    );
                    break;
                  case "preserve":
                    h = this.currentUrlTree.queryParams;
                    break;
                  default:
                    h = i || null;
                }
              else h = r ? this.currentUrlTree.queryParams : i || null;
              return (
                null !== h && (h = this.removeEmptyProps(h)),
                (function (t, e, n, i, s) {
                  if (0 === n.length) return Hf(e.root, e.root, e, i, s);
                  const r = (function (t) {
                    if (
                      "string" == typeof t[0] &&
                      1 === t.length &&
                      "/" === t[0]
                    )
                      return new Bf(!0, 0, t);
                    let e = 0,
                      n = !1;
                    const i = t.reduce((t, i, s) => {
                      if ("object" == typeof i && null != i) {
                        if (i.outlets) {
                          const e = {};
                          return (
                            ef(i.outlets, (t, n) => {
                              e[n] = "string" == typeof t ? t.split("/") : t;
                            }),
                            [...t, { outlets: e }]
                          );
                        }
                        if (i.segmentPath) return [...t, i.segmentPath];
                      }
                      return "string" != typeof i
                        ? [...t, i]
                        : 0 === s
                        ? (i.split("/").forEach((i, s) => {
                            (0 == s && "." === i) ||
                              (0 == s && "" === i
                                ? (n = !0)
                                : ".." === i
                                ? e++
                                : "" != i && t.push(i));
                          }),
                          t)
                        : [...t, i];
                    }, []);
                    return new Bf(n, e, i);
                  })(n);
                  if (r.toRoot()) return Hf(e.root, new of([], {}), e, i, s);
                  const o = (function (t, e, n) {
                      if (t.isAbsolute) return new Uf(e.root, !0, 0);
                      if (-1 === n.snapshot._lastPathIndex) {
                        const t = n.snapshot._urlSegment;
                        return new Uf(t, t === e.root, 0);
                      }
                      const i = $f(t.commands[0]) ? 0 : 1;
                      return (function (t, e, n) {
                        let i = t,
                          s = e,
                          r = n;
                        for (; r > s; ) {
                          if (((r -= s), (i = i.parent), !i))
                            throw new Error("Invalid number of '../'");
                          s = i.segments.length;
                        }
                        return new Uf(i, !1, s - r);
                      })(
                        n.snapshot._urlSegment,
                        n.snapshot._lastPathIndex + i,
                        t.numberOfDoubleDots
                      );
                    })(r, e, t),
                    a = o.processChildren
                      ? Wf(o.segmentGroup, o.index, r.commands)
                      : qf(o.segmentGroup, o.index, r.commands);
                  return Hf(o.segmentGroup, a, e, i, s);
                })(l, this.currentUrlTree, t, h, c)
              );
            }
            navigateByUrl(t, e = { skipLocationChange: !1 }) {
              mi() &&
                this.isNgZoneEnabled &&
                !Cl.isInAngularZone() &&
                this.console.warn(
                  "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?"
                );
              const n = em(t) ? t : this.parseUrl(t),
                i = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
              return this.scheduleNavigation(i, "imperative", null, e);
            }
            navigate(t, e = { skipLocationChange: !1 }) {
              return (
                (function (t) {
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    if (null == n)
                      throw new Error(
                        `The requested path contains ${n} segment at index ${e}`
                      );
                  }
                })(t),
                this.navigateByUrl(this.createUrlTree(t, e), e)
              );
            }
            serializeUrl(t) {
              return this.urlSerializer.serialize(t);
            }
            parseUrl(t) {
              let e;
              try {
                e = this.urlSerializer.parse(t);
              } catch (n) {
                e = this.malformedUriErrorHandler(n, this.urlSerializer, t);
              }
              return e;
            }
            isActive(t, e) {
              if (em(t)) return sf(this.currentUrlTree, t, e);
              const n = this.parseUrl(t);
              return sf(this.currentUrlTree, n, e);
            }
            removeEmptyProps(t) {
              return Object.keys(t).reduce((e, n) => {
                const i = t[n];
                return null != i && (e[n] = i), e;
              }, {});
            }
            processNavigations() {
              this.navigations.subscribe(
                (t) => {
                  (this.navigated = !0),
                    (this.lastSuccessfulId = t.id),
                    this.events.next(
                      new Rp(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(this.currentUrlTree)
                      )
                    ),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    (this.currentNavigation = null),
                    t.resolve(!0);
                },
                (t) => {
                  this.console.warn("Unhandled Navigation Error: ");
                }
              );
            }
            scheduleNavigation(t, e, n, i, s) {
              const r = this.getTransition();
              if (
                r &&
                "imperative" !== e &&
                "imperative" === r.source &&
                r.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              if (
                r &&
                "hashchange" == e &&
                "popstate" === r.source &&
                r.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              if (
                r &&
                "popstate" == e &&
                "hashchange" === r.source &&
                r.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              let o, a, l;
              s
                ? ((o = s.resolve), (a = s.reject), (l = s.promise))
                : (l = new Promise((t, e) => {
                    (o = t), (a = e);
                  }));
              const c = ++this.navigationId;
              return (
                this.setTransition({
                  id: c,
                  source: e,
                  restoredState: n,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.rawUrlTree,
                  rawUrl: t,
                  extras: i,
                  resolve: o,
                  reject: a,
                  promise: l,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                l.catch((t) => Promise.reject(t))
              );
            }
            setBrowserUrl(t, e, n, i) {
              const s = this.urlSerializer.serialize(t);
              (i = i || {}),
                this.location.isCurrentPathEqualTo(s) || e
                  ? this.location.replaceState(
                      s,
                      "",
                      Object.assign(Object.assign({}, i), { navigationId: n })
                    )
                  : this.location.go(
                      s,
                      "",
                      Object.assign(Object.assign({}, i), { navigationId: n })
                    );
            }
            resetStateAndUrl(t, e, n) {
              (this.routerState = t),
                (this.currentUrlTree = e),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n
                )),
                this.resetUrlToCurrentUrlTree();
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                { navigationId: this.lastSuccessfulId }
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                Wt(hr),
                Wt(hf),
                Wt(Bm),
                Wt(mc),
                Wt(kr),
                Wt(zl),
                Wt(vl),
                Wt(void 0)
              );
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Zm = (() => {
          class t {
            constructor(t, e, n, i, s) {
              (this.parentContexts = t),
                (this.location = e),
                (this.resolver = n),
                (this.changeDetector = s),
                (this.activated = null),
                (this._activatedRoute = null),
                (this.activateEvents = new Na()),
                (this.deactivateEvents = new Na()),
                (this.name = i || "primary"),
                t.onChildOutletCreated(this.name, this);
            }
            ngOnDestroy() {
              this.parentContexts.onChildOutletDestroyed(this.name);
            }
            ngOnInit() {
              if (!this.activated) {
                const t = this.parentContexts.getContext(this.name);
                t &&
                  t.route &&
                  (t.attachRef
                    ? this.attach(t.attachRef, t.route)
                    : this.activateWith(t.route, t.resolver || null));
              }
            }
            get isActivated() {
              return !!this.activated;
            }
            get component() {
              if (!this.activated) throw new Error("Outlet is not activated");
              return this.activated.instance;
            }
            get activatedRoute() {
              if (!this.activated) throw new Error("Outlet is not activated");
              return this._activatedRoute;
            }
            get activatedRouteData() {
              return this._activatedRoute
                ? this._activatedRoute.snapshot.data
                : {};
            }
            detach() {
              if (!this.activated) throw new Error("Outlet is not activated");
              this.location.detach();
              const t = this.activated;
              return (this.activated = null), (this._activatedRoute = null), t;
            }
            attach(t, e) {
              (this.activated = t),
                (this._activatedRoute = e),
                this.location.insert(t.hostView);
            }
            deactivate() {
              if (this.activated) {
                const t = this.component;
                this.activated.destroy(),
                  (this.activated = null),
                  (this._activatedRoute = null),
                  this.deactivateEvents.emit(t);
              }
            }
            activateWith(t, e) {
              if (this.isActivated)
                throw new Error("Cannot activate an already activated outlet");
              this._activatedRoute = t;
              const n = (e = e || this.resolver).resolveComponentFactory(
                  t._futureSnapshot.routeConfig.component
                ),
                i = this.parentContexts.getOrCreateContext(this.name).children,
                s = new Km(t, i, this.location.injector);
              (this.activated = this.location.createComponent(
                n,
                this.location.length,
                s
              )),
                this.changeDetector.markForCheck(),
                this.activateEvents.emit(this.activated.instance);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(jr(Bm), jr(ha), jr(Mo), Vr("name"), jr(lr));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["router-outlet"]],
              outputs: {
                activateEvents: "activate",
                deactivateEvents: "deactivate",
              },
              exportAs: ["outlet"],
            })),
            t
          );
        })();
      class Km {
        constructor(t, e, n) {
          (this.route = t), (this.childContexts = e), (this.parent = n);
        }
        get(t, e) {
          return t === Rf
            ? this.route
            : t === Bm
            ? this.childContexts
            : this.parent.get(t, e);
        }
      }
      class Qm {}
      class Xm {
        preload(t, e) {
          return Ld(null);
        }
      }
      let Ym = (() => {
          class t {
            constructor(t, e, n, i, s) {
              (this.router = t),
                (this.injector = i),
                (this.preloadingStrategy = s),
                (this.loader = new $m(
                  e,
                  n,
                  (e) => t.triggerEvent(new $p(e)),
                  (e) => t.triggerEvent(new Hp(e))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Gd((t) => t instanceof Rp),
                  Tp(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const t = this.injector.get(Xt);
              return this.processRoutes(t, this.router.config);
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            processRoutes(t, e) {
              const n = [];
              for (const i of e)
                if (i.loadChildren && !i.canLoad && i._loadedConfig) {
                  const t = i._loadedConfig;
                  n.push(this.processRoutes(t.module, t.routes));
                } else
                  i.loadChildren && !i.canLoad
                    ? n.push(this.preloadConfig(t, i))
                    : i.children && n.push(this.processRoutes(t, i.children));
              return V(n).pipe(
                U(),
                F((t) => {})
              );
            }
            preloadConfig(t, e) {
              return this.preloadingStrategy.preload(e, () =>
                this.loader
                  .load(t.injector, e)
                  .pipe(
                    $(
                      (t) => (
                        (e._loadedConfig = t),
                        this.processRoutes(t.module, t.routes)
                      )
                    )
                  )
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Gm), Wt(zl), Wt(vl), Wt(kr), Wt(Qm));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Jm = (() => {
          class t {
            constructor(t, e, n = {}) {
              (this.router = t),
                (this.viewportScroller = e),
                (this.options = n),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (n.scrollPositionRestoration =
                  n.scrollPositionRestoration || "disabled"),
                (n.anchorScrolling = n.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof Pp
                  ? ((this.store[
                      this.lastId
                    ] = this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState
                      ? t.restoredState.navigationId
                      : 0))
                  : t instanceof Rp &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(
                      t,
                      this.router.parseUrl(t.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof Wp &&
                  (t.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(t, e) {
              this.router.triggerEvent(
                new Wp(
                  t,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  e
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Gm), Wt(Vc), Wt(void 0));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const tg = new Lt("ROUTER_CONFIGURATION"),
        eg = new Lt("ROUTER_FORROOT_GUARD"),
        ng = [
          mc,
          { provide: hf, useClass: uf },
          {
            provide: Gm,
            useFactory: function (t, e, n, i, s, r, o, a = {}, l, c) {
              const h = new Gm(null, t, e, n, i, s, r, Jp(o));
              if (
                (l && (h.urlHandlingStrategy = l),
                c && (h.routeReuseStrategy = c),
                a.errorHandler && (h.errorHandler = a.errorHandler),
                a.malformedUriErrorHandler &&
                  (h.malformedUriErrorHandler = a.malformedUriErrorHandler),
                a.enableTracing)
              ) {
                const t = Jl();
                h.events.subscribe((e) => {
                  t.logGroup("Router Event: " + e.constructor.name),
                    t.log(e.toString()),
                    t.log(e),
                    t.logGroupEnd();
                });
              }
              return (
                a.onSameUrlNavigation &&
                  (h.onSameUrlNavigation = a.onSameUrlNavigation),
                a.paramsInheritanceStrategy &&
                  (h.paramsInheritanceStrategy = a.paramsInheritanceStrategy),
                a.urlUpdateStrategy &&
                  (h.urlUpdateStrategy = a.urlUpdateStrategy),
                a.relativeLinkResolution &&
                  (h.relativeLinkResolution = a.relativeLinkResolution),
                h
              );
            },
            deps: [
              hf,
              Bm,
              mc,
              kr,
              zl,
              vl,
              Vm,
              tg,
              [class {}, new nt()],
              [class {}, new nt()],
            ],
          },
          Bm,
          {
            provide: Rf,
            useFactory: function (t) {
              return t.routerState.root;
            },
            deps: [Gm],
          },
          { provide: zl, useClass: Gl },
          Ym,
          Xm,
          class {
            preload(t, e) {
              return e().pipe(ap(() => Ld(null)));
            }
          },
          { provide: tg, useValue: { enableTracing: !1 } },
        ];
      function ig() {
        return new Ml("Router", Gm);
      }
      let sg = (() => {
        class t {
          constructor(t, e) {}
          static forRoot(e, n) {
            return {
              ngModule: t,
              providers: [
                ng,
                lg(e),
                {
                  provide: eg,
                  useFactory: ag,
                  deps: [[Gm, new nt(), new st()]],
                },
                { provide: tg, useValue: n || {} },
                {
                  provide: hc,
                  useFactory: og,
                  deps: [ec, [new et(dc), new nt()], tg],
                },
                { provide: Jm, useFactory: rg, deps: [Gm, Vc, tg] },
                {
                  provide: Qm,
                  useExisting:
                    n && n.preloadingStrategy ? n.preloadingStrategy : Xm,
                },
                { provide: Ml, multi: !0, useFactory: ig },
                [
                  cg,
                  { provide: nl, multi: !0, useFactory: hg, deps: [cg] },
                  { provide: dg, useFactory: ug, deps: [cg] },
                  { provide: cl, multi: !0, useExisting: dg },
                ],
              ],
            };
          }
          static forChild(e) {
            return { ngModule: t, providers: [lg(e)] };
          }
        }
        return (
          (t.ɵmod = me({ type: t })),
          (t.ɵinj = ct({
            factory: function (e) {
              return new (e || t)(Wt(eg, 8), Wt(Gm, 8));
            },
          })),
          t
        );
      })();
      function rg(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new Jm(t, e, n);
      }
      function og(t, e, n = {}) {
        return n.useHash ? new fc(t, e) : new pc(t, e);
      }
      function ag(t) {
        if (t)
          throw new Error(
            "RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function lg(t) {
        return [
          { provide: Er, multi: !0, useValue: t },
          { provide: Vm, multi: !0, useValue: t },
        ];
      }
      let cg = (() => {
        class t {
          constructor(t) {
            (this.injector = t),
              (this.initNavigation = !1),
              (this.resultOfPreactivationDone = new C());
          }
          appInitializer() {
            return this.injector.get(ic, Promise.resolve(null)).then(() => {
              let t = null;
              const e = new Promise((e) => (t = e)),
                n = this.injector.get(Gm),
                i = this.injector.get(tg);
              if (this.isLegacyDisabled(i) || this.isLegacyEnabled(i)) t(!0);
              else if ("disabled" === i.initialNavigation)
                n.setUpLocationChangeListener(), t(!0);
              else {
                if ("enabled" !== i.initialNavigation)
                  throw new Error(
                    `Invalid initialNavigation options: '${i.initialNavigation}'`
                  );
                (n.hooks.afterPreactivation = () =>
                  this.initNavigation
                    ? Ld(null)
                    : ((this.initNavigation = !0),
                      t(!0),
                      this.resultOfPreactivationDone)),
                  n.initialNavigation();
              }
              return e;
            });
          }
          bootstrapListener(t) {
            const e = this.injector.get(tg),
              n = this.injector.get(Ym),
              i = this.injector.get(Jm),
              s = this.injector.get(Gm),
              r = this.injector.get(Bl);
            t === r.components[0] &&
              (this.isLegacyEnabled(e)
                ? s.initialNavigation()
                : this.isLegacyDisabled(e) && s.setUpLocationChangeListener(),
              n.setUpPreloading(),
              i.init(),
              s.resetRootComponentType(r.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          isLegacyEnabled(t) {
            return (
              "legacy_enabled" === t.initialNavigation ||
              !0 === t.initialNavigation ||
              void 0 === t.initialNavigation
            );
          }
          isLegacyDisabled(t) {
            return (
              "legacy_disabled" === t.initialNavigation ||
              !1 === t.initialNavigation
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(kr));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function hg(t) {
        return t.appInitializer.bind(t);
      }
      function ug(t) {
        return t.bootstrapListener.bind(t);
      }
      const dg = new Lt("Router Initializer"),
        pg = [];
      let fg = (() => {
        class t {}
        return (
          (t.ɵmod = me({ type: t })),
          (t.ɵinj = ct({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [[sg.forRoot(pg)], sg],
          })),
          t
        );
      })();
      class mg extends u {
        constructor(t, e) {
          super();
        }
        schedule(t, e = 0) {
          return this;
        }
      }
      class gg extends mg {
        constructor(t, e) {
          super(t, e),
            (this.scheduler = t),
            (this.work = e),
            (this.pending = !1);
        }
        schedule(t, e = 0) {
          if (this.closed) return this;
          this.state = t;
          const n = this.id,
            i = this.scheduler;
          return (
            null != n && (this.id = this.recycleAsyncId(i, n, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id = this.id || this.requestAsyncId(i, this.id, e)),
            this
          );
        }
        requestAsyncId(t, e, n = 0) {
          return setInterval(t.flush.bind(t, this), n);
        }
        recycleAsyncId(t, e, n = 0) {
          if (null !== n && this.delay === n && !1 === this.pending) return e;
          clearInterval(e);
        }
        execute(t, e) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const n = this._execute(t, e);
          if (n) return n;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(t, e) {
          let n = !1,
            i = void 0;
          try {
            this.work(t);
          } catch (s) {
            (n = !0), (i = (!!s && s) || new Error(s));
          }
          if (n) return this.unsubscribe(), i;
        }
        _unsubscribe() {
          const t = this.id,
            e = this.scheduler,
            n = e.actions,
            i = n.indexOf(this);
          (this.work = null),
            (this.state = null),
            (this.pending = !1),
            (this.scheduler = null),
            -1 !== i && n.splice(i, 1),
            null != t && (this.id = this.recycleAsyncId(e, t, null)),
            (this.delay = null);
        }
      }
      class _g extends gg {
        constructor(t, e) {
          super(t, e), (this.scheduler = t), (this.work = e);
        }
        schedule(t, e = 0) {
          return e > 0
            ? super.schedule(t, e)
            : ((this.delay = e),
              (this.state = t),
              this.scheduler.flush(this),
              this);
        }
        execute(t, e) {
          return e > 0 || this.closed
            ? super.execute(t, e)
            : this._execute(t, e);
        }
        requestAsyncId(t, e, n = 0) {
          return (null !== n && n > 0) || (null === n && this.delay > 0)
            ? super.requestAsyncId(t, e, n)
            : t.flush(this);
        }
      }
      let yg = (() => {
        class t {
          constructor(e, n = t.now) {
            (this.SchedulerAction = e), (this.now = n);
          }
          schedule(t, e = 0, n) {
            return new this.SchedulerAction(this, t).schedule(n, e);
          }
        }
        return (t.now = () => Date.now()), t;
      })();
      class bg extends yg {
        constructor(t, e = yg.now) {
          super(t, () =>
            bg.delegate && bg.delegate !== this ? bg.delegate.now() : e()
          ),
            (this.actions = []),
            (this.active = !1),
            (this.scheduled = void 0);
        }
        schedule(t, e = 0, n) {
          return bg.delegate && bg.delegate !== this
            ? bg.delegate.schedule(t, e, n)
            : super.schedule(t, e, n);
        }
        flush(t) {
          const { actions: e } = this;
          if (this.active) return void e.push(t);
          let n;
          this.active = !0;
          do {
            if ((n = t.execute(t.state, t.delay))) break;
          } while ((t = e.shift()));
          if (((this.active = !1), n)) {
            for (; (t = e.shift()); ) t.unsubscribe();
            throw n;
          }
        }
      }
      class vg extends bg {}
      const wg = new vg(_g);
      let xg = (() => {
        class t {
          constructor(t, e, n) {
            (this.kind = t),
              (this.value = e),
              (this.error = n),
              (this.hasValue = "N" === t);
          }
          observe(t) {
            switch (this.kind) {
              case "N":
                return t.next && t.next(this.value);
              case "E":
                return t.error && t.error(this.error);
              case "C":
                return t.complete && t.complete();
            }
          }
          do(t, e, n) {
            switch (this.kind) {
              case "N":
                return t && t(this.value);
              case "E":
                return e && e(this.error);
              case "C":
                return n && n();
            }
          }
          accept(t, e, n) {
            return t && "function" == typeof t.next
              ? this.observe(t)
              : this.do(t, e, n);
          }
          toObservable() {
            switch (this.kind) {
              case "N":
                return Ld(this.value);
              case "E":
                return (t = this.error), new y((e) => e.error(t));
              case "C":
                return zd();
            }
            var t;
            throw new Error("unexpected notification kind value");
          }
          static createNext(e) {
            return void 0 !== e ? new t("N", e) : t.undefinedValueNotification;
          }
          static createError(e) {
            return new t("E", void 0, e);
          }
          static createComplete() {
            return t.completeNotification;
          }
        }
        return (
          (t.completeNotification = new t("C")),
          (t.undefinedValueNotification = new t("N", void 0)),
          t
        );
      })();
      class Cg extends f {
        constructor(t, e, n = 0) {
          super(t), (this.scheduler = e), (this.delay = n);
        }
        static dispatch(t) {
          const { notification: e, destination: n } = t;
          e.observe(n), this.unsubscribe();
        }
        scheduleMessage(t) {
          this.destination.add(
            this.scheduler.schedule(
              Cg.dispatch,
              this.delay,
              new Sg(t, this.destination)
            )
          );
        }
        _next(t) {
          this.scheduleMessage(xg.createNext(t));
        }
        _error(t) {
          this.scheduleMessage(xg.createError(t)), this.unsubscribe();
        }
        _complete() {
          this.scheduleMessage(xg.createComplete()), this.unsubscribe();
        }
      }
      class Sg {
        constructor(t, e) {
          (this.notification = t), (this.destination = e);
        }
      }
      class kg extends C {
        constructor(
          t = Number.POSITIVE_INFINITY,
          e = Number.POSITIVE_INFINITY,
          n
        ) {
          super(),
            (this.scheduler = n),
            (this._events = []),
            (this._infiniteTimeWindow = !1),
            (this._bufferSize = t < 1 ? 1 : t),
            (this._windowTime = e < 1 ? 1 : e),
            e === Number.POSITIVE_INFINITY
              ? ((this._infiniteTimeWindow = !0),
                (this.next = this.nextInfiniteTimeWindow))
              : (this.next = this.nextTimeWindow);
        }
        nextInfiniteTimeWindow(t) {
          const e = this._events;
          e.push(t), e.length > this._bufferSize && e.shift(), super.next(t);
        }
        nextTimeWindow(t) {
          this._events.push(new Eg(this._getNow(), t)),
            this._trimBufferThenGetEvents(),
            super.next(t);
        }
        _subscribe(t) {
          const e = this._infiniteTimeWindow,
            n = e ? this._events : this._trimBufferThenGetEvents(),
            i = this.scheduler,
            s = n.length;
          let r;
          if (this.closed) throw new v();
          if (
            (this.isStopped || this.hasError
              ? (r = u.EMPTY)
              : (this.observers.push(t), (r = new w(this, t))),
            i && t.add((t = new Cg(t, i))),
            e)
          )
            for (let o = 0; o < s && !t.closed; o++) t.next(n[o]);
          else for (let o = 0; o < s && !t.closed; o++) t.next(n[o].value);
          return (
            this.hasError
              ? t.error(this.thrownError)
              : this.isStopped && t.complete(),
            r
          );
        }
        _getNow() {
          return (this.scheduler || wg).now();
        }
        _trimBufferThenGetEvents() {
          const t = this._getNow(),
            e = this._bufferSize,
            n = this._windowTime,
            i = this._events,
            s = i.length;
          let r = 0;
          for (; r < s && !(t - i[r].time < n); ) r++;
          return s > e && (r = Math.max(r, s - e)), r > 0 && i.splice(0, r), i;
        }
      }
      class Eg {
        constructor(t, e) {
          (this.time = t), (this.value = e);
        }
      }
      function Tg(t, e, n) {
        let i;
        return (
          (i =
            t && "object" == typeof t
              ? t
              : { bufferSize: t, windowTime: e, refCount: !1, scheduler: n }),
          (t) =>
            t.lift(
              (function ({
                bufferSize: t = Number.POSITIVE_INFINITY,
                windowTime: e = Number.POSITIVE_INFINITY,
                refCount: n,
                scheduler: i,
              }) {
                let s,
                  r,
                  o = 0,
                  a = !1,
                  l = !1;
                return function (c) {
                  o++,
                    (s && !a) ||
                      ((a = !1),
                      (s = new kg(t, e, i)),
                      (r = c.subscribe({
                        next(t) {
                          s.next(t);
                        },
                        error(t) {
                          (a = !0), s.error(t);
                        },
                        complete() {
                          (l = !0), (r = void 0), s.complete();
                        },
                      })));
                  const h = s.subscribe(this);
                  this.add(() => {
                    o--,
                      h.unsubscribe(),
                      r &&
                        !l &&
                        n &&
                        0 === o &&
                        (r.unsubscribe(), (r = void 0), (s = void 0));
                  });
                };
              })(i)
            )
        );
      }
      class Ag {}
      class Og {}
      class Ig {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((t) => {
                            const e = t.indexOf(":");
                            if (e > 0) {
                              const n = t.slice(0, e),
                                i = n.toLowerCase(),
                                s = t.slice(e + 1).trim();
                              this.maybeSetNormalizedName(n, i),
                                this.headers.has(i)
                                  ? this.headers.get(i).push(s)
                                  : this.headers.set(i, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((e) => {
                            let n = t[e];
                            const i = e.toLowerCase();
                            "string" == typeof n && (n = [n]),
                              n.length > 0 &&
                                (this.headers.set(i, n),
                                this.maybeSetNormalizedName(e, i));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const e = this.headers.get(t.toLowerCase());
          return e && e.length > 0 ? e[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: "d" });
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Ig
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((e) => {
              this.headers.set(e, t.headers.get(e)),
                this.normalizedNames.set(e, t.normalizedNames.get(e));
            });
        }
        clone(t) {
          const e = new Ig();
          return (
            (e.lazyInit =
              this.lazyInit && this.lazyInit instanceof Ig
                ? this.lazyInit
                : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          );
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let n = t.value;
              if (("string" == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(t.name, e);
              const i = ("a" === t.op ? this.headers.get(e) : void 0) || [];
              i.push(...n), this.headers.set(e, i);
              break;
            case "d":
              const s = t.value;
              if (s) {
                let t = this.headers.get(e);
                if (!t) return;
                (t = t.filter((t) => -1 === s.indexOf(t))),
                  0 === t.length
                    ? (this.headers.delete(e), this.normalizedNames.delete(e))
                    : this.headers.set(e, t);
              } else this.headers.delete(e), this.normalizedNames.delete(e);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((e) =>
              t(this.normalizedNames.get(e), this.headers.get(e))
            );
        }
      }
      class Pg {
        encodeKey(t) {
          return Rg(t);
        }
        encodeValue(t) {
          return Rg(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      function Rg(t) {
        return encodeURIComponent(t)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/gi, "$")
          .replace(/%2C/gi, ",")
          .replace(/%3B/gi, ";")
          .replace(/%2B/gi, "+")
          .replace(/%3D/gi, "=")
          .replace(/%3F/gi, "?")
          .replace(/%2F/gi, "/");
      }
      class Dg {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new Pg()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function (t, e) {
              const n = new Map();
              return (
                t.length > 0 &&
                  t.split("&").forEach((t) => {
                    const i = t.indexOf("="),
                      [s, r] =
                        -1 == i
                          ? [e.decodeKey(t), ""]
                          : [
                              e.decodeKey(t.slice(0, i)),
                              e.decodeValue(t.slice(i + 1)),
                            ],
                      o = n.get(s) || [];
                    o.push(r), n.set(s, o);
                  }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((e) => {
                  const n = t.fromObject[e];
                  this.map.set(e, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const e = this.map.get(t);
          return e ? e[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const e = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((t) => e + "=" + this.encoder.encodeValue(t))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const e = new Dg({ encoder: this.encoder });
          return (
            (e.cloneFrom = this.cloneFrom || this),
            (e.updates = (this.updates || []).concat([t])),
            e
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const e =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    e.push(t.value), this.map.set(t.param, e);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let e = this.map.get(t.param) || [];
                      const n = e.indexOf(t.value);
                      -1 !== n && e.splice(n, 1),
                        e.length > 0
                          ? this.map.set(t.param, e)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      function Ng(t) {
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer;
      }
      function Fg(t) {
        return "undefined" != typeof Blob && t instanceof Blob;
      }
      function Lg(t) {
        return "undefined" != typeof FormData && t instanceof FormData;
      }
      class Mg {
        constructor(t, e, n, i) {
          let s;
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function (t) {
              switch (t) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || i
              ? ((this.body = void 0 !== n ? n : null), (s = i))
              : (s = n),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new Ig()),
            this.params)
          ) {
            const t = this.params.toString();
            if (0 === t.length) this.urlWithParams = e;
            else {
              const n = e.indexOf("?");
              this.urlWithParams =
                e + (-1 === n ? "?" : n < e.length - 1 ? "&" : "") + t;
            }
          } else (this.params = new Dg()), (this.urlWithParams = e);
        }
        serializeBody() {
          return null === this.body
            ? null
            : Ng(this.body) ||
              Fg(this.body) ||
              Lg(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Dg
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Lg(this.body)
            ? null
            : Fg(this.body)
            ? this.body.type || null
            : Ng(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Dg
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              Array.isArray(this.body)
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const e = t.method || this.method,
            n = t.url || this.url,
            i = t.responseType || this.responseType,
            s = void 0 !== t.body ? t.body : this.body,
            r =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            o =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let a = t.headers || this.headers,
            l = t.params || this.params;
          return (
            void 0 !== t.setHeaders &&
              (a = Object.keys(t.setHeaders).reduce(
                (e, n) => e.set(n, t.setHeaders[n]),
                a
              )),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce(
                (e, n) => e.set(n, t.setParams[n]),
                l
              )),
            new Mg(e, n, s, {
              params: l,
              headers: a,
              reportProgress: o,
              responseType: i,
              withCredentials: r,
            })
          );
        }
      }
      var jg = (function (t) {
        return (
          (t[(t.Sent = 0)] = "Sent"),
          (t[(t.UploadProgress = 1)] = "UploadProgress"),
          (t[(t.ResponseHeader = 2)] = "ResponseHeader"),
          (t[(t.DownloadProgress = 3)] = "DownloadProgress"),
          (t[(t.Response = 4)] = "Response"),
          (t[(t.User = 5)] = "User"),
          t
        );
      })({});
      class Vg {
        constructor(t, e = 200, n = "OK") {
          (this.headers = t.headers || new Ig()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || n),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class $g extends Vg {
        constructor(t = {}) {
          super(t), (this.type = jg.ResponseHeader);
        }
        clone(t = {}) {
          return new $g({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Hg extends Vg {
        constructor(t = {}) {
          super(t),
            (this.type = jg.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new Hg({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Bg extends Vg {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? "Http failure during parsing for " +
                  (t.url || "(unknown url)")
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function Ug(t, e) {
        return {
          body: e,
          headers: t.headers,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
        };
      }
      let zg = (() => {
        class t {
          constructor(t) {
            this.handler = t;
          }
          request(t, e, n = {}) {
            let i;
            if (t instanceof Mg) i = t;
            else {
              let s = void 0;
              s = n.headers instanceof Ig ? n.headers : new Ig(n.headers);
              let r = void 0;
              n.params &&
                (r =
                  n.params instanceof Dg
                    ? n.params
                    : new Dg({ fromObject: n.params })),
                (i = new Mg(t, e, void 0 !== n.body ? n.body : null, {
                  headers: s,
                  params: r,
                  reportProgress: n.reportProgress,
                  responseType: n.responseType || "json",
                  withCredentials: n.withCredentials,
                }));
            }
            const s = Ld(i).pipe(Tp((t) => this.handler.handle(t)));
            if (t instanceof Mg || "events" === n.observe) return s;
            const r = s.pipe(Gd((t) => t instanceof Hg));
            switch (n.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return r.pipe(
                      F((t) => {
                        if (null !== t.body && !(t.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return t.body;
                      })
                    );
                  case "blob":
                    return r.pipe(
                      F((t) => {
                        if (null !== t.body && !(t.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return t.body;
                      })
                    );
                  case "text":
                    return r.pipe(
                      F((t) => {
                        if (null !== t.body && "string" != typeof t.body)
                          throw new Error("Response is not a string.");
                        return t.body;
                      })
                    );
                  case "json":
                  default:
                    return r.pipe(F((t) => t.body));
                }
              case "response":
                return r;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${n.observe}}`
                );
            }
          }
          delete(t, e = {}) {
            return this.request("DELETE", t, e);
          }
          get(t, e = {}) {
            return this.request("GET", t, e);
          }
          head(t, e = {}) {
            return this.request("HEAD", t, e);
          }
          jsonp(t, e) {
            return this.request("JSONP", t, {
              params: new Dg().append(e, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(t, e = {}) {
            return this.request("OPTIONS", t, e);
          }
          patch(t, e, n = {}) {
            return this.request("PATCH", t, Ug(n, e));
          }
          post(t, e, n = {}) {
            return this.request("POST", t, Ug(n, e));
          }
          put(t, e, n = {}) {
            return this.request("PUT", t, Ug(n, e));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(Ag));
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class qg {
        constructor(t, e) {
          (this.next = t), (this.interceptor = e);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const Wg = new Lt("HTTP_INTERCEPTORS");
      let Gg = (() => {
        class t {
          intercept(t, e) {
            return e.handle(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Zg = /^\)\]\}',?\n/;
      class Kg {}
      let Qg = (() => {
          class t {
            constructor() {}
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Xg = (() => {
          class t {
            constructor(t) {
              this.xhrFactory = t;
            }
            handle(t) {
              if ("JSONP" === t.method)
                throw new Error(
                  "Attempted to construct Jsonp request without JsonpClientModule installed."
                );
              return new y((e) => {
                const n = this.xhrFactory.build();
                if (
                  (n.open(t.method, t.urlWithParams),
                  t.withCredentials && (n.withCredentials = !0),
                  t.headers.forEach((t, e) =>
                    n.setRequestHeader(t, e.join(","))
                  ),
                  t.headers.has("Accept") ||
                    n.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*"
                    ),
                  !t.headers.has("Content-Type"))
                ) {
                  const e = t.detectContentTypeHeader();
                  null !== e && n.setRequestHeader("Content-Type", e);
                }
                if (t.responseType) {
                  const e = t.responseType.toLowerCase();
                  n.responseType = "json" !== e ? e : "text";
                }
                const i = t.serializeBody();
                let s = null;
                const r = () => {
                    if (null !== s) return s;
                    const e = 1223 === n.status ? 204 : n.status,
                      i = n.statusText || "OK",
                      r = new Ig(n.getAllResponseHeaders()),
                      o =
                        (function (t) {
                          return "responseURL" in t && t.responseURL
                            ? t.responseURL
                            : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
                            ? t.getResponseHeader("X-Request-URL")
                            : null;
                        })(n) || t.url;
                    return (
                      (s = new $g({
                        headers: r,
                        status: e,
                        statusText: i,
                        url: o,
                      })),
                      s
                    );
                  },
                  o = () => {
                    let { headers: i, status: s, statusText: o, url: a } = r(),
                      l = null;
                    204 !== s &&
                      (l = void 0 === n.response ? n.responseText : n.response),
                      0 === s && (s = l ? 200 : 0);
                    let c = s >= 200 && s < 300;
                    if ("json" === t.responseType && "string" == typeof l) {
                      const t = l;
                      l = l.replace(Zg, "");
                      try {
                        l = "" !== l ? JSON.parse(l) : null;
                      } catch (h) {
                        (l = t), c && ((c = !1), (l = { error: h, text: l }));
                      }
                    }
                    c
                      ? (e.next(
                          new Hg({
                            body: l,
                            headers: i,
                            status: s,
                            statusText: o,
                            url: a || void 0,
                          })
                        ),
                        e.complete())
                      : e.error(
                          new Bg({
                            error: l,
                            headers: i,
                            status: s,
                            statusText: o,
                            url: a || void 0,
                          })
                        );
                  },
                  a = (t) => {
                    const { url: i } = r(),
                      s = new Bg({
                        error: t,
                        status: n.status || 0,
                        statusText: n.statusText || "Unknown Error",
                        url: i || void 0,
                      });
                    e.error(s);
                  };
                let l = !1;
                const c = (i) => {
                    l || (e.next(r()), (l = !0));
                    let s = { type: jg.DownloadProgress, loaded: i.loaded };
                    i.lengthComputable && (s.total = i.total),
                      "text" === t.responseType &&
                        n.responseText &&
                        (s.partialText = n.responseText),
                      e.next(s);
                  },
                  h = (t) => {
                    let n = { type: jg.UploadProgress, loaded: t.loaded };
                    t.lengthComputable && (n.total = t.total), e.next(n);
                  };
                return (
                  n.addEventListener("load", o),
                  n.addEventListener("error", a),
                  t.reportProgress &&
                    (n.addEventListener("progress", c),
                    null !== i &&
                      n.upload &&
                      n.upload.addEventListener("progress", h)),
                  n.send(i),
                  e.next({ type: jg.Sent }),
                  () => {
                    n.removeEventListener("error", a),
                      n.removeEventListener("load", o),
                      t.reportProgress &&
                        (n.removeEventListener("progress", c),
                        null !== i &&
                          n.upload &&
                          n.upload.removeEventListener("progress", h)),
                      n.readyState !== n.DONE && n.abort();
                  }
                );
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Kg));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Yg = new Lt("XSRF_COOKIE_NAME"),
        Jg = new Lt("XSRF_HEADER_NAME");
      class t_ {}
      let e_ = (() => {
          class t {
            constructor(t, e, n) {
              (this.doc = t),
                (this.platform = e),
                (this.cookieName = n),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const t = this.doc.cookie || "";
              return (
                t !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = wc(t, this.cookieName)),
                  (this.lastCookieString = t)),
                this.lastToken
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(tc), Wt(ll), Wt(Yg));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        n_ = (() => {
          class t {
            constructor(t, e) {
              (this.tokenService = t), (this.headerName = e);
            }
            intercept(t, e) {
              const n = t.url.toLowerCase();
              if (
                "GET" === t.method ||
                "HEAD" === t.method ||
                n.startsWith("http://") ||
                n.startsWith("https://")
              )
                return e.handle(t);
              const i = this.tokenService.getToken();
              return (
                null === i ||
                  t.headers.has(this.headerName) ||
                  (t = t.clone({ headers: t.headers.set(this.headerName, i) })),
                e.handle(t)
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(t_), Wt(Jg));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        i_ = (() => {
          class t {
            constructor(t, e) {
              (this.backend = t), (this.injector = e), (this.chain = null);
            }
            handle(t) {
              if (null === this.chain) {
                const t = this.injector.get(Wg, []);
                this.chain = t.reduceRight(
                  (t, e) => new qg(t, e),
                  this.backend
                );
              }
              return this.chain.handle(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Og), Wt(kr));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        s_ = (() => {
          class t {
            static disable() {
              return {
                ngModule: t,
                providers: [{ provide: n_, useClass: Gg }],
              };
            }
            static withOptions(e = {}) {
              return {
                ngModule: t,
                providers: [
                  e.cookieName ? { provide: Yg, useValue: e.cookieName } : [],
                  e.headerName ? { provide: Jg, useValue: e.headerName } : [],
                ],
              };
            }
          }
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [
                n_,
                { provide: Wg, useExisting: n_, multi: !0 },
                { provide: t_, useClass: e_ },
                { provide: Yg, useValue: "XSRF-TOKEN" },
                { provide: Jg, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            t
          );
        })(),
        r_ = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [
                zg,
                { provide: Ag, useClass: i_ },
                Xg,
                { provide: Og, useExisting: Xg },
                Qg,
                { provide: Kg, useExisting: Qg },
              ],
              imports: [
                [
                  s_.withOptions({
                    cookieName: "XSRF-TOKEN",
                    headerName: "X-XSRF-TOKEN",
                  }),
                ],
              ],
            })),
            t
          );
        })(),
        o_ = (() => {
          class t {
            constructor(t) {
              (this.http = t),
                (this.getAllTypes$ = this.http
                  .get("https://temtem-api.mael.tech/api/types")
                  .pipe(Tg(1)));
            }
            getAllTemtems() {
              return this.http.get(
                "https://temtem-api.mael.tech/api/temtems?fields=" +
                  ["name", "types", "number", "icon", "lumaIcon"].join() +
                  "&expand=types"
              );
            }
            getTemtem(t) {
              return this.http.get(
                "https://temtem-api.mael.tech/api/temtems/" +
                  t +
                  "?expand=traits,types"
              );
            }
            calcTypeWeaknesses(t, e) {
              const n = t,
                i = e.join();
              return this.http.get(
                "https://temtem-api.mael.tech/api/weaknesses/calculate?attacking=" +
                  n +
                  "&defending=" +
                  i
              );
            }
            getTemtemByNames(t) {
              return this.http.get(
                "https://temtem-api.mael.tech/api/temtems?expand=types&fields=" +
                  ["name", "types", "number", "icon", "evolution"].join() +
                  "&names=" +
                  t.join()
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(zg));
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac, providedIn: "root" })),
            t
          );
        })();
      function a_(t) {
        return null != t && "" + t != "false";
      }
      function l_(t, e = 0) {
        return (function (t) {
          return !isNaN(parseFloat(t)) && !isNaN(Number(t));
        })(t)
          ? Number(t)
          : e;
      }
      function c_(t) {
        return Array.isArray(t) ? t : [t];
      }
      function h_(t) {
        return null == t ? "" : "string" == typeof t ? t : t + "px";
      }
      function u_(t) {
        return t instanceof jo ? t.nativeElement : t;
      }
      let d_ = (() => {
          class t {
            constructor() {
              this._listeners = [];
            }
            notify(t, e) {
              for (let n of this._listeners) n(t, e);
            }
            listen(t) {
              return (
                this._listeners.push(t),
                () => {
                  this._listeners = this._listeners.filter((e) => t !== e);
                }
              );
            }
            ngOnDestroy() {
              this._listeners = [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = lt({
              factory: function () {
                return new t();
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        p_ = 0;
      const f_ = new Lt("CdkAccordion");
      let m_ = (() => {
          class t {
            constructor() {
              (this._stateChanges = new C()),
                (this._openCloseAllActions = new C()),
                (this.id = "cdk-accordion-" + p_++),
                (this._multi = !1);
            }
            get multi() {
              return this._multi;
            }
            set multi(t) {
              this._multi = a_(t);
            }
            openAll() {
              this._openCloseAll(!0);
            }
            closeAll() {
              this._openCloseAll(!1);
            }
            ngOnChanges(t) {
              this._stateChanges.next(t);
            }
            ngOnDestroy() {
              this._stateChanges.complete();
            }
            _openCloseAll(t) {
              this.multi && this._openCloseAllActions.next(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["cdk-accordion"], ["", "cdkAccordion", ""]],
              inputs: { multi: "multi" },
              exportAs: ["cdkAccordion"],
              features: [No([{ provide: f_, useExisting: t }]), Ie],
            })),
            t
          );
        })(),
        g_ = 0,
        __ = (() => {
          class t {
            constructor(t, e, n) {
              (this.accordion = t),
                (this._changeDetectorRef = e),
                (this._expansionDispatcher = n),
                (this._openCloseAllSubscription = u.EMPTY),
                (this.closed = new Na()),
                (this.opened = new Na()),
                (this.destroyed = new Na()),
                (this.expandedChange = new Na()),
                (this.id = "cdk-accordion-child-" + g_++),
                (this._expanded = !1),
                (this._disabled = !1),
                (this._removeUniqueSelectionListener = () => {}),
                (this._removeUniqueSelectionListener = n.listen((t, e) => {
                  this.accordion &&
                    !this.accordion.multi &&
                    this.accordion.id === e &&
                    this.id !== t &&
                    (this.expanded = !1);
                })),
                this.accordion &&
                  (this._openCloseAllSubscription = this._subscribeToOpenCloseAllActions());
            }
            get expanded() {
              return this._expanded;
            }
            set expanded(t) {
              (t = a_(t)),
                this._expanded !== t &&
                  ((this._expanded = t),
                  this.expandedChange.emit(t),
                  t
                    ? (this.opened.emit(),
                      this._expansionDispatcher.notify(
                        this.id,
                        this.accordion ? this.accordion.id : this.id
                      ))
                    : this.closed.emit(),
                  this._changeDetectorRef.markForCheck());
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              this._disabled = a_(t);
            }
            ngOnDestroy() {
              this.opened.complete(),
                this.closed.complete(),
                this.destroyed.emit(),
                this.destroyed.complete(),
                this._removeUniqueSelectionListener(),
                this._openCloseAllSubscription.unsubscribe();
            }
            toggle() {
              this.disabled || (this.expanded = !this.expanded);
            }
            close() {
              this.disabled || (this.expanded = !1);
            }
            open() {
              this.disabled || (this.expanded = !0);
            }
            _subscribeToOpenCloseAllActions() {
              return this.accordion._openCloseAllActions.subscribe((t) => {
                this.disabled || (this.expanded = t);
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(jr(f_, 12), jr(lr), jr(d_));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["cdk-accordion-item"], ["", "cdkAccordionItem", ""]],
              inputs: { expanded: "expanded", disabled: "disabled" },
              outputs: {
                closed: "closed",
                opened: "opened",
                destroyed: "destroyed",
                expandedChange: "expandedChange",
              },
              exportAs: ["cdkAccordionItem"],
              features: [No([{ provide: f_, useValue: void 0 }])],
            })),
            t
          );
        })(),
        y_ = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })();
      function b_() {
        throw Error("Host already has a portal attached");
      }
      class v_ {
        attach(t) {
          return (
            null == t &&
              (function () {
                throw Error(
                  "Attempting to attach a portal to a null PortalOutlet"
                );
              })(),
            t.hasAttached() && b_(),
            (this._attachedHost = t),
            t.attach(this)
          );
        }
        detach() {
          let t = this._attachedHost;
          null == t
            ? (function () {
                throw Error(
                  "Attempting to detach a portal that is not attached to a host"
                );
              })()
            : ((this._attachedHost = null), t.detach());
        }
        get isAttached() {
          return null != this._attachedHost;
        }
        setAttachedHost(t) {
          this._attachedHost = t;
        }
      }
      class w_ extends v_ {
        constructor(t, e, n, i) {
          super(),
            (this.component = t),
            (this.viewContainerRef = e),
            (this.injector = n),
            (this.componentFactoryResolver = i);
        }
      }
      class x_ extends v_ {
        constructor(t, e, n) {
          super(),
            (this.templateRef = t),
            (this.viewContainerRef = e),
            (this.context = n);
        }
        get origin() {
          return this.templateRef.elementRef;
        }
        attach(t, e = this.context) {
          return (this.context = e), super.attach(t);
        }
        detach() {
          return (this.context = void 0), super.detach();
        }
      }
      class C_ extends v_ {
        constructor(t) {
          super(), (this.element = t instanceof jo ? t.nativeElement : t);
        }
      }
      class S_ {
        constructor() {
          (this._isDisposed = !1), (this.attachDomPortal = null);
        }
        hasAttached() {
          return !!this._attachedPortal;
        }
        attach(t) {
          return (
            t ||
              (function () {
                throw Error("Must provide a portal to attach");
              })(),
            this.hasAttached() && b_(),
            this._isDisposed &&
              (function () {
                throw Error("This PortalOutlet has already been disposed");
              })(),
            t instanceof w_
              ? ((this._attachedPortal = t), this.attachComponentPortal(t))
              : t instanceof x_
              ? ((this._attachedPortal = t), this.attachTemplatePortal(t))
              : this.attachDomPortal && t instanceof C_
              ? ((this._attachedPortal = t), this.attachDomPortal(t))
              : void (function () {
                  throw Error(
                    "Attempting to attach an unknown Portal type. BasePortalOutlet accepts either a ComponentPortal or a TemplatePortal."
                  );
                })()
          );
        }
        detach() {
          this._attachedPortal &&
            (this._attachedPortal.setAttachedHost(null),
            (this._attachedPortal = null)),
            this._invokeDisposeFn();
        }
        dispose() {
          this.hasAttached() && this.detach(),
            this._invokeDisposeFn(),
            (this._isDisposed = !0);
        }
        setDisposeFn(t) {
          this._disposeFn = t;
        }
        _invokeDisposeFn() {
          this._disposeFn && (this._disposeFn(), (this._disposeFn = null));
        }
      }
      class k_ extends S_ {
        constructor(t, e, n, i, s) {
          super(),
            (this.outletElement = t),
            (this._componentFactoryResolver = e),
            (this._appRef = n),
            (this._defaultInjector = i),
            (this.attachDomPortal = (t) => {
              if (!this._document)
                throw Error(
                  "Cannot attach DOM portal without _document constructor parameter"
                );
              const e = t.element;
              if (!e.parentNode)
                throw Error(
                  "DOM portal content must be attached to a parent node."
                );
              const n = this._document.createComment("dom-portal");
              e.parentNode.insertBefore(n, e),
                this.outletElement.appendChild(e),
                super.setDisposeFn(() => {
                  n.parentNode && n.parentNode.replaceChild(e, n);
                });
            }),
            (this._document = s);
        }
        attachComponentPortal(t) {
          const e = (
            t.componentFactoryResolver || this._componentFactoryResolver
          ).resolveComponentFactory(t.component);
          let n;
          return (
            t.viewContainerRef
              ? ((n = t.viewContainerRef.createComponent(
                  e,
                  t.viewContainerRef.length,
                  t.injector || t.viewContainerRef.injector
                )),
                this.setDisposeFn(() => n.destroy()))
              : ((n = e.create(t.injector || this._defaultInjector)),
                this._appRef.attachView(n.hostView),
                this.setDisposeFn(() => {
                  this._appRef.detachView(n.hostView), n.destroy();
                })),
            this.outletElement.appendChild(this._getComponentRootNode(n)),
            n
          );
        }
        attachTemplatePortal(t) {
          let e = t.viewContainerRef,
            n = e.createEmbeddedView(t.templateRef, t.context);
          return (
            n.detectChanges(),
            n.rootNodes.forEach((t) => this.outletElement.appendChild(t)),
            this.setDisposeFn(() => {
              let t = e.indexOf(n);
              -1 !== t && e.remove(t);
            }),
            n
          );
        }
        dispose() {
          super.dispose(),
            null != this.outletElement.parentNode &&
              this.outletElement.parentNode.removeChild(this.outletElement);
        }
        _getComponentRootNode(t) {
          return t.hostView.rootNodes[0];
        }
      }
      let E_,
        T_ = (() => {
          class t extends S_ {
            constructor(t, e, n) {
              super(),
                (this._componentFactoryResolver = t),
                (this._viewContainerRef = e),
                (this._isInitialized = !1),
                (this.attached = new Na()),
                (this.attachDomPortal = (t) => {
                  if (!this._document)
                    throw Error(
                      "Cannot attach DOM portal without _document constructor parameter"
                    );
                  const e = t.element;
                  if (!e.parentNode)
                    throw Error(
                      "DOM portal content must be attached to a parent node."
                    );
                  const n = this._document.createComment("dom-portal");
                  t.setAttachedHost(this),
                    e.parentNode.insertBefore(n, e),
                    this._getRootNode().appendChild(e),
                    super.setDisposeFn(() => {
                      n.parentNode && n.parentNode.replaceChild(e, n);
                    });
                }),
                (this._document = n);
            }
            get portal() {
              return this._attachedPortal;
            }
            set portal(t) {
              (!this.hasAttached() || t || this._isInitialized) &&
                (this.hasAttached() && super.detach(),
                t && super.attach(t),
                (this._attachedPortal = t));
            }
            get attachedRef() {
              return this._attachedRef;
            }
            ngOnInit() {
              this._isInitialized = !0;
            }
            ngOnDestroy() {
              super.dispose(),
                (this._attachedPortal = null),
                (this._attachedRef = null);
            }
            attachComponentPortal(t) {
              t.setAttachedHost(this);
              const e =
                  null != t.viewContainerRef
                    ? t.viewContainerRef
                    : this._viewContainerRef,
                n = (
                  t.componentFactoryResolver || this._componentFactoryResolver
                ).resolveComponentFactory(t.component),
                i = e.createComponent(n, e.length, t.injector || e.injector);
              return (
                e !== this._viewContainerRef &&
                  this._getRootNode().appendChild(i.hostView.rootNodes[0]),
                super.setDisposeFn(() => i.destroy()),
                (this._attachedPortal = t),
                (this._attachedRef = i),
                this.attached.emit(i),
                i
              );
            }
            attachTemplatePortal(t) {
              t.setAttachedHost(this);
              const e = this._viewContainerRef.createEmbeddedView(
                t.templateRef,
                t.context
              );
              return (
                super.setDisposeFn(() => this._viewContainerRef.clear()),
                (this._attachedPortal = t),
                (this._attachedRef = e),
                this.attached.emit(e),
                e
              );
            }
            _getRootNode() {
              const t = this._viewContainerRef.element.nativeElement;
              return t.nodeType === t.ELEMENT_NODE ? t : t.parentNode;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(jr(Mo), jr(ha), jr(tc));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["", "cdkPortalOutlet", ""]],
              inputs: { portal: ["cdkPortalOutlet", "portal"] },
              outputs: { attached: "attached" },
              exportAs: ["cdkPortalOutlet"],
              features: [xo],
            })),
            t
          );
        })(),
        A_ = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })();
      try {
        E_ = "undefined" != typeof Intl && Intl.v8BreakIterator;
      } catch (_x) {
        E_ = !1;
      }
      let O_,
        I_ = (() => {
          class t {
            constructor(t) {
              (this._platformId = t),
                (this.isBrowser = this._platformId
                  ? "browser" === this._platformId
                  : "object" == typeof document && !!document),
                (this.EDGE =
                  this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                  this.isBrowser &&
                  /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !E_) &&
                  "undefined" != typeof CSS &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !("MSStream" in window)),
                (this.FIREFOX =
                  this.isBrowser &&
                  /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser &&
                  /android/i.test(navigator.userAgent) &&
                  !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser &&
                  /safari/i.test(navigator.userAgent) &&
                  this.WEBKIT);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(ll));
            }),
            (t.ɵprov = lt({
              factory: function () {
                return new t(Wt(ll));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        P_ = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })();
      const R_ = [
        "color",
        "button",
        "checkbox",
        "date",
        "datetime-local",
        "email",
        "file",
        "hidden",
        "image",
        "month",
        "number",
        "password",
        "radio",
        "range",
        "reset",
        "search",
        "submit",
        "tel",
        "text",
        "time",
        "url",
        "week",
      ];
      function D_() {
        if (O_) return O_;
        if ("object" != typeof document || !document)
          return (O_ = new Set(R_)), O_;
        let t = document.createElement("input");
        return (
          (O_ = new Set(
            R_.filter((e) => (t.setAttribute("type", e), t.type === e))
          )),
          O_
        );
      }
      let N_, F_;
      function L_(t) {
        return (function () {
          if (null == N_ && "undefined" != typeof window)
            try {
              window.addEventListener(
                "test",
                null,
                Object.defineProperty({}, "passive", { get: () => (N_ = !0) })
              );
            } finally {
              N_ = N_ || !1;
            }
          return N_;
        })()
          ? t
          : !!t.capture;
      }
      function M_(t, ...e) {
        return e.length
          ? e.some((e) => t[e])
          : t.altKey || t.shiftKey || t.ctrlKey || t.metaKey;
      }
      const j_ = new bg(gg);
      function V_(t, e = j_) {
        return (n) => n.lift(new $_(t, e));
      }
      class $_ {
        constructor(t, e) {
          (this.dueTime = t), (this.scheduler = e);
        }
        call(t, e) {
          return e.subscribe(new H_(t, this.dueTime, this.scheduler));
        }
      }
      class H_ extends f {
        constructor(t, e, n) {
          super(t),
            (this.dueTime = e),
            (this.scheduler = n),
            (this.debouncedSubscription = null),
            (this.lastValue = null),
            (this.hasValue = !1);
        }
        _next(t) {
          this.clearDebounce(),
            (this.lastValue = t),
            (this.hasValue = !0),
            this.add(
              (this.debouncedSubscription = this.scheduler.schedule(
                B_,
                this.dueTime,
                this
              ))
            );
        }
        _complete() {
          this.debouncedNext(), this.destination.complete();
        }
        debouncedNext() {
          if ((this.clearDebounce(), this.hasValue)) {
            const { lastValue: t } = this;
            (this.lastValue = null),
              (this.hasValue = !1),
              this.destination.next(t);
          }
        }
        clearDebounce() {
          const t = this.debouncedSubscription;
          null !== t &&
            (this.remove(t),
            t.unsubscribe(),
            (this.debouncedSubscription = null));
        }
      }
      function B_(t) {
        t.debouncedNext();
      }
      let U_ = (() => {
          class t {
            create(t) {
              return "undefined" == typeof MutationObserver
                ? null
                : new MutationObserver(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = lt({
              factory: function () {
                return new t();
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        z_ = (() => {
          class t {
            constructor(t) {
              (this._mutationObserverFactory = t),
                (this._observedElements = new Map());
            }
            ngOnDestroy() {
              this._observedElements.forEach((t, e) =>
                this._cleanupObserver(e)
              );
            }
            observe(t) {
              const e = u_(t);
              return new y((t) => {
                const n = this._observeElement(e).subscribe(t);
                return () => {
                  n.unsubscribe(), this._unobserveElement(e);
                };
              });
            }
            _observeElement(t) {
              if (this._observedElements.has(t))
                this._observedElements.get(t).count++;
              else {
                const e = new C(),
                  n = this._mutationObserverFactory.create((t) => e.next(t));
                n &&
                  n.observe(t, {
                    characterData: !0,
                    childList: !0,
                    subtree: !0,
                  }),
                  this._observedElements.set(t, {
                    observer: n,
                    stream: e,
                    count: 1,
                  });
              }
              return this._observedElements.get(t).stream;
            }
            _unobserveElement(t) {
              this._observedElements.has(t) &&
                (this._observedElements.get(t).count--,
                this._observedElements.get(t).count ||
                  this._cleanupObserver(t));
            }
            _cleanupObserver(t) {
              if (this._observedElements.has(t)) {
                const { observer: e, stream: n } = this._observedElements.get(
                  t
                );
                e && e.disconnect(),
                  n.complete(),
                  this._observedElements.delete(t);
              }
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(U_));
            }),
            (t.ɵprov = lt({
              factory: function () {
                return new t(Wt(U_));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        q_ = (() => {
          class t {
            constructor(t, e, n) {
              (this._contentObserver = t),
                (this._elementRef = e),
                (this._ngZone = n),
                (this.event = new Na()),
                (this._disabled = !1),
                (this._currentSubscription = null);
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              (this._disabled = a_(t)),
                this._disabled ? this._unsubscribe() : this._subscribe();
            }
            get debounce() {
              return this._debounce;
            }
            set debounce(t) {
              (this._debounce = l_(t)), this._subscribe();
            }
            ngAfterContentInit() {
              this._currentSubscription || this.disabled || this._subscribe();
            }
            ngOnDestroy() {
              this._unsubscribe();
            }
            _subscribe() {
              this._unsubscribe();
              const t = this._contentObserver.observe(this._elementRef);
              this._ngZone.runOutsideAngular(() => {
                this._currentSubscription = (this.debounce
                  ? t.pipe(V_(this.debounce))
                  : t
                ).subscribe(this.event);
              });
            }
            _unsubscribe() {
              this._currentSubscription &&
                this._currentSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(jr(z_), jr(jo), jr(Cl));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["", "cdkObserveContent", ""]],
              inputs: {
                disabled: ["cdkObserveContentDisabled", "disabled"],
                debounce: "debounce",
              },
              outputs: { event: "cdkObserveContent" },
              exportAs: ["cdkObserveContent"],
            })),
            t
          );
        })(),
        W_ = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [U_],
            })),
            t
          );
        })();
      class G_ extends class {
        constructor(t) {
          (this._items = t),
            (this._activeItemIndex = -1),
            (this._activeItem = null),
            (this._wrap = !1),
            (this._letterKeyStream = new C()),
            (this._typeaheadSubscription = u.EMPTY),
            (this._vertical = !0),
            (this._allowedModifierKeys = []),
            (this._homeAndEnd = !1),
            (this._skipPredicateFn = (t) => t.disabled),
            (this._pressedLetters = []),
            (this.tabOut = new C()),
            (this.change = new C()),
            t instanceof La &&
              t.changes.subscribe((t) => {
                if (this._activeItem) {
                  const e = t.toArray().indexOf(this._activeItem);
                  e > -1 &&
                    e !== this._activeItemIndex &&
                    (this._activeItemIndex = e);
                }
              });
        }
        skipPredicate(t) {
          return (this._skipPredicateFn = t), this;
        }
        withWrap(t = !0) {
          return (this._wrap = t), this;
        }
        withVerticalOrientation(t = !0) {
          return (this._vertical = t), this;
        }
        withHorizontalOrientation(t) {
          return (this._horizontal = t), this;
        }
        withAllowedModifierKeys(t) {
          return (this._allowedModifierKeys = t), this;
        }
        withTypeAhead(t = 200) {
          if (
            this._items.length &&
            this._items.some((t) => "function" != typeof t.getLabel)
          )
            throw Error(
              "ListKeyManager items in typeahead mode must implement the `getLabel` method."
            );
          return (
            this._typeaheadSubscription.unsubscribe(),
            (this._typeaheadSubscription = this._letterKeyStream
              .pipe(
                mp((t) => this._pressedLetters.push(t)),
                V_(t),
                Gd(() => this._pressedLetters.length > 0),
                F(() => this._pressedLetters.join(""))
              )
              .subscribe((t) => {
                const e = this._getItemsArray();
                for (let n = 1; n < e.length + 1; n++) {
                  const i = (this._activeItemIndex + n) % e.length,
                    s = e[i];
                  if (
                    !this._skipPredicateFn(s) &&
                    0 === s.getLabel().toUpperCase().trim().indexOf(t)
                  ) {
                    this.setActiveItem(i);
                    break;
                  }
                }
                this._pressedLetters = [];
              })),
            this
          );
        }
        withHomeAndEnd() {
          return (this._homeAndEnd = !0), this;
        }
        setActiveItem(t) {
          const e = this._activeItem;
          this.updateActiveItem(t),
            this._activeItem !== e && this.change.next(this._activeItemIndex);
        }
        onKeydown(t) {
          const e = t.keyCode,
            n = ["altKey", "ctrlKey", "metaKey", "shiftKey"].every(
              (e) => !t[e] || this._allowedModifierKeys.indexOf(e) > -1
            );
          switch (e) {
            case 9:
              return void this.tabOut.next();
            case 40:
              if (this._vertical && n) {
                this.setNextItemActive();
                break;
              }
              return;
            case 38:
              if (this._vertical && n) {
                this.setPreviousItemActive();
                break;
              }
              return;
            case 39:
              if (this._horizontal && n) {
                "rtl" === this._horizontal
                  ? this.setPreviousItemActive()
                  : this.setNextItemActive();
                break;
              }
              return;
            case 37:
              if (this._horizontal && n) {
                "rtl" === this._horizontal
                  ? this.setNextItemActive()
                  : this.setPreviousItemActive();
                break;
              }
              return;
            case 36:
              if (this._homeAndEnd && n) {
                this.setFirstItemActive();
                break;
              }
              return;
            case 35:
              if (this._homeAndEnd && n) {
                this.setLastItemActive();
                break;
              }
              return;
            default:
              return void (
                (n || M_(t, "shiftKey")) &&
                (t.key && 1 === t.key.length
                  ? this._letterKeyStream.next(t.key.toLocaleUpperCase())
                  : ((e >= 65 && e <= 90) || (e >= 48 && e <= 57)) &&
                    this._letterKeyStream.next(String.fromCharCode(e)))
              );
          }
          (this._pressedLetters = []), t.preventDefault();
        }
        get activeItemIndex() {
          return this._activeItemIndex;
        }
        get activeItem() {
          return this._activeItem;
        }
        isTyping() {
          return this._pressedLetters.length > 0;
        }
        setFirstItemActive() {
          this._setActiveItemByIndex(0, 1);
        }
        setLastItemActive() {
          this._setActiveItemByIndex(this._items.length - 1, -1);
        }
        setNextItemActive() {
          this._activeItemIndex < 0
            ? this.setFirstItemActive()
            : this._setActiveItemByDelta(1);
        }
        setPreviousItemActive() {
          this._activeItemIndex < 0 && this._wrap
            ? this.setLastItemActive()
            : this._setActiveItemByDelta(-1);
        }
        updateActiveItem(t) {
          const e = this._getItemsArray(),
            n = "number" == typeof t ? t : e.indexOf(t),
            i = e[n];
          (this._activeItem = null == i ? null : i),
            (this._activeItemIndex = n);
        }
        _setActiveItemByDelta(t) {
          this._wrap
            ? this._setActiveInWrapMode(t)
            : this._setActiveInDefaultMode(t);
        }
        _setActiveInWrapMode(t) {
          const e = this._getItemsArray();
          for (let n = 1; n <= e.length; n++) {
            const i = (this._activeItemIndex + t * n + e.length) % e.length;
            if (!this._skipPredicateFn(e[i])) return void this.setActiveItem(i);
          }
        }
        _setActiveInDefaultMode(t) {
          this._setActiveItemByIndex(this._activeItemIndex + t, t);
        }
        _setActiveItemByIndex(t, e) {
          const n = this._getItemsArray();
          if (n[t]) {
            for (; this._skipPredicateFn(n[t]); ) if (!n[(t += e)]) return;
            this.setActiveItem(t);
          }
        }
        _getItemsArray() {
          return this._items instanceof La
            ? this._items.toArray()
            : this._items;
        }
      } {
        constructor() {
          super(...arguments), (this._origin = "program");
        }
        setFocusOrigin(t) {
          return (this._origin = t), this;
        }
        setActiveItem(t) {
          super.setActiveItem(t),
            this.activeItem && this.activeItem.focus(this._origin);
        }
      }
      let Z_ = (() => {
        class t {
          constructor(t) {
            this._platform = t;
          }
          isDisabled(t) {
            return t.hasAttribute("disabled");
          }
          isVisible(t) {
            return (
              (function (t) {
                return !!(
                  t.offsetWidth ||
                  t.offsetHeight ||
                  ("function" == typeof t.getClientRects &&
                    t.getClientRects().length)
                );
              })(t) && "visible" === getComputedStyle(t).visibility
            );
          }
          isTabbable(t) {
            if (!this._platform.isBrowser) return !1;
            const e = (function (t) {
              try {
                return t.frameElement;
              } catch (_x) {
                return null;
              }
            })(
              ((n = t).ownerDocument && n.ownerDocument.defaultView) || window
            );
            var n;
            if (e) {
              if (-1 === Q_(e)) return !1;
              if (!this.isVisible(e)) return !1;
            }
            let i = t.nodeName.toLowerCase(),
              s = Q_(t);
            return t.hasAttribute("contenteditable")
              ? -1 !== s
              : "iframe" !== i &&
                  "object" !== i &&
                  !(
                    this._platform.WEBKIT &&
                    this._platform.IOS &&
                    !(function (t) {
                      let e = t.nodeName.toLowerCase(),
                        n = "input" === e && t.type;
                      return (
                        "text" === n ||
                        "password" === n ||
                        "select" === e ||
                        "textarea" === e
                      );
                    })(t)
                  ) &&
                  ("audio" === i
                    ? !!t.hasAttribute("controls") && -1 !== s
                    : "video" === i
                    ? -1 !== s &&
                      (null !== s ||
                        this._platform.FIREFOX ||
                        t.hasAttribute("controls"))
                    : t.tabIndex >= 0);
          }
          isFocusable(t, e) {
            return (
              (function (t) {
                return (
                  !(function (t) {
                    return (
                      (function (t) {
                        return "input" == t.nodeName.toLowerCase();
                      })(t) && "hidden" == t.type
                    );
                  })(t) &&
                  ((function (t) {
                    let e = t.nodeName.toLowerCase();
                    return (
                      "input" === e ||
                      "select" === e ||
                      "button" === e ||
                      "textarea" === e
                    );
                  })(t) ||
                    (function (t) {
                      return (
                        (function (t) {
                          return "a" == t.nodeName.toLowerCase();
                        })(t) && t.hasAttribute("href")
                      );
                    })(t) ||
                    t.hasAttribute("contenteditable") ||
                    K_(t))
                );
              })(t) &&
              !this.isDisabled(t) &&
              ((null == e ? void 0 : e.ignoreVisibility) || this.isVisible(t))
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(I_));
          }),
          (t.ɵprov = lt({
            factory: function () {
              return new t(Wt(I_));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      function K_(t) {
        if (!t.hasAttribute("tabindex") || void 0 === t.tabIndex) return !1;
        let e = t.getAttribute("tabindex");
        return "-32768" != e && !(!e || isNaN(parseInt(e, 10)));
      }
      function Q_(t) {
        if (!K_(t)) return null;
        const e = parseInt(t.getAttribute("tabindex") || "", 10);
        return isNaN(e) ? -1 : e;
      }
      class X_ {
        constructor(t, e, n, i, s = !1) {
          (this._element = t),
            (this._checker = e),
            (this._ngZone = n),
            (this._document = i),
            (this._hasAttached = !1),
            (this.startAnchorListener = () => this.focusLastTabbableElement()),
            (this.endAnchorListener = () => this.focusFirstTabbableElement()),
            (this._enabled = !0),
            s || this.attachAnchors();
        }
        get enabled() {
          return this._enabled;
        }
        set enabled(t) {
          (this._enabled = t),
            this._startAnchor &&
              this._endAnchor &&
              (this._toggleAnchorTabIndex(t, this._startAnchor),
              this._toggleAnchorTabIndex(t, this._endAnchor));
        }
        destroy() {
          const t = this._startAnchor,
            e = this._endAnchor;
          t &&
            (t.removeEventListener("focus", this.startAnchorListener),
            t.parentNode && t.parentNode.removeChild(t)),
            e &&
              (e.removeEventListener("focus", this.endAnchorListener),
              e.parentNode && e.parentNode.removeChild(e)),
            (this._startAnchor = this._endAnchor = null),
            (this._hasAttached = !1);
        }
        attachAnchors() {
          return (
            !!this._hasAttached ||
            (this._ngZone.runOutsideAngular(() => {
              this._startAnchor ||
                ((this._startAnchor = this._createAnchor()),
                this._startAnchor.addEventListener(
                  "focus",
                  this.startAnchorListener
                )),
                this._endAnchor ||
                  ((this._endAnchor = this._createAnchor()),
                  this._endAnchor.addEventListener(
                    "focus",
                    this.endAnchorListener
                  ));
            }),
            this._element.parentNode &&
              (this._element.parentNode.insertBefore(
                this._startAnchor,
                this._element
              ),
              this._element.parentNode.insertBefore(
                this._endAnchor,
                this._element.nextSibling
              ),
              (this._hasAttached = !0)),
            this._hasAttached)
          );
        }
        focusInitialElementWhenReady() {
          return new Promise((t) => {
            this._executeOnStable(() => t(this.focusInitialElement()));
          });
        }
        focusFirstTabbableElementWhenReady() {
          return new Promise((t) => {
            this._executeOnStable(() => t(this.focusFirstTabbableElement()));
          });
        }
        focusLastTabbableElementWhenReady() {
          return new Promise((t) => {
            this._executeOnStable(() => t(this.focusLastTabbableElement()));
          });
        }
        _getRegionBoundary(t) {
          let e = this._element.querySelectorAll(
            `[cdk-focus-region-${t}], [cdkFocusRegion${t}], [cdk-focus-${t}]`
          );
          for (let n = 0; n < e.length; n++)
            e[n].hasAttribute("cdk-focus-" + t)
              ? console.warn(
                  `Found use of deprecated attribute 'cdk-focus-${t}', use 'cdkFocusRegion${t}' instead. The deprecated attribute will be removed in 8.0.0.`,
                  e[n]
                )
              : e[n].hasAttribute("cdk-focus-region-" + t) &&
                console.warn(
                  `Found use of deprecated attribute 'cdk-focus-region-${t}', use 'cdkFocusRegion${t}' instead. The deprecated attribute will be removed in 8.0.0.`,
                  e[n]
                );
          return "start" == t
            ? e.length
              ? e[0]
              : this._getFirstTabbableElement(this._element)
            : e.length
            ? e[e.length - 1]
            : this._getLastTabbableElement(this._element);
        }
        focusInitialElement() {
          const t = this._element.querySelector(
            "[cdk-focus-initial], [cdkFocusInitial]"
          );
          return t
            ? (t.hasAttribute("cdk-focus-initial") &&
                console.warn(
                  "Found use of deprecated attribute 'cdk-focus-initial', use 'cdkFocusInitial' instead. The deprecated attribute will be removed in 8.0.0",
                  t
                ),
              mi() &&
                !this._checker.isFocusable(t) &&
                console.warn(
                  "Element matching '[cdkFocusInitial]' is not focusable.",
                  t
                ),
              t.focus(),
              !0)
            : this.focusFirstTabbableElement();
        }
        focusFirstTabbableElement() {
          const t = this._getRegionBoundary("start");
          return t && t.focus(), !!t;
        }
        focusLastTabbableElement() {
          const t = this._getRegionBoundary("end");
          return t && t.focus(), !!t;
        }
        hasAttached() {
          return this._hasAttached;
        }
        _getFirstTabbableElement(t) {
          if (this._checker.isFocusable(t) && this._checker.isTabbable(t))
            return t;
          let e = t.children || t.childNodes;
          for (let n = 0; n < e.length; n++) {
            let t =
              e[n].nodeType === this._document.ELEMENT_NODE
                ? this._getFirstTabbableElement(e[n])
                : null;
            if (t) return t;
          }
          return null;
        }
        _getLastTabbableElement(t) {
          if (this._checker.isFocusable(t) && this._checker.isTabbable(t))
            return t;
          let e = t.children || t.childNodes;
          for (let n = e.length - 1; n >= 0; n--) {
            let t =
              e[n].nodeType === this._document.ELEMENT_NODE
                ? this._getLastTabbableElement(e[n])
                : null;
            if (t) return t;
          }
          return null;
        }
        _createAnchor() {
          const t = this._document.createElement("div");
          return (
            this._toggleAnchorTabIndex(this._enabled, t),
            t.classList.add("cdk-visually-hidden"),
            t.classList.add("cdk-focus-trap-anchor"),
            t.setAttribute("aria-hidden", "true"),
            t
          );
        }
        _toggleAnchorTabIndex(t, e) {
          t ? e.setAttribute("tabindex", "0") : e.removeAttribute("tabindex");
        }
        toggleAnchors(t) {
          this._startAnchor &&
            this._endAnchor &&
            (this._toggleAnchorTabIndex(t, this._startAnchor),
            this._toggleAnchorTabIndex(t, this._endAnchor));
        }
        _executeOnStable(t) {
          this._ngZone.isStable
            ? t()
            : this._ngZone.onStable.asObservable().pipe(hp(1)).subscribe(t);
        }
      }
      let Y_ = (() => {
        class t {
          constructor(t, e, n) {
            (this._checker = t), (this._ngZone = e), (this._document = n);
          }
          create(t, e = !1) {
            return new X_(t, this._checker, this._ngZone, this._document, e);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(Z_), Wt(Cl), Wt(tc));
          }),
          (t.ɵprov = lt({
            factory: function () {
              return new t(Wt(Z_), Wt(Cl), Wt(tc));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      function J_(t) {
        return 0 === t.buttons;
      }
      "undefined" != typeof Element && Element;
      const ty = new Lt("cdk-focus-monitor-default-options"),
        ey = L_({ passive: !0, capture: !0 });
      let ny = (() => {
        class t {
          constructor(t, e, n, i) {
            (this._ngZone = t),
              (this._platform = e),
              (this._origin = null),
              (this._windowFocused = !1),
              (this._elementInfo = new Map()),
              (this._monitoredElementCount = 0),
              (this._rootNodeFocusListenerCount = new Map()),
              (this._documentKeydownListener = () => {
                (this._lastTouchTarget = null),
                  this._setOriginForCurrentEventQueue("keyboard");
              }),
              (this._documentMousedownListener = (t) => {
                if (!this._lastTouchTarget) {
                  const e = J_(t) ? "keyboard" : "mouse";
                  this._setOriginForCurrentEventQueue(e);
                }
              }),
              (this._documentTouchstartListener = (t) => {
                null != this._touchTimeoutId &&
                  clearTimeout(this._touchTimeoutId),
                  (this._lastTouchTarget = iy(t)),
                  (this._touchTimeoutId = setTimeout(
                    () => (this._lastTouchTarget = null),
                    650
                  ));
              }),
              (this._windowFocusListener = () => {
                (this._windowFocused = !0),
                  (this._windowFocusTimeoutId = setTimeout(
                    () => (this._windowFocused = !1)
                  ));
              }),
              (this._rootNodeFocusAndBlurListener = (t) => {
                const e = iy(t),
                  n = "focus" === t.type ? this._onFocus : this._onBlur;
                for (let i = e; i; i = i.parentElement) n.call(this, t, i);
              }),
              (this._document = n),
              (this._detectionMode =
                (null == i ? void 0 : i.detectionMode) || 0);
          }
          monitor(t, e = !1) {
            if (!this._platform.isBrowser) return Ld(null);
            const n = u_(t),
              i =
                (function (t) {
                  if (
                    (function () {
                      if (null == F_) {
                        const t =
                          "undefined" != typeof document ? document.head : null;
                        F_ = !(!t || (!t.createShadowRoot && !t.attachShadow));
                      }
                      return F_;
                    })()
                  ) {
                    const e = t.getRootNode ? t.getRootNode() : null;
                    if (
                      "undefined" != typeof ShadowRoot &&
                      ShadowRoot &&
                      e instanceof ShadowRoot
                    )
                      return e;
                  }
                  return null;
                })(n) || this._getDocument(),
              s = this._elementInfo.get(n);
            if (s) return e && (s.checkChildren = !0), s.subject.asObservable();
            const r = { checkChildren: e, subject: new C(), rootNode: i };
            return (
              this._elementInfo.set(n, r),
              this._registerGlobalListeners(r),
              r.subject.asObservable()
            );
          }
          stopMonitoring(t) {
            const e = u_(t),
              n = this._elementInfo.get(e);
            n &&
              (n.subject.complete(),
              this._setClasses(e),
              this._elementInfo.delete(e),
              this._removeGlobalListeners(n));
          }
          focusVia(t, e, n) {
            const i = u_(t);
            this._setOriginForCurrentEventQueue(e),
              "function" == typeof i.focus && i.focus(n);
          }
          ngOnDestroy() {
            this._elementInfo.forEach((t, e) => this.stopMonitoring(e));
          }
          _getDocument() {
            return this._document || document;
          }
          _getWindow() {
            return this._getDocument().defaultView || window;
          }
          _toggleClass(t, e, n) {
            n ? t.classList.add(e) : t.classList.remove(e);
          }
          _getFocusOrigin(t) {
            return this._origin
              ? this._origin
              : this._windowFocused && this._lastFocusOrigin
              ? this._lastFocusOrigin
              : this._wasCausedByTouch(t)
              ? "touch"
              : "program";
          }
          _setClasses(t, e) {
            this._toggleClass(t, "cdk-focused", !!e),
              this._toggleClass(t, "cdk-touch-focused", "touch" === e),
              this._toggleClass(t, "cdk-keyboard-focused", "keyboard" === e),
              this._toggleClass(t, "cdk-mouse-focused", "mouse" === e),
              this._toggleClass(t, "cdk-program-focused", "program" === e);
          }
          _setOriginForCurrentEventQueue(t) {
            this._ngZone.runOutsideAngular(() => {
              (this._origin = t),
                0 === this._detectionMode &&
                  (this._originTimeoutId = setTimeout(
                    () => (this._origin = null),
                    1
                  ));
            });
          }
          _wasCausedByTouch(t) {
            const e = iy(t);
            return (
              this._lastTouchTarget instanceof Node &&
              e instanceof Node &&
              (e === this._lastTouchTarget || e.contains(this._lastTouchTarget))
            );
          }
          _onFocus(t, e) {
            const n = this._elementInfo.get(e);
            if (!n || (!n.checkChildren && e !== iy(t))) return;
            const i = this._getFocusOrigin(t);
            this._setClasses(e, i),
              this._emitOrigin(n.subject, i),
              (this._lastFocusOrigin = i);
          }
          _onBlur(t, e) {
            const n = this._elementInfo.get(e);
            !n ||
              (n.checkChildren &&
                t.relatedTarget instanceof Node &&
                e.contains(t.relatedTarget)) ||
              (this._setClasses(e), this._emitOrigin(n.subject, null));
          }
          _emitOrigin(t, e) {
            this._ngZone.run(() => t.next(e));
          }
          _registerGlobalListeners(t) {
            if (!this._platform.isBrowser) return;
            const e = t.rootNode,
              n = this._rootNodeFocusListenerCount.get(e) || 0;
            n ||
              this._ngZone.runOutsideAngular(() => {
                e.addEventListener(
                  "focus",
                  this._rootNodeFocusAndBlurListener,
                  ey
                ),
                  e.addEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    ey
                  );
              }),
              this._rootNodeFocusListenerCount.set(e, n + 1),
              1 == ++this._monitoredElementCount &&
                this._ngZone.runOutsideAngular(() => {
                  const t = this._getDocument(),
                    e = this._getWindow();
                  t.addEventListener(
                    "keydown",
                    this._documentKeydownListener,
                    ey
                  ),
                    t.addEventListener(
                      "mousedown",
                      this._documentMousedownListener,
                      ey
                    ),
                    t.addEventListener(
                      "touchstart",
                      this._documentTouchstartListener,
                      ey
                    ),
                    e.addEventListener("focus", this._windowFocusListener);
                });
          }
          _removeGlobalListeners(t) {
            const e = t.rootNode;
            if (this._rootNodeFocusListenerCount.has(e)) {
              const t = this._rootNodeFocusListenerCount.get(e);
              t > 1
                ? this._rootNodeFocusListenerCount.set(e, t - 1)
                : (e.removeEventListener(
                    "focus",
                    this._rootNodeFocusAndBlurListener,
                    ey
                  ),
                  e.removeEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    ey
                  ),
                  this._rootNodeFocusListenerCount.delete(e));
            }
            if (!--this._monitoredElementCount) {
              const t = this._getDocument(),
                e = this._getWindow();
              t.removeEventListener(
                "keydown",
                this._documentKeydownListener,
                ey
              ),
                t.removeEventListener(
                  "mousedown",
                  this._documentMousedownListener,
                  ey
                ),
                t.removeEventListener(
                  "touchstart",
                  this._documentTouchstartListener,
                  ey
                ),
                e.removeEventListener("focus", this._windowFocusListener),
                clearTimeout(this._windowFocusTimeoutId),
                clearTimeout(this._touchTimeoutId),
                clearTimeout(this._originTimeoutId);
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(Cl), Wt(I_), Wt(tc, 8), Wt(ty, 8));
          }),
          (t.ɵprov = lt({
            factory: function () {
              return new t(Wt(Cl), Wt(I_), Wt(tc, 8), Wt(ty, 8));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      function iy(t) {
        return t.composedPath ? t.composedPath()[0] : t.target;
      }
      let sy = (() => {
        class t {
          constructor(t, e) {
            (this._platform = t), (this._document = e);
          }
          getHighContrastMode() {
            if (!this._platform.isBrowser) return 0;
            const t = this._document.createElement("div");
            (t.style.backgroundColor = "rgb(1,2,3)"),
              (t.style.position = "absolute"),
              this._document.body.appendChild(t);
            const e = this._document.defaultView || window,
              n = e && e.getComputedStyle ? e.getComputedStyle(t) : null,
              i = ((n && n.backgroundColor) || "").replace(/ /g, "");
            switch ((this._document.body.removeChild(t), i)) {
              case "rgb(0,0,0)":
                return 2;
              case "rgb(255,255,255)":
                return 1;
            }
            return 0;
          }
          _applyBodyHighContrastModeCssClasses() {
            if (this._platform.isBrowser && this._document.body) {
              const t = this._document.body.classList;
              t.remove("cdk-high-contrast-active"),
                t.remove("cdk-high-contrast-black-on-white"),
                t.remove("cdk-high-contrast-white-on-black");
              const e = this.getHighContrastMode();
              1 === e
                ? (t.add("cdk-high-contrast-active"),
                  t.add("cdk-high-contrast-black-on-white"))
                : 2 === e &&
                  (t.add("cdk-high-contrast-active"),
                  t.add("cdk-high-contrast-white-on-black"));
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(I_), Wt(tc));
          }),
          (t.ɵprov = lt({
            factory: function () {
              return new t(Wt(I_), Wt(tc));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      class ry {
        constructor(t, e) {
          (this.compare = t), (this.keySelector = e);
        }
        call(t, e) {
          return e.subscribe(new oy(t, this.compare, this.keySelector));
        }
      }
      class oy extends f {
        constructor(t, e, n) {
          super(t),
            (this.keySelector = n),
            (this.hasKey = !1),
            "function" == typeof e && (this.compare = e);
        }
        compare(t, e) {
          return t === e;
        }
        _next(t) {
          let e;
          try {
            const { keySelector: n } = this;
            e = n ? n(t) : t;
          } catch (i) {
            return this.destination.error(i);
          }
          let n = !1;
          if (this.hasKey)
            try {
              const { compare: t } = this;
              n = t(this.key, e);
            } catch (i) {
              return this.destination.error(i);
            }
          else this.hasKey = !0;
          n || ((this.key = e), this.destination.next(t));
        }
      }
      const ay = ["body"];
      function ly(t, e) {}
      const cy = [[["mat-expansion-panel-header"]], "*", [["mat-action-row"]]],
        hy = ["mat-expansion-panel-header", "*", "mat-action-row"];
      function uy(t, e) {
        1 & t && zr(0, "span", 2),
          2 & t && $r("@indicatorRotate", eo()._getExpandedState());
      }
      const dy = [[["mat-panel-title"]], [["mat-panel-description"]], "*"],
        py = ["mat-panel-title", "mat-panel-description", "*"],
        fy = new Lt("MAT_ACCORDION"),
        my = {
          indicatorRotate: gh("indicatorRotate", [
            vh("collapsed, void", bh({ transform: "rotate(0deg)" })),
            vh("expanded", bh({ transform: "rotate(180deg)" })),
            wh(
              "expanded <=> collapsed, void => collapsed",
              _h("225ms cubic-bezier(0.4,0.0,0.2,1)")
            ),
          ]),
          bodyExpansion: gh("bodyExpansion", [
            vh("collapsed, void", bh({ height: "0px", visibility: "hidden" })),
            vh("expanded", bh({ height: "*", visibility: "visible" })),
            wh(
              "expanded <=> collapsed, void => collapsed",
              _h("225ms cubic-bezier(0.4,0.0,0.2,1)")
            ),
          ]),
        };
      let gy = (() => {
          class t {
            constructor(t) {
              this._template = t;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(jr(la));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["ng-template", "matExpansionPanelContent", ""]],
            })),
            t
          );
        })(),
        _y = 0;
      const yy = new Lt("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS");
      let by = (() => {
          class t extends __ {
            constructor(t, e, n, i, s, r, o) {
              super(t, e, n),
                (this._viewContainerRef = i),
                (this._animationMode = r),
                (this._hideToggle = !1),
                (this.afterExpand = new Na()),
                (this.afterCollapse = new Na()),
                (this._inputChanges = new C()),
                (this._headerId = "mat-expansion-panel-header-" + _y++),
                (this._bodyAnimationDone = new C()),
                (this.accordion = t),
                (this._document = s),
                this._bodyAnimationDone
                  .pipe(
                    (function (t, e) {
                      return (e) => e.lift(new ry(t, void 0));
                    })(
                      (t, e) =>
                        t.fromState === e.fromState && t.toState === e.toState
                    )
                  )
                  .subscribe((t) => {
                    "void" !== t.fromState &&
                      ("expanded" === t.toState
                        ? this.afterExpand.emit()
                        : "collapsed" === t.toState &&
                          this.afterCollapse.emit());
                  }),
                o && (this.hideToggle = o.hideToggle);
            }
            get hideToggle() {
              return (
                this._hideToggle ||
                (this.accordion && this.accordion.hideToggle)
              );
            }
            set hideToggle(t) {
              this._hideToggle = a_(t);
            }
            get togglePosition() {
              return (
                this._togglePosition ||
                (this.accordion && this.accordion.togglePosition)
              );
            }
            set togglePosition(t) {
              this._togglePosition = t;
            }
            _hasSpacing() {
              return (
                !!this.accordion &&
                this.expanded &&
                "default" === this.accordion.displayMode
              );
            }
            _getExpandedState() {
              return this.expanded ? "expanded" : "collapsed";
            }
            toggle() {
              this.expanded = !this.expanded;
            }
            close() {
              this.expanded = !1;
            }
            open() {
              this.expanded = !0;
            }
            ngAfterContentInit() {
              this._lazyContent &&
                this.opened
                  .pipe(
                    Sp(null),
                    Gd(() => this.expanded && !this._portal),
                    hp(1)
                  )
                  .subscribe(() => {
                    this._portal = new x_(
                      this._lazyContent._template,
                      this._viewContainerRef
                    );
                  });
            }
            ngOnChanges(t) {
              this._inputChanges.next(t);
            }
            ngOnDestroy() {
              super.ngOnDestroy(),
                this._bodyAnimationDone.complete(),
                this._inputChanges.complete();
            }
            _containsFocus() {
              if (this._body) {
                const t = this._document.activeElement,
                  e = this._body.nativeElement;
                return t === e || e.contains(t);
              }
              return !1;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                jr(fy, 12),
                jr(lr),
                jr(d_),
                jr(ha),
                jr(tc),
                jr(Dd, 8),
                jr(yy, 8)
              );
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["mat-expansion-panel"]],
              contentQueries: function (t, e, n) {
                var i;
                1 & t && Ka(n, gy, !0),
                  2 & t && qa((i = Ya())) && (e._lazyContent = i.first);
              },
              viewQuery: function (t, e) {
                var n;
                1 & t && Ga(ay, !0),
                  2 & t && qa((n = Ya())) && (e._body = n.first);
              },
              hostAttrs: [1, "mat-expansion-panel"],
              hostVars: 6,
              hostBindings: function (t, e) {
                2 & t &&
                  co("mat-expanded", e.expanded)(
                    "_mat-animation-noopable",
                    "NoopAnimations" === e._animationMode
                  )("mat-expansion-panel-spacing", e._hasSpacing());
              },
              inputs: {
                disabled: "disabled",
                expanded: "expanded",
                hideToggle: "hideToggle",
                togglePosition: "togglePosition",
              },
              outputs: {
                opened: "opened",
                closed: "closed",
                expandedChange: "expandedChange",
                afterExpand: "afterExpand",
                afterCollapse: "afterCollapse",
              },
              exportAs: ["matExpansionPanel"],
              features: [No([{ provide: fy, useValue: void 0 }]), xo, Ie],
              ngContentSelectors: hy,
              decls: 7,
              vars: 4,
              consts: [
                ["role", "region", 1, "mat-expansion-panel-content", 3, "id"],
                ["body", ""],
                [1, "mat-expansion-panel-body"],
                [3, "cdkPortalOutlet"],
              ],
              template: function (t, e) {
                1 & t &&
                  (io(cy),
                  so(0),
                  Br(1, "div", 0, 1),
                  Qr("@bodyExpansion.done", function (t) {
                    return e._bodyAnimationDone.next(t);
                  }),
                  Br(3, "div", 2),
                  so(4, 1),
                  Lr(5, ly, 0, 0, "ng-template", 3),
                  Ur(),
                  so(6, 2),
                  Ur()),
                  2 & t &&
                    (Fi(1),
                    $r("@bodyExpansion", e._getExpandedState())("id", e.id),
                    Fr("aria-labelledby", e._headerId),
                    Fi(4),
                    $r("cdkPortalOutlet", e._portal));
              },
              directives: [T_],
              styles: [
                ".mat-expansion-panel{box-sizing:content-box;display:block;margin:0;border-radius:4px;overflow:hidden;transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);position:relative}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:4px;border-top-left-radius:4px}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.cdk-high-contrast-active .mat-expansion-panel{outline:solid 1px}.mat-expansion-panel.ng-animate-disabled,.ng-animate-disabled .mat-expansion-panel,.mat-expansion-panel._mat-animation-noopable{transition:none}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.mat-action-row button.mat-button-base,.mat-action-row button.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row button.mat-button-base,[dir=rtl] .mat-action-row button.mat-mdc-button-base{margin-left:0;margin-right:8px}\n",
              ],
              encapsulation: 2,
              data: { animation: [my.bodyExpansion] },
              changeDetection: 0,
            })),
            t
          );
        })(),
        vy = (() => {
          class t {
            constructor(t, e, n, i, s, r) {
              (this.panel = t),
                (this._element = e),
                (this._focusMonitor = n),
                (this._changeDetectorRef = i),
                (this._animationMode = r),
                (this._parentChangeSubscription = u.EMPTY);
              const o = t.accordion
                ? t.accordion._stateChanges.pipe(
                    Gd((t) => !(!t.hideToggle && !t.togglePosition))
                  )
                : Ud;
              (this._parentChangeSubscription = q(
                t.opened,
                t.closed,
                o,
                t._inputChanges.pipe(
                  Gd((t) => !!(t.hideToggle || t.disabled || t.togglePosition))
                )
              ).subscribe(() => this._changeDetectorRef.markForCheck())),
                t.closed
                  .pipe(Gd(() => t._containsFocus()))
                  .subscribe(() => n.focusVia(e, "program")),
                s &&
                  ((this.expandedHeight = s.expandedHeight),
                  (this.collapsedHeight = s.collapsedHeight));
            }
            get disabled() {
              return this.panel.disabled;
            }
            _toggle() {
              this.disabled || this.panel.toggle();
            }
            _isExpanded() {
              return this.panel.expanded;
            }
            _getExpandedState() {
              return this.panel._getExpandedState();
            }
            _getPanelId() {
              return this.panel.id;
            }
            _getTogglePosition() {
              return this.panel.togglePosition;
            }
            _showToggle() {
              return !this.panel.hideToggle && !this.panel.disabled;
            }
            _getHeaderHeight() {
              const t = this._isExpanded();
              return t && this.expandedHeight
                ? this.expandedHeight
                : !t && this.collapsedHeight
                ? this.collapsedHeight
                : null;
            }
            _keydown(t) {
              switch (t.keyCode) {
                case 32:
                case 13:
                  M_(t) || (t.preventDefault(), this._toggle());
                  break;
                default:
                  return void (
                    this.panel.accordion &&
                    this.panel.accordion._handleHeaderKeydown(t)
                  );
              }
            }
            focus(t = "program", e) {
              this._focusMonitor.focusVia(this._element, t, e);
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._element).subscribe((t) => {
                t &&
                  this.panel.accordion &&
                  this.panel.accordion._handleHeaderFocus(this);
              });
            }
            ngOnDestroy() {
              this._parentChangeSubscription.unsubscribe(),
                this._focusMonitor.stopMonitoring(this._element);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                jr(by, 1),
                jr(jo),
                jr(ny),
                jr(lr),
                jr(yy, 8),
                jr(Dd, 8)
              );
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["mat-expansion-panel-header"]],
              hostAttrs: [
                "role",
                "button",
                1,
                "mat-expansion-panel-header",
                "mat-focus-indicator",
              ],
              hostVars: 15,
              hostBindings: function (t, e) {
                1 & t &&
                  Qr("click", function () {
                    return e._toggle();
                  })("keydown", function (t) {
                    return e._keydown(t);
                  }),
                  2 & t &&
                    (Fr("id", e.panel._headerId)(
                      "tabindex",
                      e.disabled ? -1 : 0
                    )("aria-controls", e._getPanelId())(
                      "aria-expanded",
                      e._isExpanded()
                    )("aria-disabled", e.panel.disabled),
                    lo("height", e._getHeaderHeight()),
                    co("mat-expanded", e._isExpanded())(
                      "mat-expansion-toggle-indicator-after",
                      "after" === e._getTogglePosition()
                    )(
                      "mat-expansion-toggle-indicator-before",
                      "before" === e._getTogglePosition()
                    )(
                      "_mat-animation-noopable",
                      "NoopAnimations" === e._animationMode
                    ));
              },
              inputs: {
                expandedHeight: "expandedHeight",
                collapsedHeight: "collapsedHeight",
              },
              ngContentSelectors: py,
              decls: 5,
              vars: 1,
              consts: [
                [1, "mat-content"],
                ["class", "mat-expansion-indicator", 4, "ngIf"],
                [1, "mat-expansion-indicator"],
              ],
              template: function (t, e) {
                1 & t &&
                  (io(dy),
                  Br(0, "span", 0),
                  so(1),
                  so(2, 1),
                  so(3, 2),
                  Ur(),
                  Lr(4, uy, 1, 1, "span", 1)),
                  2 & t && (Fi(4), $r("ngIf", e._showToggle()));
              },
              directives: [Ec],
              styles: [
                '.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;margin-right:16px}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header-description{flex-grow:2}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle}\n',
              ],
              encapsulation: 2,
              data: { animation: [my.indicatorRotate] },
              changeDetection: 0,
            })),
            t
          );
        })(),
        wy = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["mat-panel-description"]],
              hostAttrs: [1, "mat-expansion-panel-header-description"],
            })),
            t
          );
        })(),
        xy = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["mat-panel-title"]],
              hostAttrs: [1, "mat-expansion-panel-header-title"],
            })),
            t
          );
        })(),
        Cy = (() => {
          class t extends m_ {
            constructor() {
              super(...arguments),
                (this._ownHeaders = new La()),
                (this._hideToggle = !1),
                (this.displayMode = "default"),
                (this.togglePosition = "after");
            }
            get hideToggle() {
              return this._hideToggle;
            }
            set hideToggle(t) {
              this._hideToggle = a_(t);
            }
            ngAfterContentInit() {
              this._headers.changes.pipe(Sp(this._headers)).subscribe((t) => {
                this._ownHeaders.reset(
                  t.filter((t) => t.panel.accordion === this)
                ),
                  this._ownHeaders.notifyOnChanges();
              }),
                (this._keyManager = new G_(this._ownHeaders).withWrap());
            }
            _handleHeaderKeydown(t) {
              const { keyCode: e } = t,
                n = this._keyManager;
              36 === e
                ? M_(t) || (n.setFirstItemActive(), t.preventDefault())
                : 35 === e
                ? M_(t) || (n.setLastItemActive(), t.preventDefault())
                : this._keyManager.onKeydown(t);
            }
            _handleHeaderFocus(t) {
              this._keyManager.updateActiveItem(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return Sy(e || t);
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["mat-accordion"]],
              contentQueries: function (t, e, n) {
                var i;
                1 & t && Ka(n, vy, !0),
                  2 & t && qa((i = Ya())) && (e._headers = i);
              },
              hostAttrs: [1, "mat-accordion"],
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t && co("mat-accordion-multi", e.multi);
              },
              inputs: {
                multi: "multi",
                displayMode: "displayMode",
                togglePosition: "togglePosition",
                hideToggle: "hideToggle",
              },
              exportAs: ["matAccordion"],
              features: [No([{ provide: fy, useExisting: t }]), xo],
            })),
            t
          );
        })();
      const Sy = li(Cy);
      let ky = (() => {
        class t {}
        return (
          (t.ɵmod = me({ type: t })),
          (t.ɵinj = ct({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [[jc, y_, A_]],
          })),
          t
        );
      })();
      const Ey = new Lt("cdk-dir-doc", {
        providedIn: "root",
        factory: function () {
          return Gt(tc);
        },
      });
      let Ty = (() => {
          class t {
            constructor(t) {
              if (((this.value = "ltr"), (this.change = new Na()), t)) {
                const e = t.documentElement ? t.documentElement.dir : null,
                  n = (t.body ? t.body.dir : null) || e;
                this.value = "ltr" === n || "rtl" === n ? n : "ltr";
              }
            }
            ngOnDestroy() {
              this.change.complete();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Ey, 8));
            }),
            (t.ɵprov = lt({
              factory: function () {
                return new t(Wt(Ey, 8));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Ay = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })();
      const Oy = new qo("10.1.1"),
        Iy = new qo("10.1.1"),
        Py = new Lt("mat-sanity-checks", {
          providedIn: "root",
          factory: function () {
            return !0;
          },
        });
      let Ry,
        Dy = (() => {
          class t {
            constructor(t, e, n) {
              (this._hasDoneGlobalChecks = !1),
                (this._document = n),
                t._applyBodyHighContrastModeCssClasses(),
                (this._sanityChecks = e),
                this._hasDoneGlobalChecks ||
                  (this._checkDoctypeIsDefined(),
                  this._checkThemeIsPresent(),
                  this._checkCdkVersionMatch(),
                  (this._hasDoneGlobalChecks = !0));
            }
            _getDocument() {
              const t = this._document || document;
              return "object" == typeof t && t ? t : null;
            }
            _getWindow() {
              const t = this._getDocument(),
                e = (null == t ? void 0 : t.defaultView) || window;
              return "object" == typeof e && e ? e : null;
            }
            _checksAreEnabled() {
              return mi() && !this._isTestEnv();
            }
            _isTestEnv() {
              const t = this._getWindow();
              return t && (t.__karma__ || t.jasmine);
            }
            _checkDoctypeIsDefined() {
              const t =
                  this._checksAreEnabled() &&
                  (!0 === this._sanityChecks || this._sanityChecks.doctype),
                e = this._getDocument();
              t &&
                e &&
                !e.doctype &&
                console.warn(
                  "Current document does not have a doctype. This may cause some Angular Material components not to behave as expected."
                );
            }
            _checkThemeIsPresent() {
              const t =
                  !this._checksAreEnabled() ||
                  !1 === this._sanityChecks ||
                  !this._sanityChecks.theme,
                e = this._getDocument();
              if (t || !e || !e.body || "function" != typeof getComputedStyle)
                return;
              const n = e.createElement("div");
              n.classList.add("mat-theme-loaded-marker"), e.body.appendChild(n);
              const i = getComputedStyle(n);
              i &&
                "none" !== i.display &&
                console.warn(
                  "Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"
                ),
                e.body.removeChild(n);
            }
            _checkCdkVersionMatch() {
              this._checksAreEnabled() &&
                (!0 === this._sanityChecks || this._sanityChecks.version) &&
                Iy.full !== Oy.full &&
                console.warn(
                  "The Angular Material version (" +
                    Iy.full +
                    ") does not match the Angular CDK version (" +
                    Oy.full +
                    ").\nPlease ensure the versions of these two packages exactly match."
                );
            }
          }
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)(Wt(sy), Wt(Py, 8), Wt(tc, 8));
              },
              imports: [[Ay], Ay],
            })),
            t
          );
        })();
      function Ny(t) {
        return class extends t {
          constructor(...t) {
            super(...t), (this._disabled = !1);
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(t) {
            this._disabled = a_(t);
          }
        };
      }
      function Fy(t, e) {
        return class extends t {
          constructor(...t) {
            super(...t), (this.color = e);
          }
          get color() {
            return this._color;
          }
          set color(t) {
            const n = t || e;
            n !== this._color &&
              (this._color &&
                this._elementRef.nativeElement.classList.remove(
                  "mat-" + this._color
                ),
              n && this._elementRef.nativeElement.classList.add("mat-" + n),
              (this._color = n));
          }
        };
      }
      function Ly(t) {
        return class extends t {
          constructor(...t) {
            super(...t), (this._disableRipple = !1);
          }
          get disableRipple() {
            return this._disableRipple;
          }
          set disableRipple(t) {
            this._disableRipple = a_(t);
          }
        };
      }
      function My(t, e = 0) {
        return class extends t {
          constructor(...t) {
            super(...t), (this._tabIndex = e);
          }
          get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
          }
          set tabIndex(t) {
            this._tabIndex = null != t ? l_(t) : e;
          }
        };
      }
      function jy(t) {
        return class extends t {
          constructor(...t) {
            super(...t), (this.errorState = !1), (this.stateChanges = new C());
          }
          updateErrorState() {
            const t = this.errorState,
              e = (
                this.errorStateMatcher || this._defaultErrorStateMatcher
              ).isErrorState(
                this.ngControl ? this.ngControl.control : null,
                this._parentFormGroup || this._parentForm
              );
            e !== t && ((this.errorState = e), this.stateChanges.next());
          }
        };
      }
      try {
        Ry = "undefined" != typeof Intl;
      } catch (_x) {
        Ry = !1;
      }
      let Vy = (() => {
        class t {
          isErrorState(t, e) {
            return !!(t && t.invalid && (t.touched || (e && e.submitted)));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = lt({
            factory: function () {
              return new t();
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      class $y {
        constructor(t, e, n) {
          (this._renderer = t),
            (this.element = e),
            (this.config = n),
            (this.state = 3);
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this);
        }
      }
      const Hy = { enterDuration: 450, exitDuration: 400 },
        By = L_({ passive: !0 }),
        Uy = ["mousedown", "touchstart"],
        zy = ["mouseup", "mouseleave", "touchend", "touchcancel"];
      class qy {
        constructor(t, e, n, i) {
          (this._target = t),
            (this._ngZone = e),
            (this._isPointerDown = !1),
            (this._activeRipples = new Set()),
            (this._pointerUpEventsRegistered = !1),
            i.isBrowser && (this._containerElement = u_(n));
        }
        fadeInRipple(t, e, n = {}) {
          const i = (this._containerRect =
              this._containerRect ||
              this._containerElement.getBoundingClientRect()),
            s = Object.assign(Object.assign({}, Hy), n.animation);
          n.centered &&
            ((t = i.left + i.width / 2), (e = i.top + i.height / 2));
          const r =
              n.radius ||
              (function (t, e, n) {
                const i = Math.max(Math.abs(t - n.left), Math.abs(t - n.right)),
                  s = Math.max(Math.abs(e - n.top), Math.abs(e - n.bottom));
                return Math.sqrt(i * i + s * s);
              })(t, e, i),
            o = t - i.left,
            a = e - i.top,
            l = s.enterDuration,
            c = document.createElement("div");
          c.classList.add("mat-ripple-element"),
            (c.style.left = o - r + "px"),
            (c.style.top = a - r + "px"),
            (c.style.height = 2 * r + "px"),
            (c.style.width = 2 * r + "px"),
            null != n.color && (c.style.backgroundColor = n.color),
            (c.style.transitionDuration = l + "ms"),
            this._containerElement.appendChild(c),
            window.getComputedStyle(c).getPropertyValue("opacity"),
            (c.style.transform = "scale(1)");
          const h = new $y(this, c, n);
          return (
            (h.state = 0),
            this._activeRipples.add(h),
            n.persistent || (this._mostRecentTransientRipple = h),
            this._runTimeoutOutsideZone(() => {
              const t = h === this._mostRecentTransientRipple;
              (h.state = 1),
                n.persistent || (t && this._isPointerDown) || h.fadeOut();
            }, l),
            h
          );
        }
        fadeOutRipple(t) {
          const e = this._activeRipples.delete(t);
          if (
            (t === this._mostRecentTransientRipple &&
              (this._mostRecentTransientRipple = null),
            this._activeRipples.size || (this._containerRect = null),
            !e)
          )
            return;
          const n = t.element,
            i = Object.assign(Object.assign({}, Hy), t.config.animation);
          (n.style.transitionDuration = i.exitDuration + "ms"),
            (n.style.opacity = "0"),
            (t.state = 2),
            this._runTimeoutOutsideZone(() => {
              (t.state = 3), n.parentNode.removeChild(n);
            }, i.exitDuration);
        }
        fadeOutAll() {
          this._activeRipples.forEach((t) => t.fadeOut());
        }
        setupTriggerEvents(t) {
          const e = u_(t);
          e &&
            e !== this._triggerElement &&
            (this._removeTriggerEvents(),
            (this._triggerElement = e),
            this._registerEvents(Uy));
        }
        handleEvent(t) {
          "mousedown" === t.type
            ? this._onMousedown(t)
            : "touchstart" === t.type
            ? this._onTouchStart(t)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._registerEvents(zy),
              (this._pointerUpEventsRegistered = !0));
        }
        _onMousedown(t) {
          const e = J_(t),
            n =
              this._lastTouchStartEvent &&
              Date.now() < this._lastTouchStartEvent + 800;
          this._target.rippleDisabled ||
            e ||
            n ||
            ((this._isPointerDown = !0),
            this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
        }
        _onTouchStart(t) {
          if (!this._target.rippleDisabled) {
            (this._lastTouchStartEvent = Date.now()),
              (this._isPointerDown = !0);
            const e = t.changedTouches;
            for (let t = 0; t < e.length; t++)
              this.fadeInRipple(
                e[t].clientX,
                e[t].clientY,
                this._target.rippleConfig
              );
          }
        }
        _onPointerUp() {
          this._isPointerDown &&
            ((this._isPointerDown = !1),
            this._activeRipples.forEach((t) => {
              !t.config.persistent &&
                (1 === t.state ||
                  (t.config.terminateOnPointerUp && 0 === t.state)) &&
                t.fadeOut();
            }));
        }
        _runTimeoutOutsideZone(t, e = 0) {
          this._ngZone.runOutsideAngular(() => setTimeout(t, e));
        }
        _registerEvents(t) {
          this._ngZone.runOutsideAngular(() => {
            t.forEach((t) => {
              this._triggerElement.addEventListener(t, this, By);
            });
          });
        }
        _removeTriggerEvents() {
          this._triggerElement &&
            (Uy.forEach((t) => {
              this._triggerElement.removeEventListener(t, this, By);
            }),
            this._pointerUpEventsRegistered &&
              zy.forEach((t) => {
                this._triggerElement.removeEventListener(t, this, By);
              }));
        }
      }
      const Wy = new Lt("mat-ripple-global-options");
      let Gy = (() => {
          class t {
            constructor(t, e, n, i, s) {
              (this._elementRef = t),
                (this._animationMode = s),
                (this.radius = 0),
                (this._disabled = !1),
                (this._isInitialized = !1),
                (this._globalOptions = i || {}),
                (this._rippleRenderer = new qy(this, e, t, n));
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              (this._disabled = t), this._setupTriggerEventsIfEnabled();
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement;
            }
            set trigger(t) {
              (this._trigger = t), this._setupTriggerEventsIfEnabled();
            }
            ngOnInit() {
              (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
            }
            ngOnDestroy() {
              this._rippleRenderer._removeTriggerEvents();
            }
            fadeOutAll() {
              this._rippleRenderer.fadeOutAll();
            }
            get rippleConfig() {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: Object.assign(
                  Object.assign(
                    Object.assign({}, this._globalOptions.animation),
                    "NoopAnimations" === this._animationMode
                      ? { enterDuration: 0, exitDuration: 0 }
                      : {}
                  ),
                  this.animation
                ),
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
              };
            }
            get rippleDisabled() {
              return this.disabled || !!this._globalOptions.disabled;
            }
            _setupTriggerEventsIfEnabled() {
              !this.disabled &&
                this._isInitialized &&
                this._rippleRenderer.setupTriggerEvents(this.trigger);
            }
            launch(t, e = 0, n) {
              return "number" == typeof t
                ? this._rippleRenderer.fadeInRipple(
                    t,
                    e,
                    Object.assign(Object.assign({}, this.rippleConfig), n)
                  )
                : this._rippleRenderer.fadeInRipple(
                    0,
                    0,
                    Object.assign(Object.assign({}, this.rippleConfig), t)
                  );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(jr(jo), jr(Cl), jr(I_), jr(Wy, 8), jr(Dd, 8));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [
                ["", "mat-ripple", ""],
                ["", "matRipple", ""],
              ],
              hostAttrs: [1, "mat-ripple"],
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t && co("mat-ripple-unbounded", e.unbounded);
              },
              inputs: {
                radius: ["matRippleRadius", "radius"],
                disabled: ["matRippleDisabled", "disabled"],
                trigger: ["matRippleTrigger", "trigger"],
                color: ["matRippleColor", "color"],
                unbounded: ["matRippleUnbounded", "unbounded"],
                centered: ["matRippleCentered", "centered"],
                animation: ["matRippleAnimation", "animation"],
              },
              exportAs: ["matRipple"],
            })),
            t
          );
        })(),
        Zy = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[Dy, P_], Dy],
            })),
            t
          );
        })();
      const Ky = new Lt("mat-label-global-options");
      function Qy(t, e, n, s) {
        return (
          i(n) && ((s = n), (n = void 0)),
          s
            ? Qy(t, e, n).pipe(F((t) => (l(t) ? s(...t) : s(t))))
            : new y((i) => {
                !(function t(e, n, i, s, r) {
                  let o;
                  if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.addEventListener &&
                        "function" == typeof t.removeEventListener
                      );
                    })(e)
                  ) {
                    const t = e;
                    e.addEventListener(n, i, r),
                      (o = () => t.removeEventListener(n, i, r));
                  } else if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.on &&
                        "function" == typeof t.off
                      );
                    })(e)
                  ) {
                    const t = e;
                    e.on(n, i), (o = () => t.off(n, i));
                  } else if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.addListener &&
                        "function" == typeof t.removeListener
                      );
                    })(e)
                  ) {
                    const t = e;
                    e.addListener(n, i), (o = () => t.removeListener(n, i));
                  } else {
                    if (!e || !e.length)
                      throw new TypeError("Invalid event target");
                    for (let o = 0, a = e.length; o < a; o++)
                      t(e[o], n, i, s, r);
                  }
                  s.add(o);
                })(
                  t,
                  e,
                  function (t) {
                    i.next(
                      arguments.length > 1
                        ? Array.prototype.slice.call(arguments)
                        : t
                    );
                  },
                  i,
                  n
                );
              })
        );
      }
      function Xy(t) {
        return (e) => e.lift(new Yy(t));
      }
      class Yy {
        constructor(t) {
          this.notifier = t;
        }
        call(t, e) {
          const n = new Jy(t),
            i = D(n, this.notifier);
          return i && !n.seenValue ? (n.add(i), e.subscribe(n)) : n;
        }
      }
      class Jy extends N {
        constructor(t) {
          super(t), (this.seenValue = !1);
        }
        notifyNext(t, e, n, i, s) {
          (this.seenValue = !0), this.complete();
        }
        notifyComplete() {}
      }
      const tb = ["underline"],
        eb = ["connectionContainer"],
        nb = ["inputContainer"],
        ib = ["label"];
      function sb(t, e) {
        1 & t &&
          (qr(0),
          Br(1, "div", 14),
          zr(2, "div", 15),
          zr(3, "div", 16),
          zr(4, "div", 17),
          Ur(),
          Br(5, "div", 18),
          zr(6, "div", 15),
          zr(7, "div", 16),
          zr(8, "div", 17),
          Ur(),
          Wr());
      }
      function rb(t, e) {
        1 & t && (Br(0, "div", 19), so(1, 1), Ur());
      }
      function ob(t, e) {
        if (
          (1 & t && (qr(0), so(1, 2), Br(2, "span"), go(3), Ur(), Wr()), 2 & t)
        ) {
          const t = eo(2);
          Fi(3), _o(t._control.placeholder);
        }
      }
      function ab(t, e) {
        1 & t && so(0, 3, ["*ngSwitchCase", "true"]);
      }
      function lb(t, e) {
        1 & t && (Br(0, "span", 23), go(1, " *"), Ur());
      }
      function cb(t, e) {
        if (1 & t) {
          const t = Gr();
          Br(0, "label", 20, 21),
            Qr("cdkObserveContent", function () {
              return tn(t), eo().updateOutlineGap();
            }),
            Lr(2, ob, 4, 1, "ng-container", 12),
            Lr(3, ab, 1, 0, "ng-content", 12),
            Lr(4, lb, 2, 0, "span", 22),
            Ur();
        }
        if (2 & t) {
          const t = eo();
          co("mat-empty", t._control.empty && !t._shouldAlwaysFloat)(
            "mat-form-field-empty",
            t._control.empty && !t._shouldAlwaysFloat
          )("mat-accent", "accent" == t.color)("mat-warn", "warn" == t.color),
            $r("cdkObserveContentDisabled", "outline" != t.appearance)(
              "id",
              t._labelId
            )("ngSwitch", t._hasLabel()),
            Fr("for", t._control.id)("aria-owns", t._control.id),
            Fi(2),
            $r("ngSwitchCase", !1),
            Fi(1),
            $r("ngSwitchCase", !0),
            Fi(1),
            $r(
              "ngIf",
              !t.hideRequiredMarker &&
                t._control.required &&
                !t._control.disabled
            );
        }
      }
      function hb(t, e) {
        1 & t && (Br(0, "div", 24), so(1, 4), Ur());
      }
      function ub(t, e) {
        if ((1 & t && (Br(0, "div", 25, 26), zr(2, "span", 27), Ur()), 2 & t)) {
          const t = eo();
          Fi(2),
            co("mat-accent", "accent" == t.color)(
              "mat-warn",
              "warn" == t.color
            );
        }
      }
      function db(t, e) {
        1 & t && (Br(0, "div"), so(1, 5), Ur()),
          2 & t && $r("@transitionMessages", eo()._subscriptAnimationState);
      }
      function pb(t, e) {
        if ((1 & t && (Br(0, "div", 31), go(1), Ur()), 2 & t)) {
          const t = eo(2);
          $r("id", t._hintLabelId), Fi(1), _o(t.hintLabel);
        }
      }
      function fb(t, e) {
        if (
          (1 & t &&
            (Br(0, "div", 28),
            Lr(1, pb, 2, 2, "div", 29),
            so(2, 6),
            zr(3, "div", 30),
            so(4, 7),
            Ur()),
          2 & t)
        ) {
          const t = eo();
          $r("@transitionMessages", t._subscriptAnimationState),
            Fi(1),
            $r("ngIf", t.hintLabel);
        }
      }
      const mb = [
          "*",
          [["", "matPrefix", ""]],
          [["mat-placeholder"]],
          [["mat-label"]],
          [["", "matSuffix", ""]],
          [["mat-error"]],
          [["mat-hint", 3, "align", "end"]],
          [["mat-hint", "align", "end"]],
        ],
        gb = [
          "*",
          "[matPrefix]",
          "mat-placeholder",
          "mat-label",
          "[matSuffix]",
          "mat-error",
          "mat-hint:not([align='end'])",
          "mat-hint[align='end']",
        ],
        _b = new Lt("MatError"),
        yb = {
          transitionMessages: gh("transitionMessages", [
            vh("enter", bh({ opacity: 1, transform: "translateY(0%)" })),
            wh("void => enter", [
              bh({ opacity: 0, transform: "translateY(-100%)" }),
              _h("300ms cubic-bezier(0.55, 0, 0.55, 0.2)"),
            ]),
          ]),
        };
      let bb = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵdir = _e({ type: t })),
          t
        );
      })();
      function vb(t) {
        return Error(`A hint was already declared for 'align="${t}"'.`);
      }
      const wb = new Lt("MatHint");
      let xb = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({ type: t, selectors: [["mat-label"]] })),
            t
          );
        })(),
        Cb = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({ type: t, selectors: [["mat-placeholder"]] })),
            t
          );
        })();
      const Sb = new Lt("MatPrefix"),
        kb = new Lt("MatSuffix");
      let Eb = 0;
      class Tb {
        constructor(t) {
          this._elementRef = t;
        }
      }
      const Ab = Fy(Tb, "primary"),
        Ob = new Lt("MAT_FORM_FIELD_DEFAULT_OPTIONS"),
        Ib = new Lt("MatFormField");
      let Pb = (() => {
          class t extends Ab {
            constructor(t, e, n, i, s, r, o, a) {
              super(t),
                (this._elementRef = t),
                (this._changeDetectorRef = e),
                (this._dir = i),
                (this._defaults = s),
                (this._platform = r),
                (this._ngZone = o),
                (this._outlineGapCalculationNeededImmediately = !1),
                (this._outlineGapCalculationNeededOnStable = !1),
                (this._destroyed = new C()),
                (this._showAlwaysAnimate = !1),
                (this._subscriptAnimationState = ""),
                (this._hintLabel = ""),
                (this._hintLabelId = "mat-hint-" + Eb++),
                (this._labelId = "mat-form-field-label-" + Eb++),
                (this._labelOptions = n || {}),
                (this.floatLabel = this._getDefaultFloatLabelState()),
                (this._animationsEnabled = "NoopAnimations" !== a),
                (this.appearance = s && s.appearance ? s.appearance : "legacy"),
                (this._hideRequiredMarker =
                  !(!s || null == s.hideRequiredMarker) &&
                  s.hideRequiredMarker);
            }
            get appearance() {
              return this._appearance;
            }
            set appearance(t) {
              const e = this._appearance;
              (this._appearance =
                t || (this._defaults && this._defaults.appearance) || "legacy"),
                "outline" === this._appearance &&
                  e !== t &&
                  (this._outlineGapCalculationNeededOnStable = !0);
            }
            get hideRequiredMarker() {
              return this._hideRequiredMarker;
            }
            set hideRequiredMarker(t) {
              this._hideRequiredMarker = a_(t);
            }
            get _shouldAlwaysFloat() {
              return "always" === this.floatLabel && !this._showAlwaysAnimate;
            }
            get _canLabelFloat() {
              return "never" !== this.floatLabel;
            }
            get hintLabel() {
              return this._hintLabel;
            }
            set hintLabel(t) {
              (this._hintLabel = t), this._processHints();
            }
            get floatLabel() {
              return "legacy" !== this.appearance &&
                "never" === this._floatLabel
                ? "auto"
                : this._floatLabel;
            }
            set floatLabel(t) {
              t !== this._floatLabel &&
                ((this._floatLabel = t || this._getDefaultFloatLabelState()),
                this._changeDetectorRef.markForCheck());
            }
            get _control() {
              return (
                this._explicitFormFieldControl ||
                this._controlNonStatic ||
                this._controlStatic
              );
            }
            set _control(t) {
              this._explicitFormFieldControl = t;
            }
            get _labelChild() {
              return this._labelChildNonStatic || this._labelChildStatic;
            }
            getConnectedOverlayOrigin() {
              return this._connectionContainerRef || this._elementRef;
            }
            ngAfterContentInit() {
              this._validateControlChild();
              const t = this._control;
              t.controlType &&
                this._elementRef.nativeElement.classList.add(
                  "mat-form-field-type-" + t.controlType
                ),
                t.stateChanges.pipe(Sp(null)).subscribe(() => {
                  this._validatePlaceholders(),
                    this._syncDescribedByIds(),
                    this._changeDetectorRef.markForCheck();
                }),
                t.ngControl &&
                  t.ngControl.valueChanges &&
                  t.ngControl.valueChanges
                    .pipe(Xy(this._destroyed))
                    .subscribe(() => this._changeDetectorRef.markForCheck()),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable
                    .asObservable()
                    .pipe(Xy(this._destroyed))
                    .subscribe(() => {
                      this._outlineGapCalculationNeededOnStable &&
                        this.updateOutlineGap();
                    });
                }),
                q(
                  this._prefixChildren.changes,
                  this._suffixChildren.changes
                ).subscribe(() => {
                  (this._outlineGapCalculationNeededOnStable = !0),
                    this._changeDetectorRef.markForCheck();
                }),
                this._hintChildren.changes.pipe(Sp(null)).subscribe(() => {
                  this._processHints(), this._changeDetectorRef.markForCheck();
                }),
                this._errorChildren.changes.pipe(Sp(null)).subscribe(() => {
                  this._syncDescribedByIds(),
                    this._changeDetectorRef.markForCheck();
                }),
                this._dir &&
                  this._dir.change.pipe(Xy(this._destroyed)).subscribe(() => {
                    "function" == typeof requestAnimationFrame
                      ? this._ngZone.runOutsideAngular(() => {
                          requestAnimationFrame(() => this.updateOutlineGap());
                        })
                      : this.updateOutlineGap();
                  });
            }
            ngAfterContentChecked() {
              this._validateControlChild(),
                this._outlineGapCalculationNeededImmediately &&
                  this.updateOutlineGap();
            }
            ngAfterViewInit() {
              (this._subscriptAnimationState = "enter"),
                this._changeDetectorRef.detectChanges();
            }
            ngOnDestroy() {
              this._destroyed.next(), this._destroyed.complete();
            }
            _shouldForward(t) {
              const e = this._control ? this._control.ngControl : null;
              return e && e[t];
            }
            _hasPlaceholder() {
              return !!(
                (this._control && this._control.placeholder) ||
                this._placeholderChild
              );
            }
            _hasLabel() {
              return !!this._labelChild;
            }
            _shouldLabelFloat() {
              return (
                this._canLabelFloat &&
                ((this._control && this._control.shouldLabelFloat) ||
                  this._shouldAlwaysFloat)
              );
            }
            _hideControlPlaceholder() {
              return (
                ("legacy" === this.appearance && !this._hasLabel()) ||
                (this._hasLabel() && !this._shouldLabelFloat())
              );
            }
            _hasFloatingLabel() {
              return (
                this._hasLabel() ||
                ("legacy" === this.appearance && this._hasPlaceholder())
              );
            }
            _getDisplayedMessages() {
              return this._errorChildren &&
                this._errorChildren.length > 0 &&
                this._control.errorState
                ? "error"
                : "hint";
            }
            _animateAndLockLabel() {
              this._hasFloatingLabel() &&
                this._canLabelFloat &&
                (this._animationsEnabled &&
                  this._label &&
                  ((this._showAlwaysAnimate = !0),
                  Qy(this._label.nativeElement, "transitionend")
                    .pipe(hp(1))
                    .subscribe(() => {
                      this._showAlwaysAnimate = !1;
                    })),
                (this.floatLabel = "always"),
                this._changeDetectorRef.markForCheck());
            }
            _validatePlaceholders() {
              if (this._control.placeholder && this._placeholderChild)
                throw Error(
                  "Placeholder attribute and child element were both specified."
                );
            }
            _processHints() {
              this._validateHints(), this._syncDescribedByIds();
            }
            _validateHints() {
              if (this._hintChildren) {
                let t, e;
                this._hintChildren.forEach((n) => {
                  if ("start" === n.align) {
                    if (t || this.hintLabel) throw vb("start");
                    t = n;
                  } else if ("end" === n.align) {
                    if (e) throw vb("end");
                    e = n;
                  }
                });
              }
            }
            _getDefaultFloatLabelState() {
              return (
                (this._defaults && this._defaults.floatLabel) ||
                this._labelOptions.float ||
                "auto"
              );
            }
            _syncDescribedByIds() {
              if (this._control) {
                let t = [];
                if ("hint" === this._getDisplayedMessages()) {
                  const e = this._hintChildren
                      ? this._hintChildren.find((t) => "start" === t.align)
                      : null,
                    n = this._hintChildren
                      ? this._hintChildren.find((t) => "end" === t.align)
                      : null;
                  e
                    ? t.push(e.id)
                    : this._hintLabel && t.push(this._hintLabelId),
                    n && t.push(n.id);
                } else
                  this._errorChildren &&
                    (t = this._errorChildren.map((t) => t.id));
                this._control.setDescribedByIds(t);
              }
            }
            _validateControlChild() {
              if (!this._control)
                throw Error(
                  "mat-form-field must contain a MatFormFieldControl."
                );
            }
            updateOutlineGap() {
              const t = this._label ? this._label.nativeElement : null;
              if (
                "outline" !== this.appearance ||
                !t ||
                !t.children.length ||
                !t.textContent.trim()
              )
                return;
              if (!this._platform.isBrowser) return;
              if (!this._isAttachedToDOM())
                return void (this._outlineGapCalculationNeededImmediately = !0);
              let e = 0,
                n = 0;
              const i = this._connectionContainerRef.nativeElement,
                s = i.querySelectorAll(".mat-form-field-outline-start"),
                r = i.querySelectorAll(".mat-form-field-outline-gap");
              if (this._label && this._label.nativeElement.children.length) {
                const s = i.getBoundingClientRect();
                if (0 === s.width && 0 === s.height)
                  return (
                    (this._outlineGapCalculationNeededOnStable = !0),
                    void (this._outlineGapCalculationNeededImmediately = !1)
                  );
                const r = this._getStartEnd(s),
                  o = t.children,
                  a = this._getStartEnd(o[0].getBoundingClientRect());
                let l = 0;
                for (let t = 0; t < o.length; t++) l += o[t].offsetWidth;
                (e = Math.abs(a - r) - 5), (n = l > 0 ? 0.75 * l + 10 : 0);
              }
              for (let o = 0; o < s.length; o++) s[o].style.width = e + "px";
              for (let o = 0; o < r.length; o++) r[o].style.width = n + "px";
              this._outlineGapCalculationNeededOnStable = this._outlineGapCalculationNeededImmediately = !1;
            }
            _getStartEnd(t) {
              return this._dir && "rtl" === this._dir.value ? t.right : t.left;
            }
            _isAttachedToDOM() {
              const t = this._elementRef.nativeElement;
              if (t.getRootNode) {
                const e = t.getRootNode();
                return e && e !== t;
              }
              return document.documentElement.contains(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                jr(jo),
                jr(lr),
                jr(Ky, 8),
                jr(Ty, 8),
                jr(Ob, 8),
                jr(I_),
                jr(Cl),
                jr(Dd, 8)
              );
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["mat-form-field"]],
              contentQueries: function (t, e, n) {
                var i;
                1 & t &&
                  (Ka(n, bb, !0),
                  Qa(n, bb, !0),
                  Ka(n, xb, !0),
                  Qa(n, xb, !0),
                  Ka(n, Cb, !0),
                  Ka(n, _b, !0),
                  Ka(n, wb, !0),
                  Ka(n, Sb, !0),
                  Ka(n, kb, !0)),
                  2 & t &&
                    (qa((i = Ya())) && (e._controlNonStatic = i.first),
                    qa((i = Ya())) && (e._controlStatic = i.first),
                    qa((i = Ya())) && (e._labelChildNonStatic = i.first),
                    qa((i = Ya())) && (e._labelChildStatic = i.first),
                    qa((i = Ya())) && (e._placeholderChild = i.first),
                    qa((i = Ya())) && (e._errorChildren = i),
                    qa((i = Ya())) && (e._hintChildren = i),
                    qa((i = Ya())) && (e._prefixChildren = i),
                    qa((i = Ya())) && (e._suffixChildren = i));
              },
              viewQuery: function (t, e) {
                var n;
                1 & t && (Ga(tb, !0), Wa(eb, !0), Ga(nb, !0), Ga(ib, !0)),
                  2 & t &&
                    (qa((n = Ya())) && (e.underlineRef = n.first),
                    qa((n = Ya())) && (e._connectionContainerRef = n.first),
                    qa((n = Ya())) && (e._inputContainerRef = n.first),
                    qa((n = Ya())) && (e._label = n.first));
              },
              hostAttrs: [1, "mat-form-field"],
              hostVars: 44,
              hostBindings: function (t, e) {
                2 & t &&
                  co(
                    "mat-form-field-appearance-standard",
                    "standard" == e.appearance
                  )("mat-form-field-appearance-fill", "fill" == e.appearance)(
                    "mat-form-field-appearance-outline",
                    "outline" == e.appearance
                  )(
                    "mat-form-field-appearance-legacy",
                    "legacy" == e.appearance
                  )("mat-form-field-invalid", e._control.errorState)(
                    "mat-form-field-can-float",
                    e._canLabelFloat
                  )("mat-form-field-should-float", e._shouldLabelFloat())(
                    "mat-form-field-has-label",
                    e._hasFloatingLabel()
                  )(
                    "mat-form-field-hide-placeholder",
                    e._hideControlPlaceholder()
                  )("mat-form-field-disabled", e._control.disabled)(
                    "mat-form-field-autofilled",
                    e._control.autofilled
                  )("mat-focused", e._control.focused)(
                    "mat-accent",
                    "accent" == e.color
                  )("mat-warn", "warn" == e.color)(
                    "ng-untouched",
                    e._shouldForward("untouched")
                  )("ng-touched", e._shouldForward("touched"))(
                    "ng-pristine",
                    e._shouldForward("pristine")
                  )("ng-dirty", e._shouldForward("dirty"))(
                    "ng-valid",
                    e._shouldForward("valid")
                  )("ng-invalid", e._shouldForward("invalid"))(
                    "ng-pending",
                    e._shouldForward("pending")
                  )("_mat-animation-noopable", !e._animationsEnabled);
              },
              inputs: {
                color: "color",
                floatLabel: "floatLabel",
                appearance: "appearance",
                hideRequiredMarker: "hideRequiredMarker",
                hintLabel: "hintLabel",
              },
              exportAs: ["matFormField"],
              features: [No([{ provide: Ib, useExisting: t }]), xo],
              ngContentSelectors: gb,
              decls: 15,
              vars: 8,
              consts: [
                [1, "mat-form-field-wrapper"],
                [1, "mat-form-field-flex", 3, "click"],
                ["connectionContainer", ""],
                [4, "ngIf"],
                ["class", "mat-form-field-prefix", 4, "ngIf"],
                [1, "mat-form-field-infix"],
                ["inputContainer", ""],
                [1, "mat-form-field-label-wrapper"],
                [
                  "class",
                  "mat-form-field-label",
                  3,
                  "cdkObserveContentDisabled",
                  "id",
                  "mat-empty",
                  "mat-form-field-empty",
                  "mat-accent",
                  "mat-warn",
                  "ngSwitch",
                  "cdkObserveContent",
                  4,
                  "ngIf",
                ],
                ["class", "mat-form-field-suffix", 4, "ngIf"],
                ["class", "mat-form-field-underline", 4, "ngIf"],
                [1, "mat-form-field-subscript-wrapper", 3, "ngSwitch"],
                [4, "ngSwitchCase"],
                ["class", "mat-form-field-hint-wrapper", 4, "ngSwitchCase"],
                [1, "mat-form-field-outline"],
                [1, "mat-form-field-outline-start"],
                [1, "mat-form-field-outline-gap"],
                [1, "mat-form-field-outline-end"],
                [1, "mat-form-field-outline", "mat-form-field-outline-thick"],
                [1, "mat-form-field-prefix"],
                [
                  1,
                  "mat-form-field-label",
                  3,
                  "cdkObserveContentDisabled",
                  "id",
                  "ngSwitch",
                  "cdkObserveContent",
                ],
                ["label", ""],
                [
                  "class",
                  "mat-placeholder-required mat-form-field-required-marker",
                  "aria-hidden",
                  "true",
                  4,
                  "ngIf",
                ],
                [
                  "aria-hidden",
                  "true",
                  1,
                  "mat-placeholder-required",
                  "mat-form-field-required-marker",
                ],
                [1, "mat-form-field-suffix"],
                [1, "mat-form-field-underline"],
                ["underline", ""],
                [1, "mat-form-field-ripple"],
                [1, "mat-form-field-hint-wrapper"],
                ["class", "mat-hint", 3, "id", 4, "ngIf"],
                [1, "mat-form-field-hint-spacer"],
                [1, "mat-hint", 3, "id"],
              ],
              template: function (t, e) {
                1 & t &&
                  (io(mb),
                  Br(0, "div", 0),
                  Br(1, "div", 1, 2),
                  Qr("click", function (t) {
                    return (
                      e._control.onContainerClick &&
                      e._control.onContainerClick(t)
                    );
                  }),
                  Lr(3, sb, 9, 0, "ng-container", 3),
                  Lr(4, rb, 2, 0, "div", 4),
                  Br(5, "div", 5, 6),
                  so(7),
                  Br(8, "span", 7),
                  Lr(9, cb, 5, 16, "label", 8),
                  Ur(),
                  Ur(),
                  Lr(10, hb, 2, 0, "div", 9),
                  Ur(),
                  Lr(11, ub, 3, 4, "div", 10),
                  Br(12, "div", 11),
                  Lr(13, db, 2, 1, "div", 12),
                  Lr(14, fb, 5, 2, "div", 13),
                  Ur(),
                  Ur()),
                  2 & t &&
                    (Fi(3),
                    $r("ngIf", "outline" == e.appearance),
                    Fi(1),
                    $r("ngIf", e._prefixChildren.length),
                    Fi(5),
                    $r("ngIf", e._hasFloatingLabel()),
                    Fi(1),
                    $r("ngIf", e._suffixChildren.length),
                    Fi(1),
                    $r("ngIf", "outline" != e.appearance),
                    Fi(1),
                    $r("ngSwitch", e._getDisplayedMessages()),
                    Fi(1),
                    $r("ngSwitchCase", "error"),
                    Fi(1),
                    $r("ngSwitchCase", "hint"));
              },
              directives: [Ec, Ic, Pc, q_],
              styles: [
                ".mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none;position:relative}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0;width:180px}.cdk-high-contrast-active .mat-form-field-infix{border-image:linear-gradient(transparent, transparent)}.mat-form-field-label-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}[dir=rtl] .mat-form-field-label-wrapper{left:auto;right:0}.mat-form-field-label{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform-origin:0 0;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),color 400ms cubic-bezier(0.25, 0.8, 0.25, 1),width 400ms cubic-bezier(0.25, 0.8, 0.25, 1);display:none}[dir=rtl] .mat-form-field-label{transform-origin:100% 0;left:auto;right:0}.mat-form-field-empty.mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:block;transition:none}.mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float .mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:block}.mat-form-field-label:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;width:100%;pointer-events:none;transform:scale3d(1, 1.0001, 1)}.mat-form-field-ripple{position:absolute;left:0;width:100%;transform-origin:50%;transform:scaleX(0.5);opacity:0;transition:background-color 300ms cubic-bezier(0.55, 0, 0.55, 0.2)}.mat-form-field.mat-focused .mat-form-field-ripple,.mat-form-field.mat-form-field-invalid .mat-form-field-ripple{opacity:1;transform:scaleX(1);transition:transform 300ms cubic-bezier(0.25, 0.8, 0.25, 1),opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 300ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-subscript-wrapper{position:absolute;box-sizing:border-box;width:100%;overflow:hidden}.mat-form-field-subscript-wrapper .mat-icon,.mat-form-field-label-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-form-field-control-wrapper{position:relative}.mat-form-field._mat-animation-noopable .mat-form-field-label,.mat-form-field._mat-animation-noopable .mat-form-field-ripple{transition:none}\n",
                '.mat-form-field-appearance-fill .mat-form-field-flex{border-radius:4px 4px 0 0;padding:.75em .75em 0 .75em}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-flex{outline:solid 1px}.mat-form-field-appearance-fill .mat-form-field-underline::before{content:"";display:block;position:absolute;bottom:0;height:1px;width:100%}.mat-form-field-appearance-fill .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-fill:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-fill._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}.mat-form-field-appearance-fill .mat-form-field-subscript-wrapper{padding:0 1em}\n',
                '.mat-input-element{font:inherit;background:transparent;color:currentColor;border:none;outline:none;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom;text-align:inherit}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element::-ms-clear,.mat-input-element::-ms-reveal{display:none}.mat-input-element,.mat-input-element::-webkit-search-cancel-button,.mat-input-element::-webkit-search-decoration,.mat-input-element::-webkit-search-results-button,.mat-input-element::-webkit-search-results-decoration{-webkit-appearance:none}.mat-input-element::-webkit-contacts-auto-fill-button,.mat-input-element::-webkit-caps-lock-indicator,.mat-input-element::-webkit-credentials-auto-fill-button{visibility:hidden}.mat-input-element[type=date],.mat-input-element[type=datetime],.mat-input-element[type=datetime-local],.mat-input-element[type=month],.mat-input-element[type=week],.mat-input-element[type=time]{line-height:1}.mat-input-element[type=date]::after,.mat-input-element[type=datetime]::after,.mat-input-element[type=datetime-local]::after,.mat-input-element[type=month]::after,.mat-input-element[type=week]::after,.mat-input-element[type=time]::after{content:" ";white-space:pre;width:1px}.mat-input-element::-webkit-inner-spin-button,.mat-input-element::-webkit-calendar-picker-indicator,.mat-input-element::-webkit-clear-button{font-size:.75em}.mat-input-element::placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-moz-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-moz-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element::-webkit-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-webkit-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-input-element:-ms-input-placeholder{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element:-ms-input-placeholder:-ms-input-placeholder{-ms-user-select:text}.mat-form-field-hide-placeholder .mat-input-element::placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-moz-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element::-webkit-input-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}.mat-form-field-hide-placeholder .mat-input-element:-ms-input-placeholder{color:transparent !important;-webkit-text-fill-color:transparent;transition:none}textarea.mat-input-element{resize:vertical;overflow:auto}textarea.mat-input-element.cdk-textarea-autosize{resize:none}textarea.mat-input-element{padding:2px 0;margin:-2px 0}select.mat-input-element{-moz-appearance:none;-webkit-appearance:none;position:relative;background-color:transparent;display:inline-flex;box-sizing:border-box;padding-top:1em;top:-1em;margin-bottom:-1em}select.mat-input-element::-ms-expand{display:none}select.mat-input-element::-moz-focus-inner{border:0}select.mat-input-element:not(:disabled){cursor:pointer}select.mat-input-element::-ms-value{color:inherit;background:none}.mat-focused .cdk-high-contrast-active select.mat-input-element::-ms-value{color:inherit}.mat-form-field-type-mat-native-select .mat-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;position:absolute;top:50%;right:0;margin-top:-2.5px;pointer-events:none}[dir=rtl] .mat-form-field-type-mat-native-select .mat-form-field-infix::after{right:auto;left:0}.mat-form-field-type-mat-native-select .mat-input-element{padding-right:15px}[dir=rtl] .mat-form-field-type-mat-native-select .mat-input-element{padding-right:0;padding-left:15px}.mat-form-field-type-mat-native-select .mat-form-field-label-wrapper{max-width:calc(100% - 10px)}.mat-form-field-type-mat-native-select.mat-form-field-appearance-outline .mat-form-field-infix::after{margin-top:-5px}.mat-form-field-type-mat-native-select.mat-form-field-appearance-fill .mat-form-field-infix::after{margin-top:-10px}\n',
                ".mat-form-field-appearance-legacy .mat-form-field-label{transform:perspective(100px);-ms-transform:none}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-appearance-legacy .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-legacy .mat-form-field-ripple{top:0;height:2px;overflow:hidden}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}.cdk-high-contrast-active .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}.mat-form-field-appearance-legacy.mat-form-field-invalid:not(.mat-focused) .mat-form-field-ripple{height:1px}\n",
                ".mat-form-field-appearance-outline .mat-form-field-wrapper{margin:.25em 0}.mat-form-field-appearance-outline .mat-form-field-flex{padding:0 .75em 0 .75em;margin-top:-0.25em;position:relative}.mat-form-field-appearance-outline .mat-form-field-prefix,.mat-form-field-appearance-outline .mat-form-field-suffix{top:.25em}.mat-form-field-appearance-outline .mat-form-field-outline{display:flex;position:absolute;top:.25em;left:0;right:0;bottom:0;pointer-events:none}.mat-form-field-appearance-outline .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-end{border:1px solid currentColor;min-width:5px}.mat-form-field-appearance-outline .mat-form-field-outline-start{border-radius:5px 0 0 5px;border-right-style:none}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-start{border-right-style:solid;border-left-style:none;border-radius:0 5px 5px 0}.mat-form-field-appearance-outline .mat-form-field-outline-end{border-radius:0 5px 5px 0;border-left-style:none;flex-grow:1}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-end{border-left-style:solid;border-right-style:none;border-radius:5px 0 0 5px}.mat-form-field-appearance-outline .mat-form-field-outline-gap{border-radius:.000001px;border:1px solid currentColor;border-left-style:none;border-right-style:none}.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-outline-gap{border-top-color:transparent}.mat-form-field-appearance-outline .mat-form-field-outline-thick{opacity:0}.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-end,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-gap{border-width:2px}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline{opacity:0;transition:opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline{opacity:0;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline .mat-form-field-subscript-wrapper{padding:0 1em}.mat-form-field-appearance-outline._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-start,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-end,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-gap{transition:none}\n",
                ".mat-form-field-appearance-standard .mat-form-field-flex{padding-top:.75em}.mat-form-field-appearance-standard .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-standard .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-ripple{height:0;border-top:2px}.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:transparent}.cdk-high-contrast-active .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}.mat-form-field-appearance-standard:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-standard._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}\n",
              ],
              encapsulation: 2,
              data: { animation: [yb.transitionMessages] },
              changeDetection: 0,
            })),
            t
          );
        })(),
        Rb = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[jc, Dy, W_], Dy],
            })),
            t
          );
        })();
      class Db {
        constructor(t) {
          this.durationSelector = t;
        }
        call(t, e) {
          return e.subscribe(new Nb(t, this.durationSelector));
        }
      }
      class Nb extends N {
        constructor(t, e) {
          super(t), (this.durationSelector = e), (this.hasValue = !1);
        }
        _next(t) {
          if (((this.value = t), (this.hasValue = !0), !this.throttled)) {
            let n;
            try {
              const { durationSelector: e } = this;
              n = e(t);
            } catch (e) {
              return this.destination.error(e);
            }
            const i = D(this, n);
            !i || i.closed
              ? this.clearThrottle()
              : this.add((this.throttled = i));
          }
        }
        clearThrottle() {
          const { value: t, hasValue: e, throttled: n } = this;
          n && (this.remove(n), (this.throttled = null), n.unsubscribe()),
            e &&
              ((this.value = null),
              (this.hasValue = !1),
              this.destination.next(t));
        }
        notifyNext(t, e, n, i) {
          this.clearThrottle();
        }
        notifyComplete() {
          this.clearThrottle();
        }
      }
      function Fb(t) {
        return !l(t) && t - parseFloat(t) + 1 >= 0;
      }
      function Lb(t) {
        const { index: e, period: n, subscriber: i } = t;
        if ((i.next(e), !i.closed)) {
          if (-1 === n) return i.complete();
          (t.index = e + 1), this.schedule(t, n);
        }
      }
      function Mb(t, e = j_) {
        return (
          (n = () =>
            (function (t = 0, e, n) {
              let i = -1;
              return (
                Fb(e) ? (i = Number(e) < 1 ? 1 : Number(e)) : k(e) && (n = e),
                k(n) || (n = j_),
                new y((e) => {
                  const s = Fb(t) ? t : +t - n.now();
                  return n.schedule(Lb, s, {
                    index: 0,
                    period: i,
                    subscriber: e,
                  });
                })
              );
            })(t, e)),
          function (t) {
            return t.lift(new Db(n));
          }
        );
        var n;
      }
      const jb = L_({ passive: !0 });
      let Vb = (() => {
          class t {
            constructor(t, e) {
              (this._platform = t),
                (this._ngZone = e),
                (this._monitoredElements = new Map());
            }
            monitor(t) {
              if (!this._platform.isBrowser) return Ud;
              const e = u_(t),
                n = this._monitoredElements.get(e);
              if (n) return n.subject.asObservable();
              const i = new C(),
                s = "cdk-text-field-autofilled",
                r = (t) => {
                  "cdk-text-field-autofill-start" !== t.animationName ||
                  e.classList.contains(s)
                    ? "cdk-text-field-autofill-end" === t.animationName &&
                      e.classList.contains(s) &&
                      (e.classList.remove(s),
                      this._ngZone.run(() =>
                        i.next({ target: t.target, isAutofilled: !1 })
                      ))
                    : (e.classList.add(s),
                      this._ngZone.run(() =>
                        i.next({ target: t.target, isAutofilled: !0 })
                      ));
                };
              return (
                this._ngZone.runOutsideAngular(() => {
                  e.addEventListener("animationstart", r, jb),
                    e.classList.add("cdk-text-field-autofill-monitored");
                }),
                this._monitoredElements.set(e, {
                  subject: i,
                  unlisten: () => {
                    e.removeEventListener("animationstart", r, jb);
                  },
                }),
                i.asObservable()
              );
            }
            stopMonitoring(t) {
              const e = u_(t),
                n = this._monitoredElements.get(e);
              n &&
                (n.unlisten(),
                n.subject.complete(),
                e.classList.remove("cdk-text-field-autofill-monitored"),
                e.classList.remove("cdk-text-field-autofilled"),
                this._monitoredElements.delete(e));
            }
            ngOnDestroy() {
              this._monitoredElements.forEach((t, e) => this.stopMonitoring(e));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(I_), Wt(Cl));
            }),
            (t.ɵprov = lt({
              factory: function () {
                return new t(Wt(I_), Wt(Cl));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        $b = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[P_]],
            })),
            t
          );
        })();
      function Hb(t, e) {
        return new y((n) => {
          const i = t.length;
          if (0 === i) return void n.complete();
          const s = new Array(i);
          let r = 0,
            o = 0;
          for (let a = 0; a < i; a++) {
            const l = V(t[a]);
            let c = !1;
            n.add(
              l.subscribe({
                next: (t) => {
                  c || ((c = !0), o++), (s[a] = t);
                },
                error: (t) => n.error(t),
                complete: () => {
                  r++,
                    (r !== i && c) ||
                      (o === i &&
                        n.next(
                          e ? e.reduce((t, e, n) => ((t[e] = s[n]), t), {}) : s
                        ),
                      n.complete());
                },
              })
            );
          }
        });
      }
      const Bb = new Lt("NgValueAccessor");
      let Ub = (() => {
          class t {
            get value() {
              return this.control ? this.control.value : null;
            }
            get valid() {
              return this.control ? this.control.valid : null;
            }
            get invalid() {
              return this.control ? this.control.invalid : null;
            }
            get pending() {
              return this.control ? this.control.pending : null;
            }
            get disabled() {
              return this.control ? this.control.disabled : null;
            }
            get enabled() {
              return this.control ? this.control.enabled : null;
            }
            get errors() {
              return this.control ? this.control.errors : null;
            }
            get pristine() {
              return this.control ? this.control.pristine : null;
            }
            get dirty() {
              return this.control ? this.control.dirty : null;
            }
            get touched() {
              return this.control ? this.control.touched : null;
            }
            get status() {
              return this.control ? this.control.status : null;
            }
            get untouched() {
              return this.control ? this.control.untouched : null;
            }
            get statusChanges() {
              return this.control ? this.control.statusChanges : null;
            }
            get valueChanges() {
              return this.control ? this.control.valueChanges : null;
            }
            get path() {
              return null;
            }
            reset(t) {
              this.control && this.control.reset(t);
            }
            hasError(t, e) {
              return !!this.control && this.control.hasError(t, e);
            }
            getError(t, e) {
              return this.control ? this.control.getError(t, e) : null;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = _e({ type: t })),
            t
          );
        })(),
        zb = (() => {
          class t extends Ub {
            get formDirective() {
              return null;
            }
            get path() {
              return null;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return qb(e || t);
            }),
            (t.ɵdir = _e({ type: t, features: [xo] })),
            t
          );
        })();
      const qb = li(zb);
      function Wb() {
        throw new Error("unimplemented");
      }
      class Gb extends Ub {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null),
            (this._rawValidators = []),
            (this._rawAsyncValidators = []);
        }
        get validator() {
          return Wb();
        }
        get asyncValidator() {
          return Wb();
        }
      }
      function Zb(t) {
        return null == t || 0 === t.length;
      }
      function Kb(t) {
        return null != t && "number" == typeof t.length;
      }
      const Qb = new Lt("NgValidators"),
        Xb = new Lt("NgAsyncValidators"),
        Yb = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class Jb {
        static min(t) {
          return (e) => {
            if (Zb(e.value) || Zb(t)) return null;
            const n = parseFloat(e.value);
            return !isNaN(n) && n < t
              ? { min: { min: t, actual: e.value } }
              : null;
          };
        }
        static max(t) {
          return (e) => {
            if (Zb(e.value) || Zb(t)) return null;
            const n = parseFloat(e.value);
            return !isNaN(n) && n > t
              ? { max: { max: t, actual: e.value } }
              : null;
          };
        }
        static required(t) {
          return Zb(t.value) ? { required: !0 } : null;
        }
        static requiredTrue(t) {
          return !0 === t.value ? null : { required: !0 };
        }
        static email(t) {
          return Zb(t.value) || Yb.test(t.value) ? null : { email: !0 };
        }
        static minLength(t) {
          return (e) =>
            Zb(e.value) || !Kb(e.value)
              ? null
              : e.value.length < t
              ? {
                  minlength: {
                    requiredLength: t,
                    actualLength: e.value.length,
                  },
                }
              : null;
        }
        static maxLength(t) {
          return (e) =>
            Kb(e.value) && e.value.length > t
              ? {
                  maxlength: {
                    requiredLength: t,
                    actualLength: e.value.length,
                  },
                }
              : null;
        }
        static pattern(t) {
          if (!t) return Jb.nullValidator;
          let e, n;
          return (
            "string" == typeof t
              ? ((n = ""),
                "^" !== t.charAt(0) && (n += "^"),
                (n += t),
                "$" !== t.charAt(t.length - 1) && (n += "$"),
                (e = new RegExp(n)))
              : ((n = t.toString()), (e = t)),
            (t) => {
              if (Zb(t.value)) return null;
              const i = t.value;
              return e.test(i)
                ? null
                : { pattern: { requiredPattern: n, actualValue: i } };
            }
          );
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          if (!t) return null;
          const e = t.filter(tv);
          return 0 == e.length
            ? null
            : function (t) {
                return nv(
                  (function (t, e) {
                    return e.map((e) => e(t));
                  })(t, e)
                );
              };
        }
        static composeAsync(t) {
          if (!t) return null;
          const e = t.filter(tv);
          return 0 == e.length
            ? null
            : function (t) {
                return (function (...t) {
                  if (1 === t.length) {
                    const e = t[0];
                    if (l(e)) return Hb(e, null);
                    if (c(e) && Object.getPrototypeOf(e) === Object.prototype) {
                      const t = Object.keys(e);
                      return Hb(
                        t.map((t) => e[t]),
                        t
                      );
                    }
                  }
                  if ("function" == typeof t[t.length - 1]) {
                    const e = t.pop();
                    return Hb(
                      (t = 1 === t.length && l(t[0]) ? t[0] : t),
                      null
                    ).pipe(F((t) => e(...t)));
                  }
                  return Hb(t, null);
                })(
                  (function (t, e) {
                    return e.map((e) => e(t));
                  })(t, e).map(ev)
                ).pipe(F(nv));
              };
        }
      }
      function tv(t) {
        return null != t;
      }
      function ev(t) {
        const e = Zr(t) ? V(t) : t;
        if (!Kr(e))
          throw new Error(
            "Expected validator to return Promise or Observable."
          );
        return e;
      }
      function nv(t) {
        let e = {};
        return (
          t.forEach((t) => {
            e = null != t ? Object.assign(Object.assign({}, e), t) : e;
          }),
          0 === Object.keys(e).length ? null : e
        );
      }
      function iv(t) {
        return t.validate ? (e) => t.validate(e) : t;
      }
      function sv(t) {
        return t.validate ? (e) => t.validate(e) : t;
      }
      let rv = (() => {
        class t {
          constructor() {
            this._accessors = [];
          }
          add(t, e) {
            this._accessors.push([t, e]);
          }
          remove(t) {
            for (let e = this._accessors.length - 1; e >= 0; --e)
              if (this._accessors[e][1] === t)
                return void this._accessors.splice(e, 1);
          }
          select(t) {
            this._accessors.forEach((e) => {
              this._isSameGroup(e, t) &&
                e[1] !== t &&
                e[1].fireUncheck(t.value);
            });
          }
          _isSameGroup(t, e) {
            return (
              !!t[0].control &&
              t[0]._parent === e._control._parent &&
              t[1].name === e.name
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ov =
          '\n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });',
        av =
          '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });';
      function lv(t, e) {
        t || dv(e, "Cannot find control with"),
          e.valueAccessor || dv(e, "No value accessor for form control with"),
          (t.validator = Jb.compose([t.validator, e.validator])),
          (t.asyncValidator = Jb.composeAsync([
            t.asyncValidator,
            e.asyncValidator,
          ])),
          e.valueAccessor.writeValue(t.value),
          (function (t, e) {
            e.valueAccessor.registerOnChange((n) => {
              (t._pendingValue = n),
                (t._pendingChange = !0),
                (t._pendingDirty = !0),
                "change" === t.updateOn && cv(t, e);
            });
          })(t, e),
          (function (t, e) {
            t.registerOnChange((t, n) => {
              e.valueAccessor.writeValue(t), n && e.viewToModelUpdate(t);
            });
          })(t, e),
          (function (t, e) {
            e.valueAccessor.registerOnTouched(() => {
              (t._pendingTouched = !0),
                "blur" === t.updateOn && t._pendingChange && cv(t, e),
                "submit" !== t.updateOn && t.markAsTouched();
            });
          })(t, e),
          e.valueAccessor.setDisabledState &&
            t.registerOnDisabledChange((t) => {
              e.valueAccessor.setDisabledState(t);
            }),
          e._rawValidators.forEach((e) => {
            e.registerOnValidatorChange &&
              e.registerOnValidatorChange(() => t.updateValueAndValidity());
          }),
          e._rawAsyncValidators.forEach((e) => {
            e.registerOnValidatorChange &&
              e.registerOnValidatorChange(() => t.updateValueAndValidity());
          });
      }
      function cv(t, e) {
        t._pendingDirty && t.markAsDirty(),
          t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(t._pendingValue),
          (t._pendingChange = !1);
      }
      function hv(t, e) {
        null == t && dv(e, "Cannot find control with"),
          (t.validator = Jb.compose([t.validator, e.validator])),
          (t.asyncValidator = Jb.composeAsync([
            t.asyncValidator,
            e.asyncValidator,
          ]));
      }
      function uv(t) {
        return dv(
          t,
          "There is no FormControl instance attached to form control element with"
        );
      }
      function dv(t, e) {
        let n;
        throw (
          ((n =
            t.path.length > 1
              ? `path: '${t.path.join(" -> ")}'`
              : t.path[0]
              ? `name: '${t.path}'`
              : "unspecified name attribute"),
          new Error(`${e} ${n}`))
        );
      }
      function pv(t) {
        return null != t ? Jb.compose(t.map(iv)) : null;
      }
      function fv(t) {
        return null != t ? Jb.composeAsync(t.map(sv)) : null;
      }
      function mv(t, e) {
        t._syncPendingControls(),
          e.forEach((t) => {
            const e = t.control;
            "submit" === e.updateOn &&
              e._pendingChange &&
              (t.viewToModelUpdate(e._pendingValue), (e._pendingChange = !1));
          });
      }
      function gv(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      function _v(t) {
        const e = bv(t) ? t.validators : t;
        return Array.isArray(e) ? pv(e) : e || null;
      }
      function yv(t, e) {
        const n = bv(e) ? e.asyncValidators : t;
        return Array.isArray(n) ? fv(n) : n || null;
      }
      function bv(t) {
        return null != t && !Array.isArray(t) && "object" == typeof t;
      }
      class vv {
        constructor(t, e) {
          (this.validator = t),
            (this.asyncValidator = e),
            (this._onCollectionChange = () => {}),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []);
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return "VALID" === this.status;
        }
        get invalid() {
          return "INVALID" === this.status;
        }
        get pending() {
          return "PENDING" == this.status;
        }
        get disabled() {
          return "DISABLED" === this.status;
        }
        get enabled() {
          return "DISABLED" !== this.status;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this.validator = _v(t);
        }
        setAsyncValidators(t) {
          this.asyncValidator = yv(t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((t) => {
              t.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((t) => {
              t.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = "PENDING"),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = "DISABLED"),
            (this.errors = null),
            this._forEachChild((e) => {
              e.disable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach((t) => t(!0));
        }
        enable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = "VALID"),
            this._forEachChild((e) => {
              e.enable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach((t) => t(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              ("VALID" !== this.status && "PENDING" !== this.status) ||
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((e) => e._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? "DISABLED" : "VALID";
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            this.status = "PENDING";
            const e = ev(this.asyncValidator(this));
            this._asyncValidationSubscription = e.subscribe((e) =>
              this.setErrors(e, { emitEvent: t })
            );
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            this._asyncValidationSubscription.unsubscribe();
        }
        setErrors(t, e = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== e.emitEvent);
        }
        get(t) {
          return (function (t, e, n) {
            if (null == e) return null;
            if (
              (Array.isArray(e) || (e = e.split(".")),
              Array.isArray(e) && 0 === e.length)
            )
              return null;
            let i = t;
            return (
              e.forEach((t) => {
                i =
                  i instanceof xv
                    ? i.controls.hasOwnProperty(t)
                      ? i.controls[t]
                      : null
                    : (i instanceof Cv && i.at(t)) || null;
              }),
              i
            );
          })(this, t);
        }
        getError(t, e) {
          const n = e ? this.get(e) : this;
          return n && n.errors ? n.errors[t] : null;
        }
        hasError(t, e) {
          return !!this.getError(t, e);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new Na()), (this.statusChanges = new Na());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? "DISABLED"
            : this.errors
            ? "INVALID"
            : this._anyControlsHaveStatus("PENDING")
            ? "PENDING"
            : this._anyControlsHaveStatus("INVALID")
            ? "INVALID"
            : "VALID";
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((e) => e.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _isBoxedValue(t) {
          return (
            "object" == typeof t &&
            null !== t &&
            2 === Object.keys(t).length &&
            "value" in t &&
            "disabled" in t
          );
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          bv(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            this._parent &&
            this._parent.dirty &&
            !this._parent._anyControlsDirty()
          );
        }
      }
      class wv extends vv {
        constructor(t = null, e, n) {
          super(_v(e), yv(n, e)),
            (this._onChange = []),
            this._applyFormState(t),
            this._setUpdateStrategy(e),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 }),
            this._initObservables();
        }
        setValue(t, e = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== e.emitModelToViewChange &&
              this._onChange.forEach((t) =>
                t(this.value, !1 !== e.emitViewToModelChange)
              ),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          this.setValue(t, e);
        }
        reset(t = null, e = {}) {
          this._applyFormState(t),
            this.markAsPristine(e),
            this.markAsUntouched(e),
            this.setValue(this.value, e),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _clearChangeFns() {
          (this._onChange = []),
            (this._onDisabledChange = []),
            (this._onCollectionChange = () => {});
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(t) {
          this._isBoxedValue(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      }
      class xv extends vv {
        constructor(t, e, n) {
          super(_v(e), yv(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        registerControl(t, e) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = e),
              e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange),
              e);
        }
        addControl(t, e) {
          this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        removeControl(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            e && this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            Object.keys(t).forEach((n) => {
              this._throwIfControlMissing(n),
                this.controls[n].setValue(t[n], {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          Object.keys(t).forEach((n) => {
            this.controls[n] &&
              this.controls[n].patchValue(t[n], {
                onlySelf: !0,
                emitEvent: e.emitEvent,
              });
          }),
            this.updateValueAndValidity(e);
        }
        reset(t = {}, e = {}) {
          this._forEachChild((n, i) => {
            n.reset(t[i], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => (
              (t[n] = e instanceof wv ? e.value : e.getRawValue()), t
            )
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (t, e) => !!e._syncPendingControls() || t
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!Object.keys(this.controls).length)
            throw new Error(
              "\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.controls[t])
            throw new Error(`Cannot find form control with name: ${t}.`);
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((e) => t(this.controls[e], e));
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const e of Object.keys(this.controls)) {
            const n = this.controls[e];
            if (this.contains(e) && t(n)) return !0;
          }
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => ((e.enabled || this.disabled) && (t[n] = e.value), t)
          );
        }
        _reduceChildren(t, e) {
          let n = t;
          return (
            this._forEachChild((t, i) => {
              n = e(n, t, i);
            }),
            n
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control with name: '${n}'.`
              );
          });
        }
      }
      class Cv extends vv {
        constructor(t, e, n) {
          super(_v(e), yv(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        at(t) {
          return this.controls[t];
        }
        push(t) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        insert(t, e) {
          this.controls.splice(t, 0, e),
            this._registerControl(e),
            this.updateValueAndValidity();
        }
        removeAt(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            this.updateValueAndValidity();
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            e && (this.controls.splice(t, 0, e), this._registerControl(e)),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            t.forEach((t, n) => {
              this._throwIfControlMissing(n),
                this.at(n).setValue(t, {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          t.forEach((t, n) => {
            this.at(n) &&
              this.at(n).patchValue(t, {
                onlySelf: !0,
                emitEvent: e.emitEvent,
              });
          }),
            this.updateValueAndValidity(e);
        }
        reset(t = [], e = {}) {
          this._forEachChild((n, i) => {
            n.reset(t[i], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this.controls.map((t) =>
            t instanceof wv ? t.value : t.getRawValue()
          );
        }
        clear() {
          this.controls.length < 1 ||
            (this._forEachChild((t) => t._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity());
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (t, e) => !!e._syncPendingControls() || t,
            !1
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!this.controls.length)
            throw new Error(
              "\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.at(t))
            throw new Error("Cannot find form control at index " + t);
        }
        _forEachChild(t) {
          this.controls.forEach((e, n) => {
            t(e, n);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((t) => t.enabled || this.disabled)
            .map((t) => t.value);
        }
        _anyControls(t) {
          return this.controls.some((e) => e.enabled && t(e));
        }
        _setUpControls() {
          this._forEachChild((t) => this._registerControl(t));
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control at index: ${n}.`
              );
          });
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange);
        }
      }
      const Sv = { provide: zb, useExisting: wt(() => Ev) },
        kv = (() => Promise.resolve(null))();
      let Ev = (() => {
        class t extends zb {
          constructor(t, e) {
            super(),
              (this.submitted = !1),
              (this._directives = []),
              (this.ngSubmit = new Na()),
              (this.form = new xv({}, pv(t), fv(e)));
          }
          ngAfterViewInit() {
            this._setUpdateStrategy();
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          get controls() {
            return this.form.controls;
          }
          addControl(t) {
            kv.then(() => {
              const e = this._findContainer(t.path);
              (t.control = e.registerControl(t.name, t.control)),
                lv(t.control, t),
                t.control.updateValueAndValidity({ emitEvent: !1 }),
                this._directives.push(t);
            });
          }
          getControl(t) {
            return this.form.get(t.path);
          }
          removeControl(t) {
            kv.then(() => {
              const e = this._findContainer(t.path);
              e && e.removeControl(t.name), gv(this._directives, t);
            });
          }
          addFormGroup(t) {
            kv.then(() => {
              const e = this._findContainer(t.path),
                n = new xv({});
              hv(n, t),
                e.registerControl(t.name, n),
                n.updateValueAndValidity({ emitEvent: !1 });
            });
          }
          removeFormGroup(t) {
            kv.then(() => {
              const e = this._findContainer(t.path);
              e && e.removeControl(t.name);
            });
          }
          getFormGroup(t) {
            return this.form.get(t.path);
          }
          updateModel(t, e) {
            kv.then(() => {
              this.form.get(t.path).setValue(e);
            });
          }
          setValue(t) {
            this.control.setValue(t);
          }
          onSubmit(t) {
            return (
              (this.submitted = !0),
              mv(this.form, this._directives),
              this.ngSubmit.emit(t),
              !1
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(t) {
            this.form.reset(t), (this.submitted = !1);
          }
          _setUpdateStrategy() {
            this.options &&
              null != this.options.updateOn &&
              (this.form._updateOn = this.options.updateOn);
          }
          _findContainer(t) {
            return t.pop(), t.length ? this.form.get(t) : this.form;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(jr(Qb, 10), jr(Xb, 10));
          }),
          (t.ɵdir = _e({
            type: t,
            selectors: [
              ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
              ["ng-form"],
              ["", "ngForm", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                Qr("submit", function (t) {
                  return e.onSubmit(t);
                })("reset", function () {
                  return e.onReset();
                });
            },
            inputs: { options: ["ngFormOptions", "options"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [No([Sv]), xo],
          })),
          t
        );
      })();
      const Tv = { provide: zb, useExisting: wt(() => Av) };
      let Av = (() => {
          class t extends zb {
            constructor(t, e) {
              super(),
                (this._validators = t),
                (this._asyncValidators = e),
                (this.submitted = !1),
                (this.directives = []),
                (this.form = null),
                (this.ngSubmit = new Na());
            }
            ngOnChanges(t) {
              this._checkFormPresent(),
                t.hasOwnProperty("form") &&
                  (this._updateValidators(),
                  this._updateDomValue(),
                  this._updateRegistrations());
            }
            get formDirective() {
              return this;
            }
            get control() {
              return this.form;
            }
            get path() {
              return [];
            }
            addControl(t) {
              const e = this.form.get(t.path);
              return (
                lv(e, t),
                e.updateValueAndValidity({ emitEvent: !1 }),
                this.directives.push(t),
                e
              );
            }
            getControl(t) {
              return this.form.get(t.path);
            }
            removeControl(t) {
              gv(this.directives, t);
            }
            addFormGroup(t) {
              const e = this.form.get(t.path);
              hv(e, t), e.updateValueAndValidity({ emitEvent: !1 });
            }
            removeFormGroup(t) {}
            getFormGroup(t) {
              return this.form.get(t.path);
            }
            addFormArray(t) {
              const e = this.form.get(t.path);
              hv(e, t), e.updateValueAndValidity({ emitEvent: !1 });
            }
            removeFormArray(t) {}
            getFormArray(t) {
              return this.form.get(t.path);
            }
            updateModel(t, e) {
              this.form.get(t.path).setValue(e);
            }
            onSubmit(t) {
              return (
                (this.submitted = !0),
                mv(this.form, this.directives),
                this.ngSubmit.emit(t),
                !1
              );
            }
            onReset() {
              this.resetForm();
            }
            resetForm(t) {
              this.form.reset(t), (this.submitted = !1);
            }
            _updateDomValue() {
              this.directives.forEach((t) => {
                const e = this.form.get(t.path);
                t.control !== e &&
                  ((function (t, e) {
                    e.valueAccessor.registerOnChange(() => uv(e)),
                      e.valueAccessor.registerOnTouched(() => uv(e)),
                      e._rawValidators.forEach((t) => {
                        t.registerOnValidatorChange &&
                          t.registerOnValidatorChange(null);
                      }),
                      e._rawAsyncValidators.forEach((t) => {
                        t.registerOnValidatorChange &&
                          t.registerOnValidatorChange(null);
                      }),
                      t && t._clearChangeFns();
                  })(t.control, t),
                  e && lv(e, t),
                  (t.control = e));
              }),
                this.form._updateTreeValidity({ emitEvent: !1 });
            }
            _updateRegistrations() {
              this.form._registerOnCollectionChange(() =>
                this._updateDomValue()
              ),
                this._oldForm &&
                  this._oldForm._registerOnCollectionChange(() => {}),
                (this._oldForm = this.form);
            }
            _updateValidators() {
              const t = pv(this._validators);
              this.form.validator = Jb.compose([this.form.validator, t]);
              const e = fv(this._asyncValidators);
              this.form.asyncValidator = Jb.composeAsync([
                this.form.asyncValidator,
                e,
              ]);
            }
            _checkFormPresent() {
              this.form ||
                class {
                  static controlParentException() {
                    throw new Error(
                      "formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " +
                        ov
                    );
                  }
                  static ngModelGroupException() {
                    throw new Error(
                      `formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a "form" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        ${av}\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        \n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>`
                    );
                  }
                  static missingFormException() {
                    throw new Error(
                      "formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       " +
                        ov
                    );
                  }
                  static groupParentException() {
                    throw new Error(
                      "formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " +
                        av
                    );
                  }
                  static arrayParentException() {
                    throw new Error(
                      'formArrayName must be used with a parent formGroup directive.  You\'ll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        \n    <div [formGroup]="myGroup">\n      <div formArrayName="cities">\n        <div *ngFor="let city of cityArray.controls; index as i">\n          <input [formControlName]="i">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl(\'SF\')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });'
                    );
                  }
                  static disabledAttrWarning() {
                    console.warn(
                      "\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n\n      Example:\n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    "
                    );
                  }
                  static ngModelWarning(t) {
                    console.warn(
                      `\n    It looks like you're using ngModel on the same form field as ${t}.\n    Support for using the ngModel input property and ngModelChange event with\n    reactive form directives has been deprecated in Angular v6 and will be removed\n    in a future version of Angular.\n\n    For more information on this, see our API docs here:\n    https://angular.io/api/forms/${
                        "formControl" === t
                          ? "FormControlDirective"
                          : "FormControlName"
                      }#use-with-ngmodel\n    `
                    );
                  }
                }.missingFormException();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(jr(Qb, 10), jr(Xb, 10));
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [["", "formGroup", ""]],
              hostBindings: function (t, e) {
                1 & t &&
                  Qr("submit", function (t) {
                    return e.onSubmit(t);
                  })("reset", function () {
                    return e.onReset();
                  });
              },
              inputs: { form: ["formGroup", "form"] },
              outputs: { ngSubmit: "ngSubmit" },
              exportAs: ["ngForm"],
              features: [No([Tv]), xo, Ie],
            })),
            t
          );
        })(),
        Ov = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })(),
        Iv = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [rv],
              imports: [Ov],
            })),
            t
          );
        })();
      const Pv = new Lt("MAT_INPUT_VALUE_ACCESSOR"),
        Rv = [
          "button",
          "checkbox",
          "file",
          "hidden",
          "image",
          "radio",
          "range",
          "reset",
          "submit",
        ];
      let Dv = 0;
      class Nv {
        constructor(t, e, n, i) {
          (this._defaultErrorStateMatcher = t),
            (this._parentForm = e),
            (this._parentFormGroup = n),
            (this.ngControl = i);
        }
      }
      const Fv = jy(Nv);
      let Lv = (() => {
          class t extends Fv {
            constructor(t, e, n, i, s, r, o, a, l, c) {
              super(r, i, s, n),
                (this._elementRef = t),
                (this._platform = e),
                (this.ngControl = n),
                (this._autofillMonitor = a),
                (this._formField = c),
                (this._uid = "mat-input-" + Dv++),
                (this.focused = !1),
                (this.stateChanges = new C()),
                (this.controlType = "mat-input"),
                (this.autofilled = !1),
                (this._disabled = !1),
                (this._required = !1),
                (this._type = "text"),
                (this._readonly = !1),
                (this._neverEmptyInputTypes = [
                  "date",
                  "datetime",
                  "datetime-local",
                  "month",
                  "time",
                  "week",
                ].filter((t) => D_().has(t)));
              const h = this._elementRef.nativeElement,
                u = h.nodeName.toLowerCase();
              (this._inputValueAccessor = o || h),
                (this._previousNativeValue = this.value),
                (this.id = this.id),
                e.IOS &&
                  l.runOutsideAngular(() => {
                    t.nativeElement.addEventListener("keyup", (t) => {
                      let e = t.target;
                      e.value ||
                        e.selectionStart ||
                        e.selectionEnd ||
                        (e.setSelectionRange(1, 1), e.setSelectionRange(0, 0));
                    });
                  }),
                (this._isServer = !this._platform.isBrowser),
                (this._isNativeSelect = "select" === u),
                (this._isTextarea = "textarea" === u),
                this._isNativeSelect &&
                  (this.controlType = h.multiple
                    ? "mat-native-select-multiple"
                    : "mat-native-select");
            }
            get disabled() {
              return this.ngControl && null !== this.ngControl.disabled
                ? this.ngControl.disabled
                : this._disabled;
            }
            set disabled(t) {
              (this._disabled = a_(t)),
                this.focused && ((this.focused = !1), this.stateChanges.next());
            }
            get id() {
              return this._id;
            }
            set id(t) {
              this._id = t || this._uid;
            }
            get required() {
              return this._required;
            }
            set required(t) {
              this._required = a_(t);
            }
            get type() {
              return this._type;
            }
            set type(t) {
              (this._type = t || "text"),
                this._validateType(),
                !this._isTextarea &&
                  D_().has(this._type) &&
                  (this._elementRef.nativeElement.type = this._type);
            }
            get value() {
              return this._inputValueAccessor.value;
            }
            set value(t) {
              t !== this.value &&
                ((this._inputValueAccessor.value = t),
                this.stateChanges.next());
            }
            get readonly() {
              return this._readonly;
            }
            set readonly(t) {
              this._readonly = a_(t);
            }
            ngAfterViewInit() {
              this._platform.isBrowser &&
                this._autofillMonitor
                  .monitor(this._elementRef.nativeElement)
                  .subscribe((t) => {
                    (this.autofilled = t.isAutofilled),
                      this.stateChanges.next();
                  });
            }
            ngOnChanges() {
              this.stateChanges.next();
            }
            ngOnDestroy() {
              this.stateChanges.complete(),
                this._platform.isBrowser &&
                  this._autofillMonitor.stopMonitoring(
                    this._elementRef.nativeElement
                  );
            }
            ngDoCheck() {
              this.ngControl && this.updateErrorState(),
                this._dirtyCheckNativeValue(),
                this._dirtyCheckPlaceholder();
            }
            focus(t) {
              this._elementRef.nativeElement.focus(t);
            }
            _focusChanged(t) {
              t === this.focused ||
                (this.readonly && t) ||
                ((this.focused = t), this.stateChanges.next());
            }
            _onInput() {}
            _dirtyCheckPlaceholder() {
              const t = this._formField,
                e = t && t._hideControlPlaceholder() ? null : this.placeholder;
              if (e !== this._previousPlaceholder) {
                const t = this._elementRef.nativeElement;
                (this._previousPlaceholder = e),
                  e
                    ? t.setAttribute("placeholder", e)
                    : t.removeAttribute("placeholder");
              }
            }
            _dirtyCheckNativeValue() {
              const t = this._elementRef.nativeElement.value;
              this._previousNativeValue !== t &&
                ((this._previousNativeValue = t), this.stateChanges.next());
            }
            _validateType() {
              if (Rv.indexOf(this._type) > -1)
                throw Error(
                  `Input type "${this._type}" isn't supported by matInput.`
                );
            }
            _isNeverEmpty() {
              return this._neverEmptyInputTypes.indexOf(this._type) > -1;
            }
            _isBadInput() {
              let t = this._elementRef.nativeElement.validity;
              return t && t.badInput;
            }
            get empty() {
              return !(
                this._isNeverEmpty() ||
                this._elementRef.nativeElement.value ||
                this._isBadInput() ||
                this.autofilled
              );
            }
            get shouldLabelFloat() {
              if (this._isNativeSelect) {
                const t = this._elementRef.nativeElement,
                  e = t.options[0];
                return (
                  this.focused ||
                  t.multiple ||
                  !this.empty ||
                  !!(t.selectedIndex > -1 && e && e.label)
                );
              }
              return this.focused || !this.empty;
            }
            setDescribedByIds(t) {
              this._ariaDescribedby = t.join(" ");
            }
            onContainerClick() {
              this.focused || this.focus();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                jr(jo),
                jr(I_),
                jr(Gb, 10),
                jr(Ev, 8),
                jr(Av, 8),
                jr(Vy),
                jr(Pv, 10),
                jr(Vb),
                jr(Cl),
                jr(Pb, 8)
              );
            }),
            (t.ɵdir = _e({
              type: t,
              selectors: [
                ["input", "matInput", ""],
                ["textarea", "matInput", ""],
                ["select", "matNativeControl", ""],
                ["input", "matNativeControl", ""],
                ["textarea", "matNativeControl", ""],
              ],
              hostAttrs: [
                1,
                "mat-input-element",
                "mat-form-field-autofill-control",
              ],
              hostVars: 10,
              hostBindings: function (t, e) {
                1 & t &&
                  Qr("focus", function () {
                    return e._focusChanged(!0);
                  })("blur", function () {
                    return e._focusChanged(!1);
                  })("input", function () {
                    return e._onInput();
                  }),
                  2 & t &&
                    (bo("disabled", e.disabled)("required", e.required),
                    Fr("id", e.id)("data-placeholder", e.placeholder)(
                      "readonly",
                      (e.readonly && !e._isNativeSelect) || null
                    )("aria-describedby", e._ariaDescribedby || null)(
                      "aria-invalid",
                      e.errorState
                    )("aria-required", e.required.toString()),
                    co("mat-input-server", e._isServer));
              },
              inputs: {
                id: "id",
                disabled: "disabled",
                required: "required",
                type: "type",
                value: "value",
                readonly: "readonly",
                placeholder: "placeholder",
                errorStateMatcher: "errorStateMatcher",
              },
              exportAs: ["matInput"],
              features: [No([{ provide: bb, useExisting: t }]), xo, Ie],
            })),
            t
          );
        })(),
        Mv = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [Vy],
              imports: [[$b, Rb], $b, Rb],
            })),
            t
          );
        })(),
        jv = (() => {
          class t {
            constructor(t, e, n) {
              (this._ngZone = t),
                (this._platform = e),
                (this._scrolled = new C()),
                (this._globalSubscription = null),
                (this._scrolledCount = 0),
                (this.scrollContainers = new Map()),
                (this._document = n);
            }
            register(t) {
              this.scrollContainers.has(t) ||
                this.scrollContainers.set(
                  t,
                  t.elementScrolled().subscribe(() => this._scrolled.next(t))
                );
            }
            deregister(t) {
              const e = this.scrollContainers.get(t);
              e && (e.unsubscribe(), this.scrollContainers.delete(t));
            }
            scrolled(t = 20) {
              return this._platform.isBrowser
                ? new y((e) => {
                    this._globalSubscription || this._addGlobalListener();
                    const n =
                      t > 0
                        ? this._scrolled.pipe(Mb(t)).subscribe(e)
                        : this._scrolled.subscribe(e);
                    return (
                      this._scrolledCount++,
                      () => {
                        n.unsubscribe(),
                          this._scrolledCount--,
                          this._scrolledCount || this._removeGlobalListener();
                      }
                    );
                  })
                : Ld();
            }
            ngOnDestroy() {
              this._removeGlobalListener(),
                this.scrollContainers.forEach((t, e) => this.deregister(e)),
                this._scrolled.complete();
            }
            ancestorScrolled(t, e) {
              const n = this.getAncestorScrollContainers(t);
              return this.scrolled(e).pipe(Gd((t) => !t || n.indexOf(t) > -1));
            }
            getAncestorScrollContainers(t) {
              const e = [];
              return (
                this.scrollContainers.forEach((n, i) => {
                  this._scrollableContainsElement(i, t) && e.push(i);
                }),
                e
              );
            }
            _getDocument() {
              return this._document || document;
            }
            _getWindow() {
              return this._getDocument().defaultView || window;
            }
            _scrollableContainsElement(t, e) {
              let n = e.nativeElement,
                i = t.getElementRef().nativeElement;
              do {
                if (n == i) return !0;
              } while ((n = n.parentElement));
              return !1;
            }
            _addGlobalListener() {
              this._globalSubscription = this._ngZone.runOutsideAngular(() =>
                Qy(this._getWindow().document, "scroll").subscribe(() =>
                  this._scrolled.next()
                )
              );
            }
            _removeGlobalListener() {
              this._globalSubscription &&
                (this._globalSubscription.unsubscribe(),
                (this._globalSubscription = null));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Cl), Wt(I_), Wt(tc, 8));
            }),
            (t.ɵprov = lt({
              factory: function () {
                return new t(Wt(Cl), Wt(I_), Wt(tc, 8));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Vv = (() => {
          class t {
            constructor(t, e, n) {
              (this._platform = t),
                (this._change = new C()),
                (this._changeListener = (t) => {
                  this._change.next(t);
                }),
                (this._document = n),
                e.runOutsideAngular(() => {
                  if (t.isBrowser) {
                    const t = this._getWindow();
                    t.addEventListener("resize", this._changeListener),
                      t.addEventListener(
                        "orientationchange",
                        this._changeListener
                      );
                  }
                  this.change().subscribe(() => this._updateViewportSize());
                });
            }
            ngOnDestroy() {
              if (this._platform.isBrowser) {
                const t = this._getWindow();
                t.removeEventListener("resize", this._changeListener),
                  t.removeEventListener(
                    "orientationchange",
                    this._changeListener
                  );
              }
              this._change.complete();
            }
            getViewportSize() {
              this._viewportSize || this._updateViewportSize();
              const t = {
                width: this._viewportSize.width,
                height: this._viewportSize.height,
              };
              return this._platform.isBrowser || (this._viewportSize = null), t;
            }
            getViewportRect() {
              const t = this.getViewportScrollPosition(),
                { width: e, height: n } = this.getViewportSize();
              return {
                top: t.top,
                left: t.left,
                bottom: t.top + n,
                right: t.left + e,
                height: n,
                width: e,
              };
            }
            getViewportScrollPosition() {
              if (!this._platform.isBrowser) return { top: 0, left: 0 };
              const t = this._getDocument(),
                e = this._getWindow(),
                n = t.documentElement,
                i = n.getBoundingClientRect();
              return {
                top:
                  -i.top || t.body.scrollTop || e.scrollY || n.scrollTop || 0,
                left:
                  -i.left ||
                  t.body.scrollLeft ||
                  e.scrollX ||
                  n.scrollLeft ||
                  0,
              };
            }
            change(t = 20) {
              return t > 0 ? this._change.pipe(Mb(t)) : this._change;
            }
            _getDocument() {
              return this._document || document;
            }
            _getWindow() {
              return this._getDocument().defaultView || window;
            }
            _updateViewportSize() {
              const t = this._getWindow();
              this._viewportSize = this._platform.isBrowser
                ? { width: t.innerWidth, height: t.innerHeight }
                : { width: 0, height: 0 };
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(I_), Wt(Cl), Wt(tc, 8));
            }),
            (t.ɵprov = lt({
              factory: function () {
                return new t(Wt(I_), Wt(Cl), Wt(tc, 8));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        $v = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })(),
        Hv = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[Ay, P_, $v], Ay, $v],
            })),
            t
          );
        })();
      class Bv {
        constructor(t, e) {
          (this._viewportRuler = t),
            (this._previousHTMLStyles = { top: "", left: "" }),
            (this._isEnabled = !1),
            (this._document = e);
        }
        attach() {}
        enable() {
          if (this._canBeEnabled()) {
            const t = this._document.documentElement;
            (this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition()),
              (this._previousHTMLStyles.left = t.style.left || ""),
              (this._previousHTMLStyles.top = t.style.top || ""),
              (t.style.left = h_(-this._previousScrollPosition.left)),
              (t.style.top = h_(-this._previousScrollPosition.top)),
              t.classList.add("cdk-global-scrollblock"),
              (this._isEnabled = !0);
          }
        }
        disable() {
          if (this._isEnabled) {
            const t = this._document.documentElement,
              e = t.style,
              n = this._document.body.style,
              i = e.scrollBehavior || "",
              s = n.scrollBehavior || "";
            (this._isEnabled = !1),
              (e.left = this._previousHTMLStyles.left),
              (e.top = this._previousHTMLStyles.top),
              t.classList.remove("cdk-global-scrollblock"),
              (e.scrollBehavior = n.scrollBehavior = "auto"),
              window.scroll(
                this._previousScrollPosition.left,
                this._previousScrollPosition.top
              ),
              (e.scrollBehavior = i),
              (n.scrollBehavior = s);
          }
        }
        _canBeEnabled() {
          if (
            this._document.documentElement.classList.contains(
              "cdk-global-scrollblock"
            ) ||
            this._isEnabled
          )
            return !1;
          const t = this._document.body,
            e = this._viewportRuler.getViewportSize();
          return t.scrollHeight > e.height || t.scrollWidth > e.width;
        }
      }
      function Uv() {
        return Error("Scroll strategy has already been attached.");
      }
      class zv {
        constructor(t, e, n, i) {
          (this._scrollDispatcher = t),
            (this._ngZone = e),
            (this._viewportRuler = n),
            (this._config = i),
            (this._scrollSubscription = null),
            (this._detach = () => {
              this.disable(),
                this._overlayRef.hasAttached() &&
                  this._ngZone.run(() => this._overlayRef.detach());
            });
        }
        attach(t) {
          if (this._overlayRef) throw Uv();
          this._overlayRef = t;
        }
        enable() {
          if (this._scrollSubscription) return;
          const t = this._scrollDispatcher.scrolled(0);
          this._config && this._config.threshold && this._config.threshold > 1
            ? ((this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top),
              (this._scrollSubscription = t.subscribe(() => {
                const t = this._viewportRuler.getViewportScrollPosition().top;
                Math.abs(t - this._initialScrollPosition) >
                this._config.threshold
                  ? this._detach()
                  : this._overlayRef.updatePosition();
              })))
            : (this._scrollSubscription = t.subscribe(this._detach));
        }
        disable() {
          this._scrollSubscription &&
            (this._scrollSubscription.unsubscribe(),
            (this._scrollSubscription = null));
        }
        detach() {
          this.disable(), (this._overlayRef = null);
        }
      }
      class qv {
        enable() {}
        disable() {}
        attach() {}
      }
      function Wv(t, e) {
        return e.some(
          (e) =>
            t.bottom < e.top ||
            t.top > e.bottom ||
            t.right < e.left ||
            t.left > e.right
        );
      }
      function Gv(t, e) {
        return e.some(
          (e) =>
            t.top < e.top ||
            t.bottom > e.bottom ||
            t.left < e.left ||
            t.right > e.right
        );
      }
      class Zv {
        constructor(t, e, n, i) {
          (this._scrollDispatcher = t),
            (this._viewportRuler = e),
            (this._ngZone = n),
            (this._config = i),
            (this._scrollSubscription = null);
        }
        attach(t) {
          if (this._overlayRef) throw Uv();
          this._overlayRef = t;
        }
        enable() {
          this._scrollSubscription ||
            (this._scrollSubscription = this._scrollDispatcher
              .scrolled(this._config ? this._config.scrollThrottle : 0)
              .subscribe(() => {
                if (
                  (this._overlayRef.updatePosition(),
                  this._config && this._config.autoClose)
                ) {
                  const t = this._overlayRef.overlayElement.getBoundingClientRect(),
                    {
                      width: e,
                      height: n,
                    } = this._viewportRuler.getViewportSize();
                  Wv(t, [
                    {
                      width: e,
                      height: n,
                      bottom: n,
                      right: e,
                      top: 0,
                      left: 0,
                    },
                  ]) &&
                    (this.disable(),
                    this._ngZone.run(() => this._overlayRef.detach()));
                }
              }));
        }
        disable() {
          this._scrollSubscription &&
            (this._scrollSubscription.unsubscribe(),
            (this._scrollSubscription = null));
        }
        detach() {
          this.disable(), (this._overlayRef = null);
        }
      }
      let Kv = (() => {
        class t {
          constructor(t, e, n, i) {
            (this._scrollDispatcher = t),
              (this._viewportRuler = e),
              (this._ngZone = n),
              (this.noop = () => new qv()),
              (this.close = (t) =>
                new zv(
                  this._scrollDispatcher,
                  this._ngZone,
                  this._viewportRuler,
                  t
                )),
              (this.block = () => new Bv(this._viewportRuler, this._document)),
              (this.reposition = (t) =>
                new Zv(
                  this._scrollDispatcher,
                  this._viewportRuler,
                  this._ngZone,
                  t
                )),
              (this._document = i);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(jv), Wt(Vv), Wt(Cl), Wt(tc));
          }),
          (t.ɵprov = lt({
            factory: function () {
              return new t(Wt(jv), Wt(Vv), Wt(Cl), Wt(tc));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      class Qv {
        constructor(t) {
          if (
            ((this.scrollStrategy = new qv()),
            (this.panelClass = ""),
            (this.hasBackdrop = !1),
            (this.backdropClass = "cdk-overlay-dark-backdrop"),
            (this.disposeOnNavigation = !1),
            (this.excludeFromOutsideClick = []),
            t)
          ) {
            const e = Object.keys(t);
            for (const n of e) void 0 !== t[n] && (this[n] = t[n]);
          }
        }
      }
      class Xv {
        constructor(t, e, n, i, s) {
          (this.offsetX = n),
            (this.offsetY = i),
            (this.panelClass = s),
            (this.originX = t.originX),
            (this.originY = t.originY),
            (this.overlayX = e.overlayX),
            (this.overlayY = e.overlayY);
        }
      }
      class Yv {
        constructor(t, e) {
          (this.connectionPair = t), (this.scrollableViewProperties = e);
        }
      }
      function Jv(t, e) {
        if ("top" !== e && "bottom" !== e && "center" !== e)
          throw Error(
            `ConnectedPosition: Invalid ${t} "${e}". Expected "top", "bottom" or "center".`
          );
      }
      function tw(t, e) {
        if ("start" !== e && "end" !== e && "center" !== e)
          throw Error(
            `ConnectedPosition: Invalid ${t} "${e}". Expected "start", "end" or "center".`
          );
      }
      let ew = (() => {
          class t {
            constructor(t) {
              (this._attachedOverlays = []), (this._document = t);
            }
            ngOnDestroy() {
              this.detach();
            }
            add(t) {
              this.remove(t), this._attachedOverlays.push(t);
            }
            remove(t) {
              const e = this._attachedOverlays.indexOf(t);
              e > -1 && this._attachedOverlays.splice(e, 1),
                0 === this._attachedOverlays.length && this.detach();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(tc));
            }),
            (t.ɵprov = lt({
              factory: function () {
                return new t(Wt(tc));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        nw = (() => {
          class t extends ew {
            constructor(t) {
              super(t),
                (this._keydownListener = (t) => {
                  const e = this._attachedOverlays;
                  for (let n = e.length - 1; n > -1; n--)
                    if (e[n]._keydownEvents.observers.length > 0) {
                      e[n]._keydownEvents.next(t);
                      break;
                    }
                });
            }
            add(t) {
              super.add(t),
                this._isAttached ||
                  (this._document.body.addEventListener(
                    "keydown",
                    this._keydownListener
                  ),
                  (this._isAttached = !0));
            }
            detach() {
              this._isAttached &&
                (this._document.body.removeEventListener(
                  "keydown",
                  this._keydownListener
                ),
                (this._isAttached = !1));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(tc));
            }),
            (t.ɵprov = lt({
              factory: function () {
                return new t(Wt(tc));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        iw = (() => {
          class t extends ew {
            constructor(t, e) {
              super(t),
                (this._platform = e),
                (this._cursorStyleIsSet = !1),
                (this._clickListener = (t) => {
                  const e = t.composedPath ? t.composedPath()[0] : t.target,
                    n = this._attachedOverlays;
                  for (let i = n.length - 1; i > -1; i--) {
                    const s = n[i];
                    if (!(s._outsidePointerEvents.observers.length < 1)) {
                      if (
                        [
                          ...s.getConfig().excludeFromOutsideClick,
                          s.overlayElement,
                        ].some((t) => t.contains(e))
                      )
                        break;
                      s._outsidePointerEvents.next(t);
                    }
                  }
                });
            }
            add(t) {
              super.add(t),
                this._isAttached ||
                  (this._document.body.addEventListener(
                    "click",
                    this._clickListener,
                    !0
                  ),
                  this._platform.IOS &&
                    !this._cursorStyleIsSet &&
                    ((this._cursorOriginalValue = this._document.body.style.cursor),
                    (this._document.body.style.cursor = "pointer"),
                    (this._cursorStyleIsSet = !0)),
                  (this._isAttached = !0));
            }
            detach() {
              this._isAttached &&
                (this._document.body.removeEventListener(
                  "click",
                  this._clickListener,
                  !0
                ),
                this._platform.IOS &&
                  this._cursorStyleIsSet &&
                  ((this._document.body.style.cursor = this._cursorOriginalValue),
                  (this._cursorStyleIsSet = !1)),
                (this._isAttached = !1));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(tc), Wt(I_));
            }),
            (t.ɵprov = lt({
              factory: function () {
                return new t(Wt(tc), Wt(I_));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })();
      const sw = !(
        "undefined" == typeof window ||
        !window ||
        (!window.__karma__ && !window.jasmine)
      );
      let rw = (() => {
        class t {
          constructor(t, e) {
            (this._platform = e), (this._document = t);
          }
          ngOnDestroy() {
            const t = this._containerElement;
            t && t.parentNode && t.parentNode.removeChild(t);
          }
          getContainerElement() {
            return (
              this._containerElement || this._createContainer(),
              this._containerElement
            );
          }
          _createContainer() {
            const t = this._platform
              ? this._platform.isBrowser
              : "undefined" != typeof window;
            if (t || sw) {
              const t = this._document.querySelectorAll(
                '.cdk-overlay-container[platform="server"], .cdk-overlay-container[platform="test"]'
              );
              for (let e = 0; e < t.length; e++)
                t[e].parentNode.removeChild(t[e]);
            }
            const e = this._document.createElement("div");
            e.classList.add("cdk-overlay-container"),
              sw
                ? e.setAttribute("platform", "test")
                : t || e.setAttribute("platform", "server"),
              this._document.body.appendChild(e),
              (this._containerElement = e);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(tc), Wt(I_));
          }),
          (t.ɵprov = lt({
            factory: function () {
              return new t(Wt(tc), Wt(I_));
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      class ow {
        constructor(t, e, n, i, s, r, o, a, l) {
          (this._portalOutlet = t),
            (this._host = e),
            (this._pane = n),
            (this._config = i),
            (this._ngZone = s),
            (this._keyboardDispatcher = r),
            (this._document = o),
            (this._location = a),
            (this._outsideClickDispatcher = l),
            (this._backdropElement = null),
            (this._backdropClick = new C()),
            (this._attachments = new C()),
            (this._detachments = new C()),
            (this._locationChanges = u.EMPTY),
            (this._backdropClickHandler = (t) => this._backdropClick.next(t)),
            (this._keydownEvents = new C()),
            (this._outsidePointerEvents = new C()),
            i.scrollStrategy &&
              ((this._scrollStrategy = i.scrollStrategy),
              this._scrollStrategy.attach(this)),
            (this._positionStrategy = i.positionStrategy);
        }
        get overlayElement() {
          return this._pane;
        }
        get backdropElement() {
          return this._backdropElement;
        }
        get hostElement() {
          return this._host;
        }
        attach(t) {
          let e = this._portalOutlet.attach(t);
          return (
            !this._host.parentElement &&
              this._previousHostParent &&
              this._previousHostParent.appendChild(this._host),
            this._positionStrategy && this._positionStrategy.attach(this),
            this._updateStackingOrder(),
            this._updateElementSize(),
            this._updateElementDirection(),
            this._scrollStrategy && this._scrollStrategy.enable(),
            this._ngZone.onStable
              .asObservable()
              .pipe(hp(1))
              .subscribe(() => {
                this.hasAttached() && this.updatePosition();
              }),
            this._togglePointerEvents(!0),
            this._config.hasBackdrop && this._attachBackdrop(),
            this._config.panelClass &&
              this._toggleClasses(this._pane, this._config.panelClass, !0),
            this._attachments.next(),
            this._keyboardDispatcher.add(this),
            this._config.disposeOnNavigation &&
              this._location &&
              (this._locationChanges = this._location.subscribe(() =>
                this.dispose()
              )),
            this._outsideClickDispatcher &&
              this._outsideClickDispatcher.add(this),
            e
          );
        }
        detach() {
          if (!this.hasAttached()) return;
          this.detachBackdrop(),
            this._togglePointerEvents(!1),
            this._positionStrategy &&
              this._positionStrategy.detach &&
              this._positionStrategy.detach(),
            this._scrollStrategy && this._scrollStrategy.disable();
          const t = this._portalOutlet.detach();
          return (
            this._detachments.next(),
            this._keyboardDispatcher.remove(this),
            this._detachContentWhenStable(),
            this._locationChanges.unsubscribe(),
            this._outsideClickDispatcher &&
              this._outsideClickDispatcher.remove(this),
            t
          );
        }
        dispose() {
          const t = this.hasAttached();
          this._positionStrategy && this._positionStrategy.dispose(),
            this._disposeScrollStrategy(),
            this.detachBackdrop(),
            this._locationChanges.unsubscribe(),
            this._keyboardDispatcher.remove(this),
            this._portalOutlet.dispose(),
            this._attachments.complete(),
            this._backdropClick.complete(),
            this._keydownEvents.complete(),
            this._outsidePointerEvents.complete(),
            this._outsideClickDispatcher &&
              this._outsideClickDispatcher.remove(this),
            this._host &&
              this._host.parentNode &&
              (this._host.parentNode.removeChild(this._host),
              (this._host = null)),
            (this._previousHostParent = this._pane = null),
            t && this._detachments.next(),
            this._detachments.complete();
        }
        hasAttached() {
          return this._portalOutlet.hasAttached();
        }
        backdropClick() {
          return this._backdropClick.asObservable();
        }
        attachments() {
          return this._attachments.asObservable();
        }
        detachments() {
          return this._detachments.asObservable();
        }
        keydownEvents() {
          return this._keydownEvents.asObservable();
        }
        outsidePointerEvents() {
          return this._outsidePointerEvents.asObservable();
        }
        getConfig() {
          return this._config;
        }
        updatePosition() {
          this._positionStrategy && this._positionStrategy.apply();
        }
        updatePositionStrategy(t) {
          t !== this._positionStrategy &&
            (this._positionStrategy && this._positionStrategy.dispose(),
            (this._positionStrategy = t),
            this.hasAttached() && (t.attach(this), this.updatePosition()));
        }
        updateSize(t) {
          (this._config = Object.assign(Object.assign({}, this._config), t)),
            this._updateElementSize();
        }
        setDirection(t) {
          (this._config = Object.assign(Object.assign({}, this._config), {
            direction: t,
          })),
            this._updateElementDirection();
        }
        addPanelClass(t) {
          this._pane && this._toggleClasses(this._pane, t, !0);
        }
        removePanelClass(t) {
          this._pane && this._toggleClasses(this._pane, t, !1);
        }
        getDirection() {
          const t = this._config.direction;
          return t ? ("string" == typeof t ? t : t.value) : "ltr";
        }
        updateScrollStrategy(t) {
          t !== this._scrollStrategy &&
            (this._disposeScrollStrategy(),
            (this._scrollStrategy = t),
            this.hasAttached() && (t.attach(this), t.enable()));
        }
        _updateElementDirection() {
          this._host.setAttribute("dir", this.getDirection());
        }
        _updateElementSize() {
          if (!this._pane) return;
          const t = this._pane.style;
          (t.width = h_(this._config.width)),
            (t.height = h_(this._config.height)),
            (t.minWidth = h_(this._config.minWidth)),
            (t.minHeight = h_(this._config.minHeight)),
            (t.maxWidth = h_(this._config.maxWidth)),
            (t.maxHeight = h_(this._config.maxHeight));
        }
        _togglePointerEvents(t) {
          this._pane.style.pointerEvents = t ? "auto" : "none";
        }
        _attachBackdrop() {
          (this._backdropElement = this._document.createElement("div")),
            this._backdropElement.classList.add("cdk-overlay-backdrop"),
            this._config.backdropClass &&
              this._toggleClasses(
                this._backdropElement,
                this._config.backdropClass,
                !0
              ),
            this._host.parentElement.insertBefore(
              this._backdropElement,
              this._host
            ),
            this._backdropElement.addEventListener(
              "click",
              this._backdropClickHandler
            ),
            "undefined" != typeof requestAnimationFrame
              ? this._ngZone.runOutsideAngular(() => {
                  requestAnimationFrame(() => {
                    this._backdropElement &&
                      this._backdropElement.classList.add(
                        "cdk-overlay-backdrop-showing"
                      );
                  });
                })
              : this._backdropElement.classList.add(
                  "cdk-overlay-backdrop-showing"
                );
        }
        _updateStackingOrder() {
          this._host.nextSibling &&
            this._host.parentNode.appendChild(this._host);
        }
        detachBackdrop() {
          let t,
            e = this._backdropElement;
          if (!e) return;
          let n = () => {
            e &&
              (e.removeEventListener("click", this._backdropClickHandler),
              e.removeEventListener("transitionend", n),
              e.parentNode && e.parentNode.removeChild(e)),
              this._backdropElement == e && (this._backdropElement = null),
              this._config.backdropClass &&
                this._toggleClasses(e, this._config.backdropClass, !1),
              clearTimeout(t);
          };
          e.classList.remove("cdk-overlay-backdrop-showing"),
            this._ngZone.runOutsideAngular(() => {
              e.addEventListener("transitionend", n);
            }),
            (e.style.pointerEvents = "none"),
            (t = this._ngZone.runOutsideAngular(() => setTimeout(n, 500)));
        }
        _toggleClasses(t, e, n) {
          const i = t.classList;
          c_(e).forEach((t) => {
            t && (n ? i.add(t) : i.remove(t));
          });
        }
        _detachContentWhenStable() {
          this._ngZone.runOutsideAngular(() => {
            const t = this._ngZone.onStable
              .asObservable()
              .pipe(Xy(q(this._attachments, this._detachments)))
              .subscribe(() => {
                (this._pane &&
                  this._host &&
                  0 !== this._pane.children.length) ||
                  (this._pane &&
                    this._config.panelClass &&
                    this._toggleClasses(
                      this._pane,
                      this._config.panelClass,
                      !1
                    ),
                  this._host &&
                    this._host.parentElement &&
                    ((this._previousHostParent = this._host.parentElement),
                    this._previousHostParent.removeChild(this._host)),
                  t.unsubscribe());
              });
          });
        }
        _disposeScrollStrategy() {
          const t = this._scrollStrategy;
          t && (t.disable(), t.detach && t.detach());
        }
      }
      const aw = /([A-Za-z%]+)$/;
      class lw {
        constructor(t, e, n, i, s) {
          (this._viewportRuler = e),
            (this._document = n),
            (this._platform = i),
            (this._overlayContainer = s),
            (this._lastBoundingBoxSize = { width: 0, height: 0 }),
            (this._isPushed = !1),
            (this._canPush = !0),
            (this._growAfterOpen = !1),
            (this._hasFlexibleDimensions = !0),
            (this._positionLocked = !1),
            (this._viewportMargin = 0),
            (this._scrollables = []),
            (this._preferredPositions = []),
            (this._positionChanges = new C()),
            (this._resizeSubscription = u.EMPTY),
            (this._offsetX = 0),
            (this._offsetY = 0),
            (this._appliedPanelClasses = []),
            (this.positionChanges = this._positionChanges.asObservable()),
            this.setOrigin(t);
        }
        get positions() {
          return this._preferredPositions;
        }
        attach(t) {
          if (this._overlayRef && t !== this._overlayRef)
            throw Error(
              "This position strategy is already attached to an overlay"
            );
          this._validatePositions(),
            t.hostElement.classList.add(
              "cdk-overlay-connected-position-bounding-box"
            ),
            (this._overlayRef = t),
            (this._boundingBox = t.hostElement),
            (this._pane = t.overlayElement),
            (this._isDisposed = !1),
            (this._isInitialRender = !0),
            (this._lastPosition = null),
            this._resizeSubscription.unsubscribe(),
            (this._resizeSubscription = this._viewportRuler
              .change()
              .subscribe(() => {
                (this._isInitialRender = !0), this.apply();
              }));
        }
        apply() {
          if (this._isDisposed || !this._platform.isBrowser) return;
          if (
            !this._isInitialRender &&
            this._positionLocked &&
            this._lastPosition
          )
            return void this.reapplyLastPosition();
          this._clearPanelClasses(),
            this._resetOverlayElementStyles(),
            this._resetBoundingBoxStyles(),
            (this._viewportRect = this._getNarrowedViewportRect()),
            (this._originRect = this._getOriginRect()),
            (this._overlayRect = this._pane.getBoundingClientRect());
          const t = this._originRect,
            e = this._overlayRect,
            n = this._viewportRect,
            i = [];
          let s;
          for (let r of this._preferredPositions) {
            let o = this._getOriginPoint(t, r),
              a = this._getOverlayPoint(o, e, r),
              l = this._getOverlayFit(a, e, n, r);
            if (l.isCompletelyWithinViewport)
              return (this._isPushed = !1), void this._applyPosition(r, o);
            this._canFitWithFlexibleDimensions(l, a, n)
              ? i.push({
                  position: r,
                  origin: o,
                  overlayRect: e,
                  boundingBoxRect: this._calculateBoundingBoxRect(o, r),
                })
              : (!s || s.overlayFit.visibleArea < l.visibleArea) &&
                (s = {
                  overlayFit: l,
                  overlayPoint: a,
                  originPoint: o,
                  position: r,
                  overlayRect: e,
                });
          }
          if (i.length) {
            let t = null,
              e = -1;
            for (const n of i) {
              const i =
                n.boundingBoxRect.width *
                n.boundingBoxRect.height *
                (n.position.weight || 1);
              i > e && ((e = i), (t = n));
            }
            return (
              (this._isPushed = !1),
              void this._applyPosition(t.position, t.origin)
            );
          }
          if (this._canPush)
            return (
              (this._isPushed = !0),
              void this._applyPosition(s.position, s.originPoint)
            );
          this._applyPosition(s.position, s.originPoint);
        }
        detach() {
          this._clearPanelClasses(),
            (this._lastPosition = null),
            (this._previousPushAmount = null),
            this._resizeSubscription.unsubscribe();
        }
        dispose() {
          this._isDisposed ||
            (this._boundingBox &&
              cw(this._boundingBox.style, {
                top: "",
                left: "",
                right: "",
                bottom: "",
                height: "",
                width: "",
                alignItems: "",
                justifyContent: "",
              }),
            this._pane && this._resetOverlayElementStyles(),
            this._overlayRef &&
              this._overlayRef.hostElement.classList.remove(
                "cdk-overlay-connected-position-bounding-box"
              ),
            this.detach(),
            this._positionChanges.complete(),
            (this._overlayRef = this._boundingBox = null),
            (this._isDisposed = !0));
        }
        reapplyLastPosition() {
          if (
            !this._isDisposed &&
            (!this._platform || this._platform.isBrowser)
          ) {
            (this._originRect = this._getOriginRect()),
              (this._overlayRect = this._pane.getBoundingClientRect()),
              (this._viewportRect = this._getNarrowedViewportRect());
            const t = this._lastPosition || this._preferredPositions[0],
              e = this._getOriginPoint(this._originRect, t);
            this._applyPosition(t, e);
          }
        }
        withScrollableContainers(t) {
          return (this._scrollables = t), this;
        }
        withPositions(t) {
          return (
            (this._preferredPositions = t),
            -1 === t.indexOf(this._lastPosition) && (this._lastPosition = null),
            this._validatePositions(),
            this
          );
        }
        withViewportMargin(t) {
          return (this._viewportMargin = t), this;
        }
        withFlexibleDimensions(t = !0) {
          return (this._hasFlexibleDimensions = t), this;
        }
        withGrowAfterOpen(t = !0) {
          return (this._growAfterOpen = t), this;
        }
        withPush(t = !0) {
          return (this._canPush = t), this;
        }
        withLockedPosition(t = !0) {
          return (this._positionLocked = t), this;
        }
        setOrigin(t) {
          return (this._origin = t), this;
        }
        withDefaultOffsetX(t) {
          return (this._offsetX = t), this;
        }
        withDefaultOffsetY(t) {
          return (this._offsetY = t), this;
        }
        withTransformOriginOn(t) {
          return (this._transformOriginSelector = t), this;
        }
        _getOriginPoint(t, e) {
          let n, i;
          if ("center" == e.originX) n = t.left + t.width / 2;
          else {
            const i = this._isRtl() ? t.right : t.left,
              s = this._isRtl() ? t.left : t.right;
            n = "start" == e.originX ? i : s;
          }
          return (
            (i =
              "center" == e.originY
                ? t.top + t.height / 2
                : "top" == e.originY
                ? t.top
                : t.bottom),
            { x: n, y: i }
          );
        }
        _getOverlayPoint(t, e, n) {
          let i, s;
          return (
            (i =
              "center" == n.overlayX
                ? -e.width / 2
                : "start" === n.overlayX
                ? this._isRtl()
                  ? -e.width
                  : 0
                : this._isRtl()
                ? 0
                : -e.width),
            (s =
              "center" == n.overlayY
                ? -e.height / 2
                : "top" == n.overlayY
                ? 0
                : -e.height),
            { x: t.x + i, y: t.y + s }
          );
        }
        _getOverlayFit(t, e, n, i) {
          let { x: s, y: r } = t,
            o = this._getOffset(i, "x"),
            a = this._getOffset(i, "y");
          o && (s += o), a && (r += a);
          let l = 0 - r,
            c = r + e.height - n.height,
            h = this._subtractOverflows(e.width, 0 - s, s + e.width - n.width),
            u = this._subtractOverflows(e.height, l, c),
            d = h * u;
          return {
            visibleArea: d,
            isCompletelyWithinViewport: e.width * e.height === d,
            fitsInViewportVertically: u === e.height,
            fitsInViewportHorizontally: h == e.width,
          };
        }
        _canFitWithFlexibleDimensions(t, e, n) {
          if (this._hasFlexibleDimensions) {
            const i = n.bottom - e.y,
              s = n.right - e.x,
              r = hw(this._overlayRef.getConfig().minHeight),
              o = hw(this._overlayRef.getConfig().minWidth),
              a = t.fitsInViewportHorizontally || (null != o && o <= s);
            return (t.fitsInViewportVertically || (null != r && r <= i)) && a;
          }
          return !1;
        }
        _pushOverlayOnScreen(t, e, n) {
          if (this._previousPushAmount && this._positionLocked)
            return {
              x: t.x + this._previousPushAmount.x,
              y: t.y + this._previousPushAmount.y,
            };
          const i = this._viewportRect,
            s = Math.max(t.x + e.width - i.right, 0),
            r = Math.max(t.y + e.height - i.bottom, 0),
            o = Math.max(i.top - n.top - t.y, 0),
            a = Math.max(i.left - n.left - t.x, 0);
          let l = 0,
            c = 0;
          return (
            (l =
              e.width <= i.width
                ? a || -s
                : t.x < this._viewportMargin
                ? i.left - n.left - t.x
                : 0),
            (c =
              e.height <= i.height
                ? o || -r
                : t.y < this._viewportMargin
                ? i.top - n.top - t.y
                : 0),
            (this._previousPushAmount = { x: l, y: c }),
            { x: t.x + l, y: t.y + c }
          );
        }
        _applyPosition(t, e) {
          if (
            (this._setTransformOrigin(t),
            this._setOverlayElementStyles(e, t),
            this._setBoundingBoxStyles(e, t),
            t.panelClass && this._addPanelClasses(t.panelClass),
            (this._lastPosition = t),
            this._positionChanges.observers.length)
          ) {
            const e = this._getScrollVisibility(),
              n = new Yv(t, e);
            this._positionChanges.next(n);
          }
          this._isInitialRender = !1;
        }
        _setTransformOrigin(t) {
          if (!this._transformOriginSelector) return;
          const e = this._boundingBox.querySelectorAll(
            this._transformOriginSelector
          );
          let n,
            i = t.overlayY;
          n =
            "center" === t.overlayX
              ? "center"
              : this._isRtl()
              ? "start" === t.overlayX
                ? "right"
                : "left"
              : "start" === t.overlayX
              ? "left"
              : "right";
          for (let s = 0; s < e.length; s++)
            e[s].style.transformOrigin = `${n} ${i}`;
        }
        _calculateBoundingBoxRect(t, e) {
          const n = this._viewportRect,
            i = this._isRtl();
          let s, r, o, a, l, c;
          if ("top" === e.overlayY)
            (r = t.y), (s = n.height - r + this._viewportMargin);
          else if ("bottom" === e.overlayY)
            (o = n.height - t.y + 2 * this._viewportMargin),
              (s = n.height - o + this._viewportMargin);
          else {
            const e = Math.min(n.bottom - t.y + n.top, t.y),
              i = this._lastBoundingBoxSize.height;
            (s = 2 * e),
              (r = t.y - e),
              s > i &&
                !this._isInitialRender &&
                !this._growAfterOpen &&
                (r = t.y - i / 2);
          }
          if (("end" === e.overlayX && !i) || ("start" === e.overlayX && i))
            (c = n.width - t.x + this._viewportMargin),
              (a = t.x - this._viewportMargin);
          else if (
            ("start" === e.overlayX && !i) ||
            ("end" === e.overlayX && i)
          )
            (l = t.x), (a = n.right - t.x);
          else {
            const e = Math.min(n.right - t.x + n.left, t.x),
              i = this._lastBoundingBoxSize.width;
            (a = 2 * e),
              (l = t.x - e),
              a > i &&
                !this._isInitialRender &&
                !this._growAfterOpen &&
                (l = t.x - i / 2);
          }
          return { top: r, left: l, bottom: o, right: c, width: a, height: s };
        }
        _setBoundingBoxStyles(t, e) {
          const n = this._calculateBoundingBoxRect(t, e);
          this._isInitialRender ||
            this._growAfterOpen ||
            ((n.height = Math.min(n.height, this._lastBoundingBoxSize.height)),
            (n.width = Math.min(n.width, this._lastBoundingBoxSize.width)));
          const i = {};
          if (this._hasExactPosition())
            (i.top = i.left = "0"),
              (i.bottom = i.right = i.maxHeight = i.maxWidth = ""),
              (i.width = i.height = "100%");
          else {
            const t = this._overlayRef.getConfig().maxHeight,
              s = this._overlayRef.getConfig().maxWidth;
            (i.height = h_(n.height)),
              (i.top = h_(n.top)),
              (i.bottom = h_(n.bottom)),
              (i.width = h_(n.width)),
              (i.left = h_(n.left)),
              (i.right = h_(n.right)),
              (i.alignItems =
                "center" === e.overlayX
                  ? "center"
                  : "end" === e.overlayX
                  ? "flex-end"
                  : "flex-start"),
              (i.justifyContent =
                "center" === e.overlayY
                  ? "center"
                  : "bottom" === e.overlayY
                  ? "flex-end"
                  : "flex-start"),
              t && (i.maxHeight = h_(t)),
              s && (i.maxWidth = h_(s));
          }
          (this._lastBoundingBoxSize = n), cw(this._boundingBox.style, i);
        }
        _resetBoundingBoxStyles() {
          cw(this._boundingBox.style, {
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            height: "",
            width: "",
            alignItems: "",
            justifyContent: "",
          });
        }
        _resetOverlayElementStyles() {
          cw(this._pane.style, {
            top: "",
            left: "",
            bottom: "",
            right: "",
            position: "",
            transform: "",
          });
        }
        _setOverlayElementStyles(t, e) {
          const n = {},
            i = this._hasExactPosition(),
            s = this._hasFlexibleDimensions,
            r = this._overlayRef.getConfig();
          if (i) {
            const i = this._viewportRuler.getViewportScrollPosition();
            cw(n, this._getExactOverlayY(e, t, i)),
              cw(n, this._getExactOverlayX(e, t, i));
          } else n.position = "static";
          let o = "",
            a = this._getOffset(e, "x"),
            l = this._getOffset(e, "y");
          a && (o += `translateX(${a}px) `),
            l && (o += `translateY(${l}px)`),
            (n.transform = o.trim()),
            r.maxHeight &&
              (i ? (n.maxHeight = h_(r.maxHeight)) : s && (n.maxHeight = "")),
            r.maxWidth &&
              (i ? (n.maxWidth = h_(r.maxWidth)) : s && (n.maxWidth = "")),
            cw(this._pane.style, n);
        }
        _getExactOverlayY(t, e, n) {
          let i = { top: "", bottom: "" },
            s = this._getOverlayPoint(e, this._overlayRect, t);
          this._isPushed &&
            (s = this._pushOverlayOnScreen(s, this._overlayRect, n));
          let r = this._overlayContainer
            .getContainerElement()
            .getBoundingClientRect().top;
          return (
            (s.y -= r),
            "bottom" === t.overlayY
              ? (i.bottom =
                  this._document.documentElement.clientHeight -
                  (s.y + this._overlayRect.height) +
                  "px")
              : (i.top = h_(s.y)),
            i
          );
        }
        _getExactOverlayX(t, e, n) {
          let i,
            s = { left: "", right: "" },
            r = this._getOverlayPoint(e, this._overlayRect, t);
          return (
            this._isPushed &&
              (r = this._pushOverlayOnScreen(r, this._overlayRect, n)),
            (i = this._isRtl()
              ? "end" === t.overlayX
                ? "left"
                : "right"
              : "end" === t.overlayX
              ? "right"
              : "left"),
            "right" === i
              ? (s.right =
                  this._document.documentElement.clientWidth -
                  (r.x + this._overlayRect.width) +
                  "px")
              : (s.left = h_(r.x)),
            s
          );
        }
        _getScrollVisibility() {
          const t = this._getOriginRect(),
            e = this._pane.getBoundingClientRect(),
            n = this._scrollables.map((t) =>
              t.getElementRef().nativeElement.getBoundingClientRect()
            );
          return {
            isOriginClipped: Gv(t, n),
            isOriginOutsideView: Wv(t, n),
            isOverlayClipped: Gv(e, n),
            isOverlayOutsideView: Wv(e, n),
          };
        }
        _subtractOverflows(t, ...e) {
          return e.reduce((t, e) => t - Math.max(e, 0), t);
        }
        _getNarrowedViewportRect() {
          const t = this._document.documentElement.clientWidth,
            e = this._document.documentElement.clientHeight,
            n = this._viewportRuler.getViewportScrollPosition();
          return {
            top: n.top + this._viewportMargin,
            left: n.left + this._viewportMargin,
            right: n.left + t - this._viewportMargin,
            bottom: n.top + e - this._viewportMargin,
            width: t - 2 * this._viewportMargin,
            height: e - 2 * this._viewportMargin,
          };
        }
        _isRtl() {
          return "rtl" === this._overlayRef.getDirection();
        }
        _hasExactPosition() {
          return !this._hasFlexibleDimensions || this._isPushed;
        }
        _getOffset(t, e) {
          return "x" === e
            ? null == t.offsetX
              ? this._offsetX
              : t.offsetX
            : null == t.offsetY
            ? this._offsetY
            : t.offsetY;
        }
        _validatePositions() {
          if (!this._preferredPositions.length)
            throw Error(
              "FlexibleConnectedPositionStrategy: At least one position is required."
            );
          this._preferredPositions.forEach((t) => {
            tw("originX", t.originX),
              Jv("originY", t.originY),
              tw("overlayX", t.overlayX),
              Jv("overlayY", t.overlayY);
          });
        }
        _addPanelClasses(t) {
          this._pane &&
            c_(t).forEach((t) => {
              "" !== t &&
                -1 === this._appliedPanelClasses.indexOf(t) &&
                (this._appliedPanelClasses.push(t),
                this._pane.classList.add(t));
            });
        }
        _clearPanelClasses() {
          this._pane &&
            (this._appliedPanelClasses.forEach((t) => {
              this._pane.classList.remove(t);
            }),
            (this._appliedPanelClasses = []));
        }
        _getOriginRect() {
          const t = this._origin;
          if (t instanceof jo) return t.nativeElement.getBoundingClientRect();
          if (t instanceof Element) return t.getBoundingClientRect();
          const e = t.width || 0,
            n = t.height || 0;
          return {
            top: t.y,
            bottom: t.y + n,
            left: t.x,
            right: t.x + e,
            height: n,
            width: e,
          };
        }
      }
      function cw(t, e) {
        for (let n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return t;
      }
      function hw(t) {
        if ("number" != typeof t && null != t) {
          const [e, n] = t.split(aw);
          return n && "px" !== n ? null : parseFloat(e);
        }
        return t || null;
      }
      class uw {
        constructor(t, e, n, i, s, r, o) {
          (this._preferredPositions = []),
            (this._positionStrategy = new lw(n, i, s, r, o)
              .withFlexibleDimensions(!1)
              .withPush(!1)
              .withViewportMargin(0)),
            this.withFallbackPosition(t, e);
        }
        get _isRtl() {
          return "rtl" === this._overlayRef.getDirection();
        }
        get onPositionChange() {
          return this._positionStrategy.positionChanges;
        }
        get positions() {
          return this._preferredPositions;
        }
        attach(t) {
          (this._overlayRef = t),
            this._positionStrategy.attach(t),
            this._direction &&
              (t.setDirection(this._direction), (this._direction = null));
        }
        dispose() {
          this._positionStrategy.dispose();
        }
        detach() {
          this._positionStrategy.detach();
        }
        apply() {
          this._positionStrategy.apply();
        }
        recalculateLastPosition() {
          this._positionStrategy.reapplyLastPosition();
        }
        withScrollableContainers(t) {
          this._positionStrategy.withScrollableContainers(t);
        }
        withFallbackPosition(t, e, n, i) {
          const s = new Xv(t, e, n, i);
          return (
            this._preferredPositions.push(s),
            this._positionStrategy.withPositions(this._preferredPositions),
            this
          );
        }
        withDirection(t) {
          return (
            this._overlayRef
              ? this._overlayRef.setDirection(t)
              : (this._direction = t),
            this
          );
        }
        withOffsetX(t) {
          return this._positionStrategy.withDefaultOffsetX(t), this;
        }
        withOffsetY(t) {
          return this._positionStrategy.withDefaultOffsetY(t), this;
        }
        withLockedPosition(t) {
          return this._positionStrategy.withLockedPosition(t), this;
        }
        withPositions(t) {
          return (
            (this._preferredPositions = t.slice()),
            this._positionStrategy.withPositions(this._preferredPositions),
            this
          );
        }
        setOrigin(t) {
          return this._positionStrategy.setOrigin(t), this;
        }
      }
      class dw {
        constructor() {
          (this._cssPosition = "static"),
            (this._topOffset = ""),
            (this._bottomOffset = ""),
            (this._leftOffset = ""),
            (this._rightOffset = ""),
            (this._alignItems = ""),
            (this._justifyContent = ""),
            (this._width = ""),
            (this._height = "");
        }
        attach(t) {
          const e = t.getConfig();
          (this._overlayRef = t),
            this._width && !e.width && t.updateSize({ width: this._width }),
            this._height && !e.height && t.updateSize({ height: this._height }),
            t.hostElement.classList.add("cdk-global-overlay-wrapper"),
            (this._isDisposed = !1);
        }
        top(t = "") {
          return (
            (this._bottomOffset = ""),
            (this._topOffset = t),
            (this._alignItems = "flex-start"),
            this
          );
        }
        left(t = "") {
          return (
            (this._rightOffset = ""),
            (this._leftOffset = t),
            (this._justifyContent = "flex-start"),
            this
          );
        }
        bottom(t = "") {
          return (
            (this._topOffset = ""),
            (this._bottomOffset = t),
            (this._alignItems = "flex-end"),
            this
          );
        }
        right(t = "") {
          return (
            (this._leftOffset = ""),
            (this._rightOffset = t),
            (this._justifyContent = "flex-end"),
            this
          );
        }
        width(t = "") {
          return (
            this._overlayRef
              ? this._overlayRef.updateSize({ width: t })
              : (this._width = t),
            this
          );
        }
        height(t = "") {
          return (
            this._overlayRef
              ? this._overlayRef.updateSize({ height: t })
              : (this._height = t),
            this
          );
        }
        centerHorizontally(t = "") {
          return this.left(t), (this._justifyContent = "center"), this;
        }
        centerVertically(t = "") {
          return this.top(t), (this._alignItems = "center"), this;
        }
        apply() {
          if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
          const t = this._overlayRef.overlayElement.style,
            e = this._overlayRef.hostElement.style,
            n = this._overlayRef.getConfig(),
            { width: i, height: s, maxWidth: r, maxHeight: o } = n,
            a = !(
              ("100%" !== i && "100vw" !== i) ||
              (r && "100%" !== r && "100vw" !== r)
            ),
            l = !(
              ("100%" !== s && "100vh" !== s) ||
              (o && "100%" !== o && "100vh" !== o)
            );
          (t.position = this._cssPosition),
            (t.marginLeft = a ? "0" : this._leftOffset),
            (t.marginTop = l ? "0" : this._topOffset),
            (t.marginBottom = this._bottomOffset),
            (t.marginRight = this._rightOffset),
            a
              ? (e.justifyContent = "flex-start")
              : "center" === this._justifyContent
              ? (e.justifyContent = "center")
              : "rtl" === this._overlayRef.getConfig().direction
              ? "flex-start" === this._justifyContent
                ? (e.justifyContent = "flex-end")
                : "flex-end" === this._justifyContent &&
                  (e.justifyContent = "flex-start")
              : (e.justifyContent = this._justifyContent),
            (e.alignItems = l ? "flex-start" : this._alignItems);
        }
        dispose() {
          if (this._isDisposed || !this._overlayRef) return;
          const t = this._overlayRef.overlayElement.style,
            e = this._overlayRef.hostElement,
            n = e.style;
          e.classList.remove("cdk-global-overlay-wrapper"),
            (n.justifyContent = n.alignItems = t.marginTop = t.marginBottom = t.marginLeft = t.marginRight = t.position =
              ""),
            (this._overlayRef = null),
            (this._isDisposed = !0);
        }
      }
      let pw = (() => {
          class t {
            constructor(t, e, n, i) {
              (this._viewportRuler = t),
                (this._document = e),
                (this._platform = n),
                (this._overlayContainer = i);
            }
            global() {
              return new dw();
            }
            connectedTo(t, e, n) {
              return new uw(
                e,
                n,
                t,
                this._viewportRuler,
                this._document,
                this._platform,
                this._overlayContainer
              );
            }
            flexibleConnectedTo(t) {
              return new lw(
                t,
                this._viewportRuler,
                this._document,
                this._platform,
                this._overlayContainer
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Vv), Wt(tc), Wt(I_), Wt(rw));
            }),
            (t.ɵprov = lt({
              factory: function () {
                return new t(Wt(Vv), Wt(tc), Wt(I_), Wt(rw));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        fw = 0,
        mw = (() => {
          class t {
            constructor(t, e, n, i, s, r, o, a, l, c, h) {
              (this.scrollStrategies = t),
                (this._overlayContainer = e),
                (this._componentFactoryResolver = n),
                (this._positionBuilder = i),
                (this._keyboardDispatcher = s),
                (this._injector = r),
                (this._ngZone = o),
                (this._document = a),
                (this._directionality = l),
                (this._location = c),
                (this._outsideClickDispatcher = h);
            }
            create(t) {
              const e = this._createHostElement(),
                n = this._createPaneElement(e),
                i = this._createPortalOutlet(n),
                s = new Qv(t);
              return (
                (s.direction = s.direction || this._directionality.value),
                new ow(
                  i,
                  e,
                  n,
                  s,
                  this._ngZone,
                  this._keyboardDispatcher,
                  this._document,
                  this._location,
                  this._outsideClickDispatcher
                )
              );
            }
            position() {
              return this._positionBuilder;
            }
            _createPaneElement(t) {
              const e = this._document.createElement("div");
              return (
                (e.id = "cdk-overlay-" + fw++),
                e.classList.add("cdk-overlay-pane"),
                t.appendChild(e),
                e
              );
            }
            _createHostElement() {
              const t = this._document.createElement("div");
              return (
                this._overlayContainer.getContainerElement().appendChild(t), t
              );
            }
            _createPortalOutlet(t) {
              return (
                this._appRef || (this._appRef = this._injector.get(Bl)),
                new k_(
                  t,
                  this._componentFactoryResolver,
                  this._appRef,
                  this._injector,
                  this._document
                )
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                Wt(Kv),
                Wt(rw),
                Wt(Mo),
                Wt(pw),
                Wt(nw),
                Wt(kr),
                Wt(Cl),
                Wt(tc),
                Wt(Ty),
                Wt(mc, 8),
                Wt(iw, 8)
              );
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const gw = {
        provide: new Lt("cdk-connected-overlay-scroll-strategy"),
        deps: [mw],
        useFactory: function (t) {
          return () => t.scrollStrategies.reposition();
        },
      };
      let _w = (() => {
        class t {}
        return (
          (t.ɵmod = me({ type: t })),
          (t.ɵinj = ct({
            factory: function (e) {
              return new (e || t)();
            },
            providers: [mw, gw],
            imports: [[Ay, A_, Hv], Hv],
          })),
          t
        );
      })();
      function yw(t, e) {}
      class bw {
        constructor() {
          (this.role = "dialog"),
            (this.panelClass = ""),
            (this.hasBackdrop = !0),
            (this.backdropClass = ""),
            (this.disableClose = !1),
            (this.width = ""),
            (this.height = ""),
            (this.maxWidth = "80vw"),
            (this.data = null),
            (this.ariaDescribedBy = null),
            (this.ariaLabelledBy = null),
            (this.ariaLabel = null),
            (this.autoFocus = !0),
            (this.restoreFocus = !0),
            (this.closeOnNavigation = !0);
        }
      }
      const vw = {
        dialogContainer: gh("dialogContainer", [
          vh("void, exit", bh({ opacity: 0, transform: "scale(0.7)" })),
          vh("enter", bh({ transform: "none" })),
          wh(
            "* => enter",
            _h(
              "150ms cubic-bezier(0, 0, 0.2, 1)",
              bh({ transform: "none", opacity: 1 })
            )
          ),
          wh(
            "* => void, * => exit",
            _h("75ms cubic-bezier(0.4, 0.0, 0.2, 1)", bh({ opacity: 0 }))
          ),
        ]),
      };
      function ww() {
        throw Error(
          "Attempting to attach dialog content after content is already attached"
        );
      }
      let xw = (() => {
          class t extends S_ {
            constructor(t, e, n, i, s, r) {
              super(),
                (this._elementRef = t),
                (this._focusTrapFactory = e),
                (this._changeDetectorRef = n),
                (this._config = s),
                (this._focusMonitor = r),
                (this._elementFocusedBeforeDialogWasOpened = null),
                (this._closeInteractionType = null),
                (this._state = "enter"),
                (this._animationStateChanged = new Na()),
                (this.attachDomPortal = (t) => (
                  this._portalOutlet.hasAttached() && ww(),
                  this._setupFocusTrap(),
                  this._portalOutlet.attachDomPortal(t)
                )),
                (this._ariaLabelledBy = s.ariaLabelledBy || null),
                (this._document = i);
            }
            attachComponentPortal(t) {
              return (
                this._portalOutlet.hasAttached() && ww(),
                this._setupFocusTrap(),
                this._portalOutlet.attachComponentPortal(t)
              );
            }
            attachTemplatePortal(t) {
              return (
                this._portalOutlet.hasAttached() && ww(),
                this._setupFocusTrap(),
                this._portalOutlet.attachTemplatePortal(t)
              );
            }
            _recaptureFocus() {
              this._containsFocus() ||
                ((!this._config.autoFocus ||
                  !this._focusTrap.focusInitialElement()) &&
                  this._elementRef.nativeElement.focus());
            }
            _trapFocus() {
              this._config.autoFocus
                ? this._focusTrap.focusInitialElementWhenReady()
                : this._containsFocus() ||
                  this._elementRef.nativeElement.focus();
            }
            _restoreFocus() {
              const t = this._elementFocusedBeforeDialogWasOpened;
              if (
                this._config.restoreFocus &&
                t &&
                "function" == typeof t.focus
              ) {
                const e = this._document.activeElement,
                  n = this._elementRef.nativeElement;
                (e && e !== this._document.body && e !== n && !n.contains(e)) ||
                  (this._focusMonitor
                    ? (this._focusMonitor.focusVia(
                        t,
                        this._closeInteractionType
                      ),
                      (this._closeInteractionType = null))
                    : t.focus());
              }
              this._focusTrap && this._focusTrap.destroy();
            }
            _setupFocusTrap() {
              this._focusTrap ||
                (this._focusTrap = this._focusTrapFactory.create(
                  this._elementRef.nativeElement
                )),
                this._document &&
                  ((this._elementFocusedBeforeDialogWasOpened = this._document.activeElement),
                  this._elementRef.nativeElement.focus &&
                    Promise.resolve().then(() =>
                      this._elementRef.nativeElement.focus()
                    ));
            }
            _containsFocus() {
              const t = this._elementRef.nativeElement,
                e = this._document.activeElement;
              return t === e || t.contains(e);
            }
            _onAnimationDone(t) {
              "enter" === t.toState
                ? this._trapFocus()
                : "exit" === t.toState && this._restoreFocus(),
                this._animationStateChanged.emit(t);
            }
            _onAnimationStart(t) {
              this._animationStateChanged.emit(t);
            }
            _startExitAnimation() {
              (this._state = "exit"), this._changeDetectorRef.markForCheck();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                jr(jo),
                jr(Y_),
                jr(lr),
                jr(tc, 8),
                jr(bw),
                jr(ny)
              );
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["mat-dialog-container"]],
              viewQuery: function (t, e) {
                var n;
                1 & t && Wa(T_, !0),
                  2 & t && qa((n = Ya())) && (e._portalOutlet = n.first);
              },
              hostAttrs: [
                "tabindex",
                "-1",
                "aria-modal",
                "true",
                1,
                "mat-dialog-container",
              ],
              hostVars: 6,
              hostBindings: function (t, e) {
                1 & t &&
                  Xr("@dialogContainer.start", function (t) {
                    return e._onAnimationStart(t);
                  })("@dialogContainer.done", function (t) {
                    return e._onAnimationDone(t);
                  }),
                  2 & t &&
                    (Fr("id", e._id)("role", e._config.role)(
                      "aria-labelledby",
                      e._config.ariaLabel ? null : e._ariaLabelledBy
                    )("aria-label", e._config.ariaLabel)(
                      "aria-describedby",
                      e._config.ariaDescribedBy || null
                    ),
                    vo("@dialogContainer", e._state));
              },
              features: [xo],
              decls: 1,
              vars: 0,
              consts: [["cdkPortalOutlet", ""]],
              template: function (t, e) {
                1 & t && Lr(0, yw, 0, 0, "ng-template", 0);
              },
              directives: [T_],
              styles: [
                ".mat-dialog-container{display:block;padding:24px;border-radius:4px;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%;min-height:inherit;max-height:inherit}.cdk-high-contrast-active .mat-dialog-container{outline:solid 1px}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}.mat-dialog-title{margin:0 0 20px;display:block}.mat-dialog-actions{padding:8px 0;display:flex;flex-wrap:wrap;min-height:52px;align-items:center;margin-bottom:-24px}.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions[align=center]{justify-content:center}.mat-dialog-actions .mat-button-base+.mat-button-base,.mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}\n",
              ],
              encapsulation: 2,
              data: { animation: [vw.dialogContainer] },
            })),
            t
          );
        })(),
        Cw = 0;
      class Sw {
        constructor(t, e, n = "mat-dialog-" + Cw++) {
          (this._overlayRef = t),
            (this._containerInstance = e),
            (this.id = n),
            (this.disableClose = this._containerInstance._config.disableClose),
            (this._afterOpened = new C()),
            (this._afterClosed = new C()),
            (this._beforeClosed = new C()),
            (this._state = 0),
            (e._id = n),
            e._animationStateChanged
              .pipe(
                Gd((t) => "done" === t.phaseName && "enter" === t.toState),
                hp(1)
              )
              .subscribe(() => {
                this._afterOpened.next(), this._afterOpened.complete();
              }),
            e._animationStateChanged
              .pipe(
                Gd((t) => "done" === t.phaseName && "exit" === t.toState),
                hp(1)
              )
              .subscribe(() => {
                clearTimeout(this._closeFallbackTimeout),
                  this._finishDialogClose();
              }),
            t.detachments().subscribe(() => {
              this._beforeClosed.next(this._result),
                this._beforeClosed.complete(),
                this._afterClosed.next(this._result),
                this._afterClosed.complete(),
                (this.componentInstance = null),
                this._overlayRef.dispose();
            }),
            t
              .keydownEvents()
              .pipe(Gd((t) => 27 === t.keyCode && !this.disableClose && !M_(t)))
              .subscribe((t) => {
                t.preventDefault(), kw(this, "keyboard");
              }),
            t.backdropClick().subscribe(() => {
              this.disableClose
                ? this._containerInstance._recaptureFocus()
                : kw(this, "mouse");
            });
        }
        close(t) {
          (this._result = t),
            this._containerInstance._animationStateChanged
              .pipe(
                Gd((t) => "start" === t.phaseName),
                hp(1)
              )
              .subscribe((e) => {
                this._beforeClosed.next(t),
                  this._beforeClosed.complete(),
                  this._overlayRef.detachBackdrop(),
                  (this._closeFallbackTimeout = setTimeout(
                    () => this._finishDialogClose(),
                    e.totalTime + 100
                  ));
              }),
            this._containerInstance._startExitAnimation(),
            (this._state = 1);
        }
        afterOpened() {
          return this._afterOpened.asObservable();
        }
        afterClosed() {
          return this._afterClosed.asObservable();
        }
        beforeClosed() {
          return this._beforeClosed.asObservable();
        }
        backdropClick() {
          return this._overlayRef.backdropClick();
        }
        keydownEvents() {
          return this._overlayRef.keydownEvents();
        }
        updatePosition(t) {
          let e = this._getPositionStrategy();
          return (
            t && (t.left || t.right)
              ? t.left
                ? e.left(t.left)
                : e.right(t.right)
              : e.centerHorizontally(),
            t && (t.top || t.bottom)
              ? t.top
                ? e.top(t.top)
                : e.bottom(t.bottom)
              : e.centerVertically(),
            this._overlayRef.updatePosition(),
            this
          );
        }
        updateSize(t = "", e = "") {
          return (
            this._getPositionStrategy().width(t).height(e),
            this._overlayRef.updatePosition(),
            this
          );
        }
        addPanelClass(t) {
          return this._overlayRef.addPanelClass(t), this;
        }
        removePanelClass(t) {
          return this._overlayRef.removePanelClass(t), this;
        }
        getState() {
          return this._state;
        }
        _finishDialogClose() {
          (this._state = 2), this._overlayRef.dispose();
        }
        _getPositionStrategy() {
          return this._overlayRef.getConfig().positionStrategy;
        }
      }
      function kw(t, e, n) {
        return (
          void 0 !== t._containerInstance &&
            (t._containerInstance._closeInteractionType = e),
          t.close(n)
        );
      }
      const Ew = new Lt("MatDialogData"),
        Tw = new Lt("mat-dialog-default-options"),
        Aw = new Lt("mat-dialog-scroll-strategy"),
        Ow = {
          provide: Aw,
          deps: [mw],
          useFactory: function (t) {
            return () => t.scrollStrategies.block();
          },
        };
      let Iw = (() => {
          class t {
            constructor(t, e, n, i, s, r, o) {
              (this._overlay = t),
                (this._injector = e),
                (this._defaultOptions = i),
                (this._parentDialog = r),
                (this._overlayContainer = o),
                (this._openDialogsAtThisLevel = []),
                (this._afterAllClosedAtThisLevel = new C()),
                (this._afterOpenedAtThisLevel = new C()),
                (this._ariaHiddenElements = new Map()),
                (this.afterAllClosed = qd(() =>
                  this.openDialogs.length
                    ? this._afterAllClosed
                    : this._afterAllClosed.pipe(Sp(void 0))
                )),
                (this._scrollStrategy = s);
            }
            get openDialogs() {
              return this._parentDialog
                ? this._parentDialog.openDialogs
                : this._openDialogsAtThisLevel;
            }
            get afterOpened() {
              return this._parentDialog
                ? this._parentDialog.afterOpened
                : this._afterOpenedAtThisLevel;
            }
            get _afterAllClosed() {
              const t = this._parentDialog;
              return t ? t._afterAllClosed : this._afterAllClosedAtThisLevel;
            }
            open(t, e) {
              if (
                (e = (function (t, e) {
                  return Object.assign(Object.assign({}, e), t);
                })(e, this._defaultOptions || new bw())).id &&
                this.getDialogById(e.id)
              )
                throw Error(
                  `Dialog with id "${e.id}" exists already. The dialog id must be unique.`
                );
              const n = this._createOverlay(e),
                i = this._attachDialogContainer(n, e),
                s = this._attachDialogContent(t, i, n, e);
              return (
                this.openDialogs.length ||
                  this._hideNonDialogContentFromAssistiveTechnology(),
                this.openDialogs.push(s),
                s.afterClosed().subscribe(() => this._removeOpenDialog(s)),
                this.afterOpened.next(s),
                s
              );
            }
            closeAll() {
              this._closeDialogs(this.openDialogs);
            }
            getDialogById(t) {
              return this.openDialogs.find((e) => e.id === t);
            }
            ngOnDestroy() {
              this._closeDialogs(this._openDialogsAtThisLevel),
                this._afterAllClosedAtThisLevel.complete(),
                this._afterOpenedAtThisLevel.complete();
            }
            _createOverlay(t) {
              const e = this._getOverlayConfig(t);
              return this._overlay.create(e);
            }
            _getOverlayConfig(t) {
              const e = new Qv({
                positionStrategy: this._overlay.position().global(),
                scrollStrategy: t.scrollStrategy || this._scrollStrategy(),
                panelClass: t.panelClass,
                hasBackdrop: t.hasBackdrop,
                direction: t.direction,
                minWidth: t.minWidth,
                minHeight: t.minHeight,
                maxWidth: t.maxWidth,
                maxHeight: t.maxHeight,
                disposeOnNavigation: t.closeOnNavigation,
              });
              return t.backdropClass && (e.backdropClass = t.backdropClass), e;
            }
            _attachDialogContainer(t, e) {
              const n = kr.create({
                  parent:
                    (e && e.viewContainerRef && e.viewContainerRef.injector) ||
                    this._injector,
                  providers: [{ provide: bw, useValue: e }],
                }),
                i = new w_(
                  xw,
                  e.viewContainerRef,
                  n,
                  e.componentFactoryResolver
                );
              return t.attach(i).instance;
            }
            _attachDialogContent(t, e, n, i) {
              const s = new Sw(n, e, i.id);
              if (t instanceof la)
                e.attachTemplatePortal(
                  new x_(t, null, { $implicit: i.data, dialogRef: s })
                );
              else {
                const n = this._createInjector(i, s, e),
                  r = e.attachComponentPortal(new w_(t, i.viewContainerRef, n));
                s.componentInstance = r.instance;
              }
              return (
                s.updateSize(i.width, i.height).updatePosition(i.position), s
              );
            }
            _createInjector(t, e, n) {
              const i = t && t.viewContainerRef && t.viewContainerRef.injector,
                s = [
                  { provide: xw, useValue: n },
                  { provide: Ew, useValue: t.data },
                  { provide: Sw, useValue: e },
                ];
              return (
                !t.direction ||
                  (i && i.get(Ty, null)) ||
                  s.push({
                    provide: Ty,
                    useValue: { value: t.direction, change: Ld() },
                  }),
                kr.create({ parent: i || this._injector, providers: s })
              );
            }
            _removeOpenDialog(t) {
              const e = this.openDialogs.indexOf(t);
              e > -1 &&
                (this.openDialogs.splice(e, 1),
                this.openDialogs.length ||
                  (this._ariaHiddenElements.forEach((t, e) => {
                    t
                      ? e.setAttribute("aria-hidden", t)
                      : e.removeAttribute("aria-hidden");
                  }),
                  this._ariaHiddenElements.clear(),
                  this._afterAllClosed.next()));
            }
            _hideNonDialogContentFromAssistiveTechnology() {
              const t = this._overlayContainer.getContainerElement();
              if (t.parentElement) {
                const e = t.parentElement.children;
                for (let n = e.length - 1; n > -1; n--) {
                  let i = e[n];
                  i === t ||
                    "SCRIPT" === i.nodeName ||
                    "STYLE" === i.nodeName ||
                    i.hasAttribute("aria-live") ||
                    (this._ariaHiddenElements.set(
                      i,
                      i.getAttribute("aria-hidden")
                    ),
                    i.setAttribute("aria-hidden", "true"));
                }
              }
            }
            _closeDialogs(t) {
              let e = t.length;
              for (; e--; ) t[e].close();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                Wt(mw),
                Wt(kr),
                Wt(mc, 8),
                Wt(Tw, 8),
                Wt(Aw),
                Wt(t, 12),
                Wt(rw)
              );
            }),
            (t.ɵprov = lt({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Pw = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [Iw, Ow],
              imports: [[_w, A_, Dy], Dy],
            })),
            t
          );
        })();
      function Rw(t, e) {
        if (
          (1 & t &&
            (Br(0, "div", 12),
            zr(1, "div", 13),
            Br(2, "span"),
            go(3),
            Ur(),
            Ur()),
          2 & t)
        ) {
          const t = e.$implicit;
          Fi(1),
            lo(
              "background-image",
              "url(https://temtem-api.mael.tech" + t.icon + ")"
            ),
            Fi(2),
            _o(t.name);
        }
      }
      function Dw(t, e) {
        if (
          (1 & t &&
            (Br(0, "div", 12),
            zr(1, "div", 13),
            Br(2, "span"),
            go(3),
            Ur(),
            Ur()),
          2 & t)
        ) {
          const t = e.$implicit;
          Fi(1),
            lo(
              "background-image",
              "url(https://temtem-api.mael.tech" + t.icon + ")"
            ),
            Fi(2),
            _o(t.name);
        }
      }
      function Nw(t, e) {
        if (
          (1 & t &&
            (Br(0, "div", 12),
            zr(1, "div", 13),
            Br(2, "span"),
            go(3),
            Ur(),
            Ur()),
          2 & t)
        ) {
          const t = e.$implicit;
          Fi(1),
            lo(
              "background-image",
              "url(https://temtem-api.mael.tech" + t.icon + ")"
            ),
            Fi(2),
            _o(t.name);
        }
      }
      function Fw(t, e) {
        if (
          (1 & t &&
            (Br(0, "div"),
            Br(1, "div"),
            go(2),
            Ur(),
            Br(3, "span"),
            go(4),
            Ur(),
            Ur()),
          2 & t)
        ) {
          const t = e.$implicit;
          Fi(2), _o(t.name), Fi(2), _o(t.description);
        }
      }
      function Lw(t, e) {
        if (
          (1 & t &&
            (Br(0, "div", 14),
            Br(1, "h5"),
            go(2, "Game Description"),
            Ur(),
            go(3),
            Ur()),
          2 & t)
        ) {
          const t = eo().$implicit;
          Fi(3), yo(" ", t.gameDescription, " ");
        }
      }
      function Mw(t, e) {
        1 & t && zr(0, "div"),
          2 & t &&
            lo(
              "background-image",
              "url(https://temtem-api.mael.tech/" + e.$implicit.icon + ")"
            );
      }
      function jw(t, e) {
        if ((1 & t && (Br(0, "div"), go(1), Ur()), 2 & t)) {
          const t = e.$implicit;
          Fi(1), yo(" ", t.levels, " ");
        }
      }
      function Vw(t, e) {
        if (
          (1 & t &&
            (Br(0, "div"),
            Br(1, "div", 15),
            Br(2, "div", 16),
            zr(3, "div", 17),
            Br(4, "div", 18),
            Br(5, "div", 19),
            Lr(6, Mw, 1, 2, "div", 20),
            Ur(),
            Ur(),
            Ur(),
            Br(7, "div", 21),
            go(8),
            Ur(),
            Ur(),
            Lr(9, jw, 2, 1, "div", 11),
            Ur()),
          2 & t)
        ) {
          const t = e.$implicit,
            n = eo(3);
          Fi(3),
            lo(
              "background-image",
              "url(https://temtem-api.mael.tech/" + t.icon + ")"
            ),
            Fi(3),
            $r("ngForOf", t.types),
            Fi(2),
            yo(" ", "#" + t.number + " " + t.name, " "),
            Fi(1),
            $r("ngIf", n.getNextEvoInfo(t));
        }
      }
      function $w(t, e) {
        if (
          (1 & t &&
            (Br(0, "div"), Lr(1, Vw, 10, 5, "div", 8), Ra(2, "async"), Ur()),
          2 & t)
        ) {
          const t = eo(2);
          Fi(1), $r("ngForOf", Da(2, 1, t.evolutions$));
        }
      }
      function Hw(t, e) {
        1 & t && zr(0, "div"),
          2 & t &&
            lo(
              "background-image",
              "url(https://temtem-api.mael.tech/" + e.$implicit.icon + ")"
            );
      }
      function Bw(t, e) {
        if (
          (1 & t &&
            (Br(0, "div"),
            Br(1, "div"),
            Br(2, "div", 15),
            Br(3, "div", 16),
            zr(4, "div", 17),
            Br(5, "div", 18),
            Br(6, "div", 19),
            Lr(7, Hw, 1, 2, "div", 20),
            Ur(),
            Ur(),
            Ur(),
            Br(8, "div", 21),
            go(9),
            Ur(),
            Ur(),
            Ur(),
            Ur()),
          2 & t)
        ) {
          const t = eo().$implicit;
          Fi(4),
            lo(
              "background-image",
              "url(https://temtem-api.mael.tech/" + t.icon + ")"
            ),
            Fi(3),
            $r("ngForOf", t.types),
            Fi(2),
            yo(" ", "#" + t.number + " " + t.name, " ");
        }
      }
      function Uw(t, e) {
        if (
          (1 & t &&
            (Br(0, "div", 1),
            Br(1, "h3"),
            go(2),
            Ur(),
            Br(3, "div", 2),
            Br(4, "div", 3),
            zr(5, "div", 4),
            zr(6, "div", 4),
            Ur(),
            Br(7, "div", 5),
            Br(8, "div"),
            Br(9, "h5"),
            go(10, "Type(s)"),
            Ur(),
            Lr(11, Rw, 4, 3, "div", 6),
            Ur(),
            Br(12, "div"),
            Br(13, "h5"),
            go(14, "Weak To (0.5)"),
            Ur(),
            Lr(15, Dw, 4, 3, "div", 6),
            Ra(16, "async"),
            Ur(),
            Br(17, "div"),
            Br(18, "h5"),
            go(19, "Resistant To (2)"),
            Ur(),
            Lr(20, Nw, 4, 3, "div", 6),
            Ra(21, "async"),
            Ur(),
            Br(22, "div", 7),
            Br(23, "h5"),
            go(24, "Traits"),
            Ur(),
            Lr(25, Fw, 5, 2, "div", 8),
            Ur(),
            Lr(26, Lw, 4, 1, "div", 9),
            Ur(),
            Ur(),
            Br(27, "div", 10),
            Ra(28, "async"),
            Lr(29, $w, 3, 3, "div", 11),
            Ra(30, "async"),
            Lr(31, Bw, 10, 4, "div", 11),
            Ra(32, "async"),
            Ur(),
            Ur()),
          2 & t)
        ) {
          const t = e.$implicit,
            i = eo();
          var n;
          const s =
            "evolutions-" +
            (null == (n = Da(28, 17, i.evolutions$)) ? null : n.length);
          Fi(2),
            _o("#" + t.number + " " + t.name),
            Fi(3),
            lo(
              "background-image",
              "url(https://temtem-api.mael.tech/" + t.icon + ")"
            ),
            Fi(1),
            lo(
              "background-image",
              "url(https://temtem-api.mael.tech/" + t.lumaIcon + ")"
            ),
            Fi(5),
            $r("ngForOf", t.types),
            Fi(4),
            $r("ngForOf", Da(16, 13, i.weak$)),
            Fi(5),
            $r("ngForOf", Da(21, 15, i.resistant$)),
            Fi(5),
            $r("ngForOf", t.traits),
            Fi(1),
            $r("ngIf", t.gameDescription),
            Fi(1),
            $r("ngClass", s),
            Fi(2),
            $r("ngIf", Da(30, 19, i.evolutions$)),
            Fi(2),
            $r("ngIf", !Da(32, 21, i.evolutions$));
        }
      }
      let zw = (() => {
        class t {
          constructor(t, e) {
            (this.data = t),
              (this.temtemService = e),
              (this.temtem$ = this.temtemService.getTemtem(
                this.data.temtemNumber
              )),
              (this.weak$ = new Md(null)),
              (this.resistant$ = new Md(null)),
              (this.evolutions$ = new Md(null));
          }
          ngOnInit() {
            this.data &&
              $d(this.temtemService.getAllTypes$, this.temtem$)
                .pipe(hp(1))
                .subscribe(([t, e]) => {
                  t.forEach((t) => {
                    this.temtemService
                      .calcTypeWeaknesses(
                        t.name,
                        e.types.map((t) => t.name)
                      )
                      .pipe(hp(1))
                      .subscribe((e) => {
                        const n = e.attacking;
                        2 === e.result
                          ? this.weak$.value &&
                            !this.weak$.value.some((t) => t === n)
                            ? this.weak$.next([...this.weak$.value, t])
                            : this.weak$.next([t])
                          : 0.5 === e.result &&
                            (this.resistant$.value &&
                            !this.resistant$.value.some((t) => t === n)
                              ? this.resistant$.next([
                                  ...this.resistant$.value,
                                  t,
                                ])
                              : this.resistant$.next([t]));
                      });
                  }),
                    e.evolution.evolves &&
                      this.temtemService
                        .getTemtemByNames(
                          e.evolution.evolutionTree.map((t) => t.name)
                        )
                        .pipe(hp(1))
                        .subscribe((t) => this.evolutions$.next(t));
                });
          }
          getNextEvoInfo(t) {
            const e = t.evolution.evolutionTree.some(
                (e) => e.stage === t.evolution.stage + 1
              ),
              n = t.evolution.evolutionTree.find(
                (e) => e.stage === t.evolution.stage
              );
            return console.log({ currentInfo: n }), e ? n : "";
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(jr(Ew), jr(o_));
          }),
          (t.ɵcmp = ue({
            type: t,
            selectors: [["app-temtem-profile"]],
            decls: 2,
            vars: 3,
            consts: [
              ["class", "temtem-info-profile", 4, "ngIf"],
              [1, "temtem-info-profile"],
              [1, "temtem-info-profile-main"],
              [1, "temtem-info-profile-main-images"],
              [1, "temtem-info-render"],
              [1, "temtem-info-profile-main-info"],
              [
                "class",
                "temtem-info-profile-main-info-type",
                4,
                "ngFor",
                "ngForOf",
              ],
              [1, "temtem-info-profile-main-info-trais"],
              [4, "ngFor", "ngForOf"],
              ["class", "temtem-info-profile-main-info-description", 4, "ngIf"],
              [1, "temtem-info-profile-evo", 3, "ngClass"],
              [4, "ngIf"],
              [1, "temtem-info-profile-main-info-type"],
              [1, "temtem-info-profile-main-info-type-icon"],
              [1, "temtem-info-profile-main-info-description"],
              [1, "temtem-listing-item-outer"],
              [1, "temtem-listing-item"],
              [1, "temtem-listing-item-temtem"],
              [1, "temtem-listing-item-top"],
              [1, "temtem-listing-item-top-types"],
              [3, "backgroundImage", 4, "ngFor", "ngForOf"],
              [1, "temtem-listing-item-bottom"],
            ],
            template: function (t, e) {
              1 & t && (Lr(0, Uw, 33, 23, "div", 0), Ra(1, "async")),
                2 & t && $r("ngIf", Da(1, 1, e.temtem$));
            },
            directives: [Ec, Sc, xc],
            pipes: [Mc],
            styles: [
              ".temtem-info-profile[_ngcontent-%COMP%]{width:calc(100vw - 200px);height:calc(100vh - 200px);background-color:var(--surface-color)}.temtem-info-profile-main[_ngcontent-%COMP%]{display:grid;grid-gap:30px;padding-top:20px;grid-template-columns:auto 1fr}.temtem-info-profile-main-images[_ngcontent-%COMP%]{display:grid;grid-gap:15px;grid-template-columns:auto auto}.temtem-info-render[_ngcontent-%COMP%]{width:170px;height:200px;border-radius:3px;background-size:contain;background-color:var(--surface-color);background-repeat:no-repeat;background-position:50%}.temtem-info-profile-main-info[_ngcontent-%COMP%]{display:grid;grid-gap:15px;grid-template-columns:repeat(3,1fr) 4fr;grid-template-rows:auto 1fr}.temtem-info-profile-main-info[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{padding-bottom:5px}.temtem-info-profile-main-info-gender[_ngcontent-%COMP%], .temtem-info-profile-main-info-type[_ngcontent-%COMP%]{display:flex;align-items:center}.temtem-info-profile-main-info-gender-icon[_ngcontent-%COMP%], .temtem-info-profile-main-info-type-icon[_ngcontent-%COMP%]{width:22px;height:22px;margin-right:3px;background-size:cover;background-repeat:no-repeat;background-position:50%}.temtem-info-profile-main-info-gender-icon[_ngcontent-%COMP%]{width:17px;height:17px}.temtem-info-profile-main-info-description[_ngcontent-%COMP%]{border-top:1px solid var(--contrast-fade-color);padding-top:12px;grid-column:4 span}.temtem-info-profile-main-info-trais[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding-top:10px}.temtem-info-profile-main-info-trais[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:first-of-type{padding-top:0}.temtem-info-profile-main-info-trais[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.8em;font-weight:200}.temtem-listing-item-outer[_ngcontent-%COMP%]{width:var(--temtem-item-size);box-shadow:var(--box-shadow-level-2);border-radius:3px;transition-duration:.2s}.temtem-listing-item-outer[_ngcontent-%COMP%]:hover{box-shadow:var(--box-shadow-level-3)}.temtem-listing-item[_ngcontent-%COMP%]{width:var(--temtem-item-size);cursor:pointer;height:var(--temtem-item-size);padding:1px;position:relative;border-radius:3px 3px 0 0}.temtem-listing-item-temtem[_ngcontent-%COMP%]{top:0;left:0;width:100%;height:100%;position:absolute;border-radius:3px 3px 0 0;background-size:cover;background-color:var(--card-background-color);background-repeat:no-repeat;transition-duration:.2s}.temtem-listing-item-top[_ngcontent-%COMP%]{width:100%;display:grid;justify-items:end;grid-template-columns:30px auto}.temtem-listing-item-top-types[_ngcontent-%COMP%]{z-index:1}.temtem-listing-item-top-types[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:30px;height:30px;display:grid;background-size:cover;background-repeat:no-repeat;grid-template-rows:repeat(2,30px)}.temtem-listing-item-bottom[_ngcontent-%COMP%]{width:var(--temtem-item-size);color:var(--font-color-contrast);padding:2px 4px;opacity:.9;font-size:.8em;font-weight:500;border-radius:0 0 3px 3px;background-color:var(--surface-color-contrast)}.temtem-info-profile-evo[_ngcontent-%COMP%]{width:100%;margin-top:30px;border-top:1px solid var(--contrast-fade-color)}.temtem-info-profile-evo[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:700px;margin:0 auto;display:grid;padding-top:30px;justify-items:center;grid-template-columns:repeat(auto-fit,minmax(131px,1fr))}.temtem-info-profile-evo.evolutions-2[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:500px}",
            ],
            changeDetection: 0,
          })),
          t
        );
      })();
      const qw = ["input"],
        Ww = function () {
          return { enterDuration: 150 };
        },
        Gw = ["*"],
        Zw = new Lt("mat-checkbox-default-options", {
          providedIn: "root",
          factory: function () {
            return { color: "accent", clickAction: "check-indeterminate" };
          },
        }),
        Kw = new Lt("mat-checkbox-click-action");
      let Qw = 0;
      const Xw = { provide: Bb, useExisting: wt(() => ex), multi: !0 };
      class Yw {}
      class Jw {
        constructor(t) {
          this._elementRef = t;
        }
      }
      const tx = My(Fy(Ly(Ny(Jw))));
      let ex = (() => {
          class t extends tx {
            constructor(t, e, n, i, s, r, o, a) {
              super(t),
                (this._changeDetectorRef = e),
                (this._focusMonitor = n),
                (this._ngZone = i),
                (this._clickAction = r),
                (this._animationMode = o),
                (this._options = a),
                (this.ariaLabel = ""),
                (this.ariaLabelledby = null),
                (this._uniqueId = "mat-checkbox-" + ++Qw),
                (this.id = this._uniqueId),
                (this.labelPosition = "after"),
                (this.name = null),
                (this.change = new Na()),
                (this.indeterminateChange = new Na()),
                (this._onTouched = () => {}),
                (this._currentAnimationClass = ""),
                (this._currentCheckState = 0),
                (this._controlValueAccessorChangeFn = () => {}),
                (this._checked = !1),
                (this._disabled = !1),
                (this._indeterminate = !1),
                (this._options = this._options || {}),
                this._options.color && (this.color = this._options.color),
                (this.tabIndex = parseInt(s) || 0),
                (this._clickAction =
                  this._clickAction || this._options.clickAction);
            }
            get inputId() {
              return (this.id || this._uniqueId) + "-input";
            }
            get required() {
              return this._required;
            }
            set required(t) {
              this._required = a_(t);
            }
            ngAfterViewInit() {
              this._focusMonitor
                .monitor(this._elementRef, !0)
                .subscribe((t) => {
                  t ||
                    Promise.resolve().then(() => {
                      this._onTouched(), this._changeDetectorRef.markForCheck();
                    });
                }),
                this._syncIndeterminate(this._indeterminate);
            }
            ngAfterViewChecked() {}
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            get checked() {
              return this._checked;
            }
            set checked(t) {
              t != this.checked &&
                ((this._checked = t), this._changeDetectorRef.markForCheck());
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              const e = a_(t);
              e !== this.disabled &&
                ((this._disabled = e), this._changeDetectorRef.markForCheck());
            }
            get indeterminate() {
              return this._indeterminate;
            }
            set indeterminate(t) {
              const e = t != this._indeterminate;
              (this._indeterminate = a_(t)),
                e &&
                  (this._transitionCheckState(
                    this._indeterminate ? 3 : this.checked ? 1 : 2
                  ),
                  this.indeterminateChange.emit(this._indeterminate)),
                this._syncIndeterminate(this._indeterminate);
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled;
            }
            _onLabelTextChange() {
              this._changeDetectorRef.detectChanges();
            }
            writeValue(t) {
              this.checked = !!t;
            }
            registerOnChange(t) {
              this._controlValueAccessorChangeFn = t;
            }
            registerOnTouched(t) {
              this._onTouched = t;
            }
            setDisabledState(t) {
              this.disabled = t;
            }
            _getAriaChecked() {
              return this.checked
                ? "true"
                : this.indeterminate
                ? "mixed"
                : "false";
            }
            _transitionCheckState(t) {
              let e = this._currentCheckState,
                n = this._elementRef.nativeElement;
              if (
                e !== t &&
                (this._currentAnimationClass.length > 0 &&
                  n.classList.remove(this._currentAnimationClass),
                (this._currentAnimationClass = this._getAnimationClassForCheckStateTransition(
                  e,
                  t
                )),
                (this._currentCheckState = t),
                this._currentAnimationClass.length > 0)
              ) {
                n.classList.add(this._currentAnimationClass);
                const t = this._currentAnimationClass;
                this._ngZone.runOutsideAngular(() => {
                  setTimeout(() => {
                    n.classList.remove(t);
                  }, 1e3);
                });
              }
            }
            _emitChangeEvent() {
              const t = new Yw();
              (t.source = this),
                (t.checked = this.checked),
                this._controlValueAccessorChangeFn(this.checked),
                this.change.emit(t);
            }
            toggle() {
              this.checked = !this.checked;
            }
            _onInputClick(t) {
              t.stopPropagation(),
                this.disabled || "noop" === this._clickAction
                  ? this.disabled ||
                    "noop" !== this._clickAction ||
                    ((this._inputElement.nativeElement.checked = this.checked),
                    (this._inputElement.nativeElement.indeterminate = this.indeterminate))
                  : (this.indeterminate &&
                      "check" !== this._clickAction &&
                      Promise.resolve().then(() => {
                        (this._indeterminate = !1),
                          this.indeterminateChange.emit(this._indeterminate);
                      }),
                    this.toggle(),
                    this._transitionCheckState(this._checked ? 1 : 2),
                    this._emitChangeEvent());
            }
            focus(t = "keyboard", e) {
              this._focusMonitor.focusVia(this._inputElement, t, e);
            }
            _onInteractionEvent(t) {
              t.stopPropagation();
            }
            _getAnimationClassForCheckStateTransition(t, e) {
              if ("NoopAnimations" === this._animationMode) return "";
              let n = "";
              switch (t) {
                case 0:
                  if (1 === e) n = "unchecked-checked";
                  else {
                    if (3 != e) return "";
                    n = "unchecked-indeterminate";
                  }
                  break;
                case 2:
                  n = 1 === e ? "unchecked-checked" : "unchecked-indeterminate";
                  break;
                case 1:
                  n = 2 === e ? "checked-unchecked" : "checked-indeterminate";
                  break;
                case 3:
                  n =
                    1 === e
                      ? "indeterminate-checked"
                      : "indeterminate-unchecked";
              }
              return "mat-checkbox-anim-" + n;
            }
            _syncIndeterminate(t) {
              const e = this._inputElement;
              e && (e.nativeElement.indeterminate = t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                jr(jo),
                jr(lr),
                jr(ny),
                jr(Cl),
                Vr("tabindex"),
                jr(Kw, 8),
                jr(Dd, 8),
                jr(Zw, 8)
              );
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["mat-checkbox"]],
              viewQuery: function (t, e) {
                var n;
                1 & t && (Ga(qw, !0), Ga(Gy, !0)),
                  2 & t &&
                    (qa((n = Ya())) && (e._inputElement = n.first),
                    qa((n = Ya())) && (e.ripple = n.first));
              },
              hostAttrs: [1, "mat-checkbox"],
              hostVars: 12,
              hostBindings: function (t, e) {
                2 & t &&
                  (bo("id", e.id),
                  Fr("tabindex", null),
                  co("mat-checkbox-indeterminate", e.indeterminate)(
                    "mat-checkbox-checked",
                    e.checked
                  )("mat-checkbox-disabled", e.disabled)(
                    "mat-checkbox-label-before",
                    "before" == e.labelPosition
                  )(
                    "_mat-animation-noopable",
                    "NoopAnimations" === e._animationMode
                  ));
              },
              inputs: {
                disableRipple: "disableRipple",
                color: "color",
                tabIndex: "tabIndex",
                ariaLabel: ["aria-label", "ariaLabel"],
                ariaLabelledby: ["aria-labelledby", "ariaLabelledby"],
                id: "id",
                labelPosition: "labelPosition",
                name: "name",
                required: "required",
                checked: "checked",
                disabled: "disabled",
                indeterminate: "indeterminate",
                ariaDescribedby: ["aria-describedby", "ariaDescribedby"],
                value: "value",
              },
              outputs: {
                change: "change",
                indeterminateChange: "indeterminateChange",
              },
              exportAs: ["matCheckbox"],
              features: [No([Xw]), xo],
              ngContentSelectors: Gw,
              decls: 17,
              vars: 20,
              consts: [
                [1, "mat-checkbox-layout"],
                ["label", ""],
                [1, "mat-checkbox-inner-container"],
                [
                  "type",
                  "checkbox",
                  1,
                  "mat-checkbox-input",
                  "cdk-visually-hidden",
                  3,
                  "id",
                  "required",
                  "checked",
                  "disabled",
                  "tabIndex",
                  "change",
                  "click",
                ],
                ["input", ""],
                [
                  "matRipple",
                  "",
                  1,
                  "mat-checkbox-ripple",
                  "mat-focus-indicator",
                  3,
                  "matRippleTrigger",
                  "matRippleDisabled",
                  "matRippleRadius",
                  "matRippleCentered",
                  "matRippleAnimation",
                ],
                [1, "mat-ripple-element", "mat-checkbox-persistent-ripple"],
                [1, "mat-checkbox-frame"],
                [1, "mat-checkbox-background"],
                [
                  "version",
                  "1.1",
                  "focusable",
                  "false",
                  "viewBox",
                  "0 0 24 24",
                  0,
                  "xml",
                  "space",
                  "preserve",
                  1,
                  "mat-checkbox-checkmark",
                ],
                [
                  "fill",
                  "none",
                  "stroke",
                  "white",
                  "d",
                  "M4.1,12.7 9,17.6 20.3,6.3",
                  1,
                  "mat-checkbox-checkmark-path",
                ],
                [1, "mat-checkbox-mixedmark"],
                [1, "mat-checkbox-label", 3, "cdkObserveContent"],
                ["checkboxLabel", ""],
                [2, "display", "none"],
              ],
              template: function (t, e) {
                if (
                  (1 & t &&
                    (io(),
                    Br(0, "label", 0, 1),
                    Br(2, "div", 2),
                    Br(3, "input", 3, 4),
                    Qr("change", function (t) {
                      return e._onInteractionEvent(t);
                    })("click", function (t) {
                      return e._onInputClick(t);
                    }),
                    Ur(),
                    Br(5, "div", 5),
                    zr(6, "div", 6),
                    Ur(),
                    zr(7, "div", 7),
                    Br(8, "div", 8),
                    (Qe.lFrame.currentNamespace = "http://www.w3.org/2000/svg"),
                    Br(9, "svg", 9),
                    zr(10, "path", 10),
                    Ur(),
                    (Qe.lFrame.currentNamespace = null),
                    zr(11, "div", 11),
                    Ur(),
                    Ur(),
                    Br(12, "span", 12, 13),
                    Qr("cdkObserveContent", function () {
                      return e._onLabelTextChange();
                    }),
                    Br(14, "span", 14),
                    go(15, "\xa0"),
                    Ur(),
                    so(16),
                    Ur(),
                    Ur()),
                  2 & t)
                ) {
                  const t = Mr(1),
                    n = Mr(13);
                  Fr("for", e.inputId),
                    Fi(2),
                    co(
                      "mat-checkbox-inner-container-no-side-margin",
                      !n.textContent || !n.textContent.trim()
                    ),
                    Fi(1),
                    $r("id", e.inputId)("required", e.required)(
                      "checked",
                      e.checked
                    )("disabled", e.disabled)("tabIndex", e.tabIndex),
                    Fr("value", e.value)("name", e.name)(
                      "aria-label",
                      e.ariaLabel || null
                    )("aria-labelledby", e.ariaLabelledby)(
                      "aria-checked",
                      e._getAriaChecked()
                    )("aria-describedby", e.ariaDescribedby),
                    Fi(2),
                    $r("matRippleTrigger", t)(
                      "matRippleDisabled",
                      e._isRippleDisabled()
                    )("matRippleRadius", 20)("matRippleCentered", !0)(
                      "matRippleAnimation",
                      (function (t, e, n) {
                        const i = ln() + 19,
                          s = Ye();
                        return s[i] === Ii
                          ? Dr(s, i, e())
                          : (function (t, e) {
                              return t[e];
                            })(s, i);
                      })(0, Ww)
                    );
                }
              },
              directives: [Gy, q_],
              styles: [
                "@keyframes mat-checkbox-fade-in-background{0%{opacity:0}50%{opacity:1}}@keyframes mat-checkbox-fade-out-background{0%,50%{opacity:1}100%{opacity:0}}@keyframes mat-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:22.910259}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1)}100%{stroke-dashoffset:0}}@keyframes mat-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mat-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);stroke-dashoffset:0}to{stroke-dashoffset:-22.910259}}@keyframes mat-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(45deg)}}@keyframes mat-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:0;transform:rotate(45deg)}to{opacity:1;transform:rotate(360deg)}}@keyframes mat-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:0;transform:rotate(-45deg)}to{opacity:1;transform:rotate(0deg)}}@keyframes mat-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(315deg)}}@keyframes mat-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;opacity:1;transform:scaleX(1)}32.8%,100%{opacity:0;transform:scaleX(0)}}.mat-checkbox-background,.mat-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:2px;box-sizing:border-box;pointer-events:none}.mat-checkbox{transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;-webkit-tap-highlight-color:transparent}._mat-animation-noopable.mat-checkbox{transition:none;animation:none}.mat-checkbox .mat-ripple-element:not(.mat-checkbox-persistent-ripple){opacity:.16}.mat-checkbox-layout{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mat-checkbox-label{-webkit-user-select:auto;-moz-user-select:auto;-ms-user-select:auto;user-select:auto}.mat-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin:auto;margin-right:8px;order:0;position:relative;vertical-align:middle;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .mat-checkbox-inner-container{margin-left:8px;margin-right:auto}.mat-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mat-checkbox-frame{background-color:transparent;transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1);border-width:2px;border-style:solid}._mat-animation-noopable .mat-checkbox-frame{transition:none}.cdk-high-contrast-active .mat-checkbox.cdk-keyboard-focused .mat-checkbox-frame{border-style:dotted}.mat-checkbox-background{align-items:center;display:inline-flex;justify-content:center;transition:background-color 90ms cubic-bezier(0, 0, 0.2, 0.1),opacity 90ms cubic-bezier(0, 0, 0.2, 0.1)}._mat-animation-noopable .mat-checkbox-background{transition:none}.cdk-high-contrast-active .mat-checkbox .mat-checkbox-background{background:none}.mat-checkbox-persistent-ripple{width:100%;height:100%;transform:none}.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:.04}.mat-checkbox.cdk-keyboard-focused .mat-checkbox-persistent-ripple{opacity:.12}.mat-checkbox-persistent-ripple,.mat-checkbox.mat-checkbox-disabled .mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:0}@media(hover: none){.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{display:none}}.mat-checkbox-checkmark{top:0;left:0;right:0;bottom:0;position:absolute;width:100%}.mat-checkbox-checkmark-path{stroke-dashoffset:22.910259;stroke-dasharray:22.910259;stroke-width:2.1333333333px}.cdk-high-contrast-black-on-white .mat-checkbox-checkmark-path{stroke:#000 !important}.mat-checkbox-mixedmark{width:calc(100% - 6px);height:2px;opacity:0;transform:scaleX(0) rotate(0deg);border-radius:2px}.cdk-high-contrast-active .mat-checkbox-mixedmark{height:0;border-top:solid 2px;margin-top:2px}.mat-checkbox-label-before .mat-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mat-checkbox-label-before .mat-checkbox-inner-container{margin-left:auto;margin-right:8px}.mat-checkbox-checked .mat-checkbox-checkmark{opacity:1}.mat-checkbox-checked .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-checked .mat-checkbox-mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark{opacity:0;transform:rotate(45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-indeterminate .mat-checkbox-mixedmark{opacity:1;transform:scaleX(1) rotate(0deg)}.mat-checkbox-unchecked .mat-checkbox-background{background-color:transparent}.mat-checkbox-disabled{cursor:default}.cdk-high-contrast-active .mat-checkbox-disabled{opacity:.5}.mat-checkbox-anim-unchecked-checked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-checked .mat-checkbox-checkmark-path{animation:180ms linear 0ms mat-checkbox-unchecked-checked-checkmark-path}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-unchecked-indeterminate-mixedmark}.mat-checkbox-anim-checked-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-checked-unchecked .mat-checkbox-checkmark-path{animation:90ms linear 0ms mat-checkbox-checked-unchecked-checkmark-path}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-checkmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-checkmark}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-mixedmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-checkmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-checkmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-mixedmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-mixedmark}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-mixedmark{animation:300ms linear 0ms mat-checkbox-indeterminate-unchecked-mixedmark}.mat-checkbox-input{bottom:0;left:50%}.mat-checkbox .mat-checkbox-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        nx = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })(),
        ix = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[Zy, Dy, W_, nx], Dy, nx],
            })),
            t
          );
        })();
      function sx(t, e) {
        if (1 & t) {
          const t = Gr();
          Br(0, "div", 14),
            Qr("click", function () {
              tn(t);
              const e = eo(2);
              return e.openTemtem(e.info.number);
            }),
            Ur();
        }
        2 & t &&
          lo(
            "background-image",
            "url(https://temtem-api.mael.tech/" + e.$implicit.icon + ")"
          );
      }
      const rx = function (t, e) {
        return { "caught-luma": t, "caught-temtem": e };
      };
      function ox(t, e) {
        if (1 & t) {
          const t = Gr();
          Br(0, "div", 1),
            Ra(1, "async"),
            Ra(2, "async"),
            Br(3, "div"),
            Br(4, "div", 2),
            Br(5, "div", 3),
            Qr("click", function () {
              tn(t);
              const e = eo();
              return e.openTemtem(e.info.number);
            }),
            Ur(),
            Br(6, "div", 4),
            Qr("click", function () {
              tn(t);
              const e = eo();
              return e.openTemtem(e.info.number);
            }),
            Ur(),
            Br(7, "div", 5),
            Br(8, "div", 6),
            Lr(9, sx, 1, 2, "div", 7),
            Ur(),
            Br(10, "div", 8),
            Br(11, "div", 9),
            Qr("click", function () {
              tn(t);
              const e = eo();
              return e.temtemLumaToggle(e.info.number);
            }),
            zr(12, "mat-checkbox", 10),
            Ra(13, "async"),
            zr(14, "div", 11),
            Ra(15, "async"),
            Ur(),
            Br(16, "div", 12),
            Qr("click", function () {
              tn(t);
              const e = eo();
              return e.temtemToggle(e.info.number);
            }),
            zr(17, "mat-checkbox", 10),
            Ra(18, "async"),
            Ur(),
            Ur(),
            Ur(),
            Ur(),
            Br(19, "div", 13),
            Qr("click", function () {
              tn(t);
              const e = eo();
              return e.openTemtem(e.info.number);
            }),
            go(20),
            Ur(),
            Ur(),
            Ur();
        }
        if (2 & t) {
          const t = eo();
          $r(
            "ngClass",
            Oa(21, rx, Da(1, 11, t.isLuma$), Da(2, 13, t.isCaught$))
          ),
            Fi(5),
            lo(
              "background-image",
              "url(https://temtem-api.mael.tech/" + t.info.icon + ")"
            ),
            Fi(1),
            lo(
              "background-image",
              "url(https://temtem-api.mael.tech/" + t.info.lumaIcon + ")"
            ),
            Fi(3),
            $r("ngForOf", t.info.types),
            Fi(3),
            $r("checked", Da(13, 15, t.isLuma$)),
            Fi(2),
            lo("opacity", Da(15, 17, t.isLuma$) ? 1 : 0.3),
            Fi(3),
            $r("checked", Da(18, 19, t.isCaught$)),
            Fi(3),
            yo(" ", "#" + t.info.number + " " + t.info.name, " ");
        }
      }
      let ax = (() => {
        class t {
          constructor(t, e, n) {
            (this.ref = t),
              (this.temtemService = e),
              (this.dialog = n),
              (this.typeIcons$ = new Md([])),
              (this.caught$ = new Md({ lumas: [], temtems: [] })),
              (this.isCaught$ = new Md(!1)),
              (this.isLuma$ = new Md(!1));
          }
          ngOnInit() {
            this.temtemService.getAllTypes$.pipe(hp(1)).subscribe((t) => {
              this.typeIcons$.next(
                t
                  .filter((t) => this.info.types.includes(t.name))
                  .map((t) => t.icon)
              );
            });
            const t = JSON.parse(localStorage.getItem("caught"));
            t && this.caught$.next(t),
              (null == t ? void 0 : t.temtems) &&
                this.isCaught$.next(t.temtems.includes(this.info.number)),
              (null == t ? void 0 : t.lumas) &&
                this.isLuma$.next(t.lumas.includes(this.info.number));
          }
          temtemToggle(t) {
            var e;
            let n = JSON.parse(localStorage.getItem("caught")),
              i = null == n ? void 0 : n.temtems;
            const s =
              null === (e = null == n ? void 0 : n.temtems) || void 0 === e
                ? void 0
                : e.indexOf(t);
            n
              ? 0 === i.length
                ? ((i = [t]), this.isCaught$.next(!0))
                : -1 === s
                ? (i.push(t), this.isCaught$.next(!0))
                : (i.splice(s, 1), this.isCaught$.next(!1))
              : ((n = { lumas: [], temtems: [] }),
                (i = [t]),
                this.isCaught$.next(!0)),
              localStorage.setItem(
                "caught",
                JSON.stringify(
                  Object.assign(Object.assign({}, n), { temtems: i })
                )
              ),
              this.caught$.next(
                Object.assign(Object.assign({}, n), { temtems: i })
              );
          }
          temtemLumaToggle(t) {
            var e;
            let n = JSON.parse(localStorage.getItem("caught")),
              i = null == n ? void 0 : n.lumas;
            const s =
              null === (e = null == n ? void 0 : n.lumas) || void 0 === e
                ? void 0
                : e.indexOf(t);
            n
              ? 0 === i.length
                ? ((i = [t]), this.isLuma$.next(!0))
                : -1 === s
                ? (i.push(t), this.isLuma$.next(!0))
                : (i.splice(s, 1), this.isLuma$.next(!1))
              : ((n = { lumas: [], temtems: [] }),
                (i = [t]),
                this.isLuma$.next(!0)),
              localStorage.setItem(
                "caught",
                JSON.stringify(
                  Object.assign(Object.assign({}, n), { lumas: i })
                )
              ),
              this.caught$.next(
                Object.assign(Object.assign({}, n), { lumas: i })
              );
          }
          openTemtem(t) {
            this.dialog.open(zw, { data: { temtemNumber: t } });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(jr(lr), jr(o_), jr(Iw));
          }),
          (t.ɵcmp = ue({
            type: t,
            selectors: [["app-temtem-listing-item"]],
            inputs: { info: "info" },
            decls: 1,
            vars: 1,
            consts: [
              [
                "class",
                "temtem-listing-item-container",
                3,
                "ngClass",
                4,
                "ngIf",
              ],
              [1, "temtem-listing-item-container", 3, "ngClass"],
              [1, "temtem-listing-item"],
              [1, "temtem-listing-item-temtem", 3, "click"],
              [1, "temtem-listing-item-luma", 3, "click"],
              [1, "temtem-listing-item-top"],
              [1, "temtem-listing-item-top-types"],
              [3, "backgroundImage", "click", 4, "ngFor", "ngForOf"],
              [1, "temtem-listing-item-top-checkboxes"],
              [1, "luma-hunter", 3, "click"],
              [2, "pointer-events", "none", 3, "checked"],
              [1, "luma-icon"],
              [1, "temtem-collector", 3, "click"],
              [1, "temtem-listing-item-bottom", 3, "click"],
              [3, "click"],
            ],
            template: function (t, e) {
              1 & t && Lr(0, ox, 21, 24, "div", 0), 2 & t && $r("ngIf", e.info);
            },
            directives: [Ec, xc, Sc, ex],
            pipes: [Mc],
            styles: [
              ".temtem-listing-item[_ngcontent-%COMP%]{width:var(--temtem-item-size);cursor:pointer;height:var(--temtem-item-size);padding:1px;position:relative;border-radius:3px 3px 0 0}.temtem-listing-item-luma[_ngcontent-%COMP%], .temtem-listing-item-temtem[_ngcontent-%COMP%]{top:0;left:0;width:100%;height:100%;position:absolute;border-radius:3px 3px 0 0;background-size:cover;background-color:var(--card-background-color);background-repeat:no-repeat;transition-duration:.2s}.temtem-listing-item-luma[_ngcontent-%COMP%]{opacity:0}.temtem-listing-item-top[_ngcontent-%COMP%]{width:100%;display:grid;justify-items:end;grid-template-columns:30px auto}.temtem-listing-item-top-types[_ngcontent-%COMP%]{z-index:1}.temtem-listing-item-top-types[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:30px;height:30px;display:grid;background-size:cover;background-repeat:no-repeat;grid-template-rows:repeat(2,30px)}.temtem-listing-item-bottom[_ngcontent-%COMP%]{width:var(--temtem-item-size);color:var(--font-color-contrast);cursor:pointer;padding:2px 4px;opacity:.9;font-size:.8em;font-weight:500;border-radius:0 0 3px 3px;background-color:var(--surface-color-contrast)}.temtem-listing-item-container[_ngcontent-%COMP%]{display:grid;grid-template-rows:repeat(auto,auto)}.temtem-listing-item-container[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:var(--temtem-item-size);box-shadow:var(--box-shadow-level-2);border-radius:3px;transition-duration:.2s}.temtem-listing-item-container[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:hover{box-shadow:var(--box-shadow-level-3)}.luma-hunter[_ngcontent-%COMP%], .temtem-collector[_ngcontent-%COMP%]{opacity:0;display:none;padding:2px 4px 4px 5px;margin-top:-2px;box-shadow:var(--box-shadow-level-1);margin-right:5px;border-radius:0 0 5px 5px;transition-duration:.2s}.temtem-collector[_ngcontent-%COMP%]{background-color:var(--temtem-collector-color)}.luma-hunter[_ngcontent-%COMP%]{background-color:var(--luma-hunter-color)}.luma-hunter[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%]{opacity:0}.temtem-listing-item-top-checkboxes[_ngcontent-%COMP%]{padding:1px 0}.luma-icon[_ngcontent-%COMP%]{top:3px;width:19px;height:19px;position:absolute;margin-left:-2px;background-size:cover;background-repeat:no-repeat;background-image:url(https://gamepedia.cursecdn.com/temtem_gamepedia_en/4/42/Luma_icon.png?version=4a65a92a1166331dd3aaec93d95d8fff)}",
            ],
            changeDetection: 0,
          })),
          t
        );
      })();
      function lx(t, e) {
        if (1 & t) {
          const t = Gr();
          Br(0, "div", 17),
            Qr("click", function () {
              tn(t);
              const n = e.$implicit;
              return eo().changeFilterType(n.name);
            }),
            Ra(1, "async"),
            Ur();
        }
        if (2 & t) {
          const t = e.$implicit,
            n = eo();
          lo(
            "background-image",
            "url(https://temtem-api.mael.tech/" + t.icon + ")"
          )("opacity", Da(1, 4, n.activeTypes$)[t.name] ? 1 : 0.5);
        }
      }
      function cx(t, e) {
        1 & t && zr(0, "app-temtem-listing-item", 18),
          2 & t && $r("info", e.$implicit);
      }
      const hx = function (t, e) {
          return { "luma-hunter": t, "temtem-collector": e };
        },
        ux = function (t, e) {
          return { "background-image": t, "background-position": e };
        },
        dx = function (t) {
          return { active: t };
        },
        px = function (t, e) {
          return { "temtem-collector": t, "luma-hunter": e };
        };
      let fx = (() => {
          class t {
            constructor(t, e) {
              (this.ref = t),
                (this.temtemService = e),
                (this.temtemsUnfiltered$ = this.temtemService
                  .getAllTemtems()
                  .pipe(Tg(1))),
                (this.types$ = this.temtemService.getAllTypes$),
                (this.temtems$ = new Md([])),
                (this.filters$ = new Md({
                  name: null,
                  types: null,
                  number: null,
                })),
                (this.activeTypes$ = new Md({})),
                (this.customOptions$ = new Md({
                  temtemCollector: !1,
                  lumaHunter: !1,
                })),
                (this.profileImage$ = new Md(""));
            }
            ngOnInit() {
              $d(this.temtemsUnfiltered$, this.filters$).subscribe(([t, e]) => {
                const n = t.filter(
                  (t) =>
                    (!e.name ||
                      t.name.toLowerCase().includes(e.name.toLowerCase())) &&
                    (!e.number ||
                      t.number.toString().includes(e.number.toString())) &&
                    (!e.types || this.arrayShareValue(t.types, e.types))
                );
                this.temtems$.next(n);
              });
              const t = JSON.parse(localStorage.getItem("customOptions"));
              t && this.customOptions$.next(t);
              const e = localStorage.getItem("profileImage");
              e && this.profileImage$.next(e);
            }
            arrayShareValue(t, e) {
              let n = !1;
              return (
                t.forEach((t) => {
                  e.includes(t) && (n = !0);
                }),
                n
              );
            }
            changeFilter(t, e) {
              this.filters$.pipe(hp(1)).subscribe((n) => {
                this.filters$.next(
                  Object.assign(Object.assign({}, n), { [t]: e })
                );
              });
            }
            changeFilterType(t) {
              this.filters$.pipe(hp(1)).subscribe((e) => {
                var n;
                let i = e.types;
                const s =
                  null === (n = e.types) || void 0 === n
                    ? void 0
                    : n.indexOf(t);
                e.types ? (-1 !== s ? i.splice(s, 1) : i.push(t)) : (i = [t]),
                  0 === i.length && (i = null),
                  this.filters$.next(
                    Object.assign(Object.assign({}, e), { types: i })
                  ),
                  this.activeTypes$.next(
                    i
                      ? Object.assign(i.map((t) => ({ [t]: !0 }))).reduce(
                          (t, e) => Object.assign(t, e),
                          {}
                        )
                      : {}
                  );
              });
            }
            getUsername() {
              var t;
              return null !== (t = localStorage.getItem("username")) &&
                void 0 !== t
                ? t
                : "";
            }
            changeUsername(t) {
              localStorage.setItem("username", t);
            }
            customOptionsToggle(t) {
              this.customOptions$.pipe(hp(1)).subscribe((e) => {
                const n = Object.assign(Object.assign({}, e), { [t]: !e[t] });
                localStorage.setItem("customOptions", JSON.stringify(n)),
                  this.customOptions$.next(n);
              });
            }
            changeImage(t) {
              this.profileImage$.next(t),
                localStorage.setItem("profileImage", t);
            }
            trackByFn(t, e) {
              return e.someUniqueIdentifier;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(jr(lr), jr(o_));
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["app-temtem-listing"]],
              decls: 55,
              vars: 47,
              consts: [
                [1, "main-container", 3, "ngClass"],
                [1, "temtem-options"],
                [1, "temtem-options-profile"],
                [1, "temtem-options-profile-image", 3, "ngStyle"],
                [1, "temtem-options-profile-text"],
                ["placeholder", "Click to change Name", 3, "value", "keyup"],
                [1, "luma-hunter", 3, "ngClass", "click"],
                [1, "temtem-collector", 3, "ngClass", "click"],
                ["appearance", "legacy", 3, "input"],
                ["matInput", "", "placeholder", "Number"],
                ["matInput", "", "placeholder", "Name"],
                [1, "temtem-options-types"],
                [
                  "class",
                  "temtem-options-type",
                  3,
                  "backgroundImage",
                  "opacity",
                  "click",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                ["appearance", "legacy", 3, "change"],
                [
                  "matInput",
                  "",
                  "placeholder",
                  "Profile Image (url)",
                  3,
                  "value",
                ],
                [1, "temtem-listing", 3, "ngClass"],
                [
                  "class",
                  "temtem-listing-item",
                  3,
                  "info",
                  4,
                  "ngFor",
                  "ngForOf",
                  "ngForTrackBy",
                ],
                [1, "temtem-options-type", 3, "click"],
                [1, "temtem-listing-item", 3, "info"],
              ],
              template: function (t, e) {
                1 & t &&
                  (Br(0, "div", 0),
                  Ra(1, "async"),
                  Ra(2, "async"),
                  Br(3, "div"),
                  Br(4, "div", 1),
                  Br(5, "div", 2),
                  zr(6, "div", 3),
                  Ra(7, "async"),
                  Ra(8, "async"),
                  Ra(9, "async"),
                  Br(10, "div", 4),
                  Br(11, "input", 5),
                  Qr("keyup", function (t) {
                    return e.changeUsername(t.target.value);
                  }),
                  Ur(),
                  Br(12, "div"),
                  Br(13, "div", 6),
                  Qr("click", function () {
                    return e.customOptionsToggle("lumaHunter");
                  }),
                  Ra(14, "async"),
                  go(15, " Luma Hunter "),
                  Ur(),
                  Ur(),
                  Br(16, "div"),
                  Br(17, "div", 7),
                  Qr("click", function () {
                    return e.customOptionsToggle("temtemCollector");
                  }),
                  Ra(18, "async"),
                  go(19, " temtem Collector "),
                  Ur(),
                  Ur(),
                  Ur(),
                  Ur(),
                  Br(20, "div"),
                  Br(21, "mat-accordion"),
                  Br(22, "mat-expansion-panel"),
                  Br(23, "mat-expansion-panel-header"),
                  Br(24, "mat-panel-title"),
                  go(25, " Filters "),
                  Ur(),
                  zr(26, "mat-panel-description"),
                  Ur(),
                  Br(27, "mat-form-field", 8),
                  Qr("input", function (t) {
                    return e.changeFilter("number", t.target.value);
                  }),
                  Br(28, "mat-label"),
                  go(29, "Number"),
                  Ur(),
                  zr(30, "input", 9),
                  Ur(),
                  Br(31, "mat-form-field", 8),
                  Qr("input", function (t) {
                    return e.changeFilter("name", t.target.value);
                  }),
                  Br(32, "mat-label"),
                  go(33, "Name"),
                  Ur(),
                  zr(34, "input", 10),
                  Ur(),
                  Br(35, "span"),
                  go(36, "Types"),
                  Ur(),
                  Br(37, "div", 11),
                  Lr(38, lx, 2, 6, "div", 12),
                  Ra(39, "async"),
                  Ur(),
                  Ur(),
                  Br(40, "mat-expansion-panel"),
                  Br(41, "mat-expansion-panel-header"),
                  Br(42, "mat-panel-title"),
                  go(43, " Options "),
                  Ur(),
                  zr(44, "mat-panel-description"),
                  Ur(),
                  Br(45, "mat-form-field", 13),
                  Qr("change", function (t) {
                    return e.changeImage(t.target.value);
                  }),
                  Br(46, "mat-label"),
                  go(47, "Profile Image (url)"),
                  Ur(),
                  zr(48, "input", 14),
                  Ra(49, "async"),
                  Ur(),
                  Ur(),
                  Ur(),
                  Ur(),
                  Ur(),
                  Ur(),
                  Br(50, "div", 15),
                  Ra(51, "async"),
                  Ra(52, "async"),
                  Lr(53, cx, 1, 1, "app-temtem-listing-item", 16),
                  Ra(54, "async"),
                  Ur(),
                  Ur()),
                  2 & t &&
                    ($r(
                      "ngClass",
                      Oa(
                        34,
                        hx,
                        Da(1, 10, e.customOptions$).lumaHunter,
                        Da(2, 12, e.customOptions$).temtemCollector
                      )
                    ),
                    Fi(6),
                    $r(
                      "ngStyle",
                      Oa(
                        37,
                        ux,
                        Da(7, 14, e.profileImage$)
                          ? "url(" + Da(8, 16, e.profileImage$) + ")"
                          : "",
                        Da(9, 18, e.profileImage$) ? "center" : ""
                      )
                    ),
                    Fi(5),
                    $r("value", e.getUsername()),
                    Fi(2),
                    $r(
                      "ngClass",
                      Aa(40, dx, Da(14, 20, e.customOptions$).lumaHunter)
                    ),
                    Fi(4),
                    $r(
                      "ngClass",
                      Aa(42, dx, Da(18, 22, e.customOptions$).temtemCollector)
                    ),
                    Fi(21),
                    $r("ngForOf", Da(39, 24, e.types$)),
                    Fi(10),
                    $r("value", Da(49, 26, e.profileImage$)),
                    Fi(2),
                    $r(
                      "ngClass",
                      Oa(
                        44,
                        px,
                        Da(51, 28, e.customOptions$).temtemCollector,
                        Da(52, 30, e.customOptions$).lumaHunter
                      )
                    ),
                    Fi(3),
                    $r("ngForOf", Da(54, 32, e.temtems$))(
                      "ngForTrackBy",
                      e.trackByFn
                    ));
              },
              directives: [xc, Rc, Cy, by, vy, xy, wy, Pb, xb, Lv, Sc, ax],
              pipes: [Mc],
              styles: [
                ".main-container[_ngcontent-%COMP%]{display:grid;grid-gap:30px;grid-template-columns:300px auto}.temtem-options[_ngcontent-%COMP%]{top:40px;width:100%;position:sticky;position:-webkit-sticky}.temtem-options[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{height:auto;border-radius:4px;box-shadow:var(--box-shadow-level-2);background-color:var(--surface-color)}.temtem-listing[_ngcontent-%COMP%]{display:grid;grid-gap:20px;justify-items:center;grid-template-columns:repeat(auto-fill,minmax(var(--temtem-item-size),1fr))}.temtem-options-types[_ngcontent-%COMP%]{display:grid;padding-top:5px;grid-template-columns:repeat(auto-fill,minmax(30px,1fr))}.temtem-options-type[_ngcontent-%COMP%]{width:30px;height:30px;cursor:pointer;opacity:.5;background-size:cover;background-repeat:no-repeat;transition-duration:.2s}.temtem-options[_ngcontent-%COMP%]   .temtem-options-profile[_ngcontent-%COMP%]{display:grid;padding:10px;grid-gap:10px;margin-bottom:20px;border-radius:50px 8px 8px 8px;grid-template-columns:auto 1fr}.temtem-options-profile-text[_ngcontent-%COMP%]{display:grid;padding:2px 0;align-content:space-between}.temtem-options-profile-text[_ngcontent-%COMP%] > input[_ngcontent-%COMP%]{width:100%;border:0;font-size:1.15em;margin-right:10px}.temtem-options-profile-text[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{color:var(--font-color-contrast);cursor:pointer;display:inline;opacity:.3;padding:4px 6px;font-size:.8em;font-weight:500;border-radius:8px;background-color:var(--surface-color-contrast);transition-duration:.2s}.temtem-options-profile-text[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > div.luma-hunter[_ngcontent-%COMP%]:hover{opacity:1;background-color:var(--luma-hunter-faded-color)}.temtem-options-profile-text[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > div.luma-hunter.active[_ngcontent-%COMP%]{opacity:1;background-color:var(--luma-hunter-color)}.temtem-options-profile-text[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > div.temtem-collector[_ngcontent-%COMP%]:hover{opacity:1;background-color:var(--temtem-collector-faded-color)}.temtem-options-profile-text[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > div.temtem-collector.active[_ngcontent-%COMP%]{opacity:1;background-color:var(--temtem-collector-color)}.temtem-options-profile-image[_ngcontent-%COMP%]{width:80px;height:80px;box-shadow:var(--box-shadow-level-1);border-radius:50% 8px 8px 8px;background-size:cover;background-image:url(https://assets.gamepur.com/wp-content/uploads/2020/03/17232647/Temtem-Platypet-850x560.jpg);background-repeat:no-repeat}.dialog[_ngcontent-%COMP%]{width:100vw;height:100vh;position:fixed}@media only screen and (max-width:750px){.main-container[_ngcontent-%COMP%]{grid-template-columns:auto}}",
              ],
              changeDetection: 0,
            })),
            t
          );
        })(),
        mx = (() => {
          class t {
            constructor() {
              this.title = "tempedia";
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = ue({
              type: t,
              selectors: [["app-root"]],
              decls: 1,
              vars: 0,
              template: function (t, e) {
                1 & t && zr(0, "app-temtem-listing");
              },
              directives: [fx],
              styles: [""],
              changeDetection: 0,
            })),
            t
          );
        })(),
        gx = (() => {
          class t {}
          return (
            (t.ɵmod = me({ type: t, bootstrap: [mx] })),
            (t.ɵinj = ct({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [],
              imports: [[fh, fg, r_, Fd, ky, Mv, ix, Iv, Pw]],
            })),
            t
          );
        })();
      (function () {
        if (fi)
          throw new Error("Cannot enable prod mode after platform setup.");
        pi = !1;
      })(),
        dh()
          .bootstrapModule(gx)
          .catch((t) => console.error(t));
    },
    zn8P: function (t, e) {
      function n(t) {
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = "zn8P");
    },
  },
  [[0, 0]],
]);
