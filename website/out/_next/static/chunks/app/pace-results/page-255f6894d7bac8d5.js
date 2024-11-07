(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [955],
  {
    3825: (e, t, s) => {
      Promise.resolve().then(s.bind(s, 4276));
    },
    4276: (e, t, s) => {
      "use strict";
      s.d(t, { default: () => o });
      var n = s(7437),
        a = s(6463),
        i = s(1959),
        c = s(9763),
        r = s(9408),
        l = s(3275);
      class h {
        constructor(e, t, s) {
          (this.display = () =>
            ""
              .concat(this.min, ":")
              .concat(this.sec.toString().padStart(2, "0"), " ")
              .concat(this.units)),
            (this.inMin = () => this.min + this.sec / 60),
            (this.calcPercentage = (e) => {
              let t = (this.inMin() / 100) * (100 - e) + this.inMin();
              return new h(
                Math.floor(t),
                Math.round((60 * t) % 60),
                this.units,
              );
            }),
            (this.min = "number" == typeof e ? e : parseInt(e)),
            (this.sec = "number" == typeof t ? t : parseInt(t)),
            (this.units = s);
        }
      }
      function o() {
        let e = (0, a.useSearchParams)(),
          t = (0, a.useRouter)(),
          s = e.get("min"),
          o = e.get("sec"),
          u = e.get("units"),
          d = parseInt(e.get("percent"));
        (s && o && u && d) || t.push("/pace-calculator");
        let p = new h(s, o, u);
        console.log(p);
        let g = {
          caption: "Calculated paces based on ".concat(p.display()),
          head: ["Percentage", "Pace"],
          body: [[d, p.calcPercentage(d).display()]],
        };
        return (0, n.jsxs)(i.W, {
          size: "sm",
          children: [
            (0, n.jsx)(c.D, {
              order: 1,
              mt: "lg",
              ta: "center",
              children: "Pace Calculator",
            }),
            (0, n.jsx)(r.i, {
              data: g,
              mt: "lg",
              striped: !0,
              highlightOnHover: !0,
              withColumnBorders: !0,
              withTableBorder: !0,
            }),
            (0, n.jsx)(l.z, {
              radius: "md",
              onClick: () => t.push("/pace-calculator"),
              children: "Reset",
            }),
          ],
        });
      }
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [546, 286, 141, 130, 215, 744], () => t(3825)), (_N_E = e.O());
  },
]);
