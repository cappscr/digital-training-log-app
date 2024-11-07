(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [266],
  {
    7759: (e, a, s) => {
      Promise.resolve().then(s.bind(s, 9173));
    },
    9173: (e, a, s) => {
      "use strict";
      s.d(a, { default: () => x });
      var c = s(7437),
        n = s(6463),
        r = s(1959),
        t = s(8557),
        l = s(9763),
        i = s(6608),
        u = s(6610),
        m = s(6293),
        o = s(4235),
        p = s(132),
        d = s(3275),
        h = s(7497);
      function x() {
        let e = (0, h.c)({
            mode: "uncontrolled",
            initialValues: {
              "pace-min": 5,
              "pace-sec": 0,
              "pace-units": "min/mi",
              percentage: 80,
            },
          }),
          a = (0, n.useRouter)();
        return (0, c.jsxs)(r.W, {
          size: "sm",
          children: [
            (0, c.jsx)(t.M, {
              children: (0, c.jsx)(l.D, {
                order: 1,
                children: "Pace Calculator",
              }),
            }),
            (0, c.jsxs)("form", {
              onSubmit: e.onSubmit((e) =>
                a.push(
                  "/pace-results?min="
                    .concat(e["pace-min"], "&sec=")
                    .concat(e["pace-sec"], "&units=")
                    .concat(
                      encodeURIComponent("".concat(e["pace-units"])),
                      "&percent=",
                    )
                    .concat(e.percentage),
                ),
              ),
              children: [
                (0, c.jsxs)(i.Z, {
                  children: [
                    (0, c.jsx)(
                      u.Y,
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
                    (0, c.jsx)(m.x, { fw: 700, mt: "1rem", children: ":" }),
                    (0, c.jsx)(
                      u.Y,
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
                    (0, c.jsx)(
                      o.p,
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
                (0, c.jsxs)(p.K, {
                  align: "flex-start",
                  children: [
                    (0, c.jsx)(
                      u.Y,
                      {
                        maw: 100,
                        label: "Percentage",
                        placeholder: "95",
                        radius: "md",
                        allowDecimal: !1,
                        min: 1,
                        suffix: "%",
                        ...e.getInputProps("percentage"),
                      },
                      e.key("percentage"),
                    ),
                    (0, c.jsx)(d.z, {
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
    6463: (e, a, s) => {
      "use strict";
      var c = s(1169);
      s.o(c, "useRouter") &&
        s.d(a, {
          useRouter: function () {
            return c.useRouter;
          },
        }),
        s.o(c, "useSearchParams") &&
          s.d(a, {
            useSearchParams: function () {
              return c.useSearchParams;
            },
          });
    },
  },
  (e) => {
    var a = (a) => e((e.s = a));
    e.O(0, [546, 286, 263, 130, 215, 744], () => a(7759)), (_N_E = e.O());
  },
]);
