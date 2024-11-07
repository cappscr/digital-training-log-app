(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [931],
  {
    4058: (e, a, l) => {
      Promise.resolve().then(l.bind(l, 6774));
    },
    6774: (e, a, l) => {
      "use strict";
      l.r(a), l.d(a, { default: () => x });
      var s = l(7437),
        i = l(1959),
        n = l(8557),
        c = l(9763),
        r = l(6608),
        t = l(6610),
        m = l(6293),
        p = l(4235),
        d = l(132),
        u = l(3275),
        o = l(7497);
      function x() {
        let e = (0, o.c)({
          mode: "uncontrolled",
          initialValues: {
            "pace-min": 1,
            "pace-sec": 0,
            "pace-units": "min/mi",
            percentage: 1,
          },
        });
        return (0, s.jsxs)(i.W, {
          size: "sm",
          children: [
            (0, s.jsx)(n.M, {
              children: (0, s.jsx)(c.D, {
                order: 1,
                children: "Pace Calculator",
              }),
            }),
            (0, s.jsxs)("form", {
              onSubmit: e.onSubmit((e) => console.log(e)),
              children: [
                (0, s.jsxs)(r.Z, {
                  children: [
                    (0, s.jsx)(
                      t.Y,
                      {
                        maw: 100,
                        label: "Pace",
                        "aria-label": "minutes in a pace value",
                        placeholder: "min",
                        radius: "md",
                        allowDecimal: !1,
                        stepHoldDelay: 500,
                        stepHoldInterval: 100,
                        min: 0.01,
                        max: 59.59,
                        ...e.getInputProps("pace-min"),
                      },
                      e.key("pace-min"),
                    ),
                    (0, s.jsx)(m.x, { fw: 700, mt: "1rem", children: ":" }),
                    (0, s.jsx)(
                      t.Y,
                      {
                        maw: 100,
                        label: " ",
                        "aria-label": "seconds in a pace value",
                        placeholder: "sec",
                        radius: "md",
                        allowDecimal: !1,
                        min: 0,
                        max: 59,
                        ...e.getInputProps("pace-sec"),
                      },
                      e.key("pace-sec"),
                    ),
                    (0, s.jsx)(
                      p.p,
                      {
                        label: " ",
                        data: ["min/mi", "km/mi"],
                        radius: "md",
                        ...e.getInputProps("pace-units"),
                      },
                      e.key("pace-units"),
                    ),
                  ],
                }),
                (0, s.jsxs)(d.K, {
                  align: "flex-start",
                  children: [
                    (0, s.jsx)(
                      t.Y,
                      {
                        maw: 100,
                        label: "Percentage",
                        placeholder: "95",
                        radius: "md",
                        allowDecimal: !1,
                        min: 1,
                        max: 99,
                        suffix: "%",
                        ...e.getInputProps("percentage"),
                      },
                      e.key("percentage"),
                    ),
                    (0, s.jsx)(u.z, {
                      type: "submit",
                      radius: "md",
                      children: "Calculate",
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
    },
  },
  (e) => {
    var a = (a) => e((e.s = a));
    e.O(0, [546, 286, 263, 130, 215, 744], () => a(4058)), (_N_E = e.O());
  },
]);
