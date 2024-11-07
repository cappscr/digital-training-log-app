"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [263],
  {
    9731: (e) => {
      e.exports = function e(t, r) {
        if (t === r) return !0;
        if (t && r && "object" == typeof t && "object" == typeof r) {
          if (t.constructor !== r.constructor) return !1;
          if (Array.isArray(t)) {
            if ((n = t.length) != r.length) return !1;
            for (a = n; 0 != a--; ) if (!e(t[a], r[a])) return !1;
            return !0;
          }
          if (t.constructor === RegExp)
            return t.source === r.source && t.flags === r.flags;
          if (t.valueOf !== Object.prototype.valueOf)
            return t.valueOf() === r.valueOf();
          if (t.toString !== Object.prototype.toString)
            return t.toString() === r.toString();
          if ((n = (o = Object.keys(t)).length) !== Object.keys(r).length)
            return !1;
          for (a = n; 0 != a--; )
            if (!Object.prototype.hasOwnProperty.call(r, o[a])) return !1;
          for (a = n; 0 != a--; ) {
            var n,
              a,
              o,
              l = o[a];
            if (!e(t[l], r[l])) return !1;
          }
          return !0;
        }
        return t != t && r != r;
      };
    },
    8557: (e, t, r) => {
      r.d(t, { M: () => c });
      var n = r(7437);
      r(2265);
      var a = r(591),
        o = r(6348),
        l = r(8987),
        i = r(869),
        u = { root: "m_4451eb3a" };
      let s = {},
        c = (0, i.b)((e, t) => {
          let r = (0, a.w)("Center", s, e),
            {
              classNames: i,
              className: c,
              style: d,
              styles: f,
              unstyled: p,
              vars: v,
              inline: m,
              mod: h,
              ...g
            } = r,
            b = (0, o.y)({
              name: "Center",
              props: r,
              classes: u,
              className: c,
              style: d,
              classNames: i,
              styles: f,
              unstyled: p,
              vars: v,
            });
          return (0, n.jsx)(l.x, {
            ref: t,
            mod: [{ inline: m }, h],
            ...b("root"),
            ...g,
          });
        });
      (c.classes = u), (c.displayName = "@mantine/core/Center");
    },
    6608: (e, t, r) => {
      r.d(t, { Z: () => v });
      var n = r(7437),
        a = r(2265),
        o = r(4120),
        l = r(5593),
        i = r(591),
        u = r(6348),
        s = r(8987),
        c = r(3147),
        d = { root: "m_4081bf90" };
      let f = {
          preventGrowOverflow: !0,
          gap: "md",
          align: "center",
          justify: "flex-start",
          wrap: "wrap",
        },
        p = (0, l.Z)((e, t, r) => {
          let {
              grow: n,
              preventGrowOverflow: a,
              gap: l,
              align: i,
              justify: u,
              wrap: s,
            } = t,
            { childWidth: c } = r;
          return {
            root: {
              "--group-child-width": n && a ? c : void 0,
              "--group-gap": (0, o.bG)(l),
              "--group-align": i,
              "--group-justify": u,
              "--group-wrap": s,
            },
          };
        }),
        v = (0, c.d5)((e, t) => {
          let r = (0, i.w)("Group", f, e),
            {
              classNames: l,
              className: c,
              style: v,
              styles: m,
              unstyled: h,
              children: g,
              gap: b,
              align: y,
              justify: S,
              wrap: w,
              grow: x,
              preventGrowOverflow: E,
              vars: V,
              variant: j,
              __size: C,
              mod: N,
              ...k
            } = r,
            I = a.Children.toArray(g).filter(Boolean),
            D = I.length,
            O = (0, o.bG)(null != b ? b : "md"),
            _ = "calc("
              .concat(100 / D, "% - (")
              .concat(O, " - ")
              .concat(O, " / ")
              .concat(D, "))"),
            T = (0, u.y)({
              name: "Group",
              props: r,
              stylesCtx: { childWidth: _ },
              className: c,
              style: v,
              classes: d,
              classNames: l,
              styles: m,
              unstyled: h,
              vars: V,
              varsResolver: p,
            });
          return (0, n.jsx)(s.x, {
            ...T("root"),
            ref: t,
            variant: j,
            mod: [{ grow: x }, N],
            size: C,
            ...k,
            children: I,
          });
        });
      (v.classes = d), (v.displayName = "@mantine/core/Group");
    },
    4269: (e, t, r) => {
      r.d(t, { M: () => R });
      var n = r(7437),
        a = r(2265),
        o = r(869),
        l = r(1607),
        i = r(4120),
        u = r(5593),
        s = r(591),
        c = r(6348),
        d = r(7622),
        f = r(8987),
        p = r(3147);
      let [v, m] = (function () {
        let e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : null,
          t = (0, a.createContext)(e);
        return [
          (e) => {
            let { children: r, value: a } = e;
            return (0, n.jsx)(t.Provider, { value: a, children: r });
          },
          () => (0, a.useContext)(t),
        ];
      })({
        offsetBottom: !1,
        offsetTop: !1,
        describedBy: void 0,
        getStyles: null,
        inputId: void 0,
        labelId: void 0,
      });
      var h = {
        wrapper: "m_6c018570",
        input: "m_8fb7ebe7",
        section: "m_82577fc2",
        placeholder: "m_88bacfd0",
        root: "m_46b77525",
        label: "m_8fdc1311",
        required: "m_78a94662",
        error: "m_8f816625",
        description: "m_fe47ce59",
      };
      let g = {},
        b = (0, u.Z)((e, t) => {
          let { size: r } = t;
          return {
            description: {
              "--input-description-size":
                void 0 === r
                  ? void 0
                  : "calc("
                      .concat((0, i.yv)(r), " - ")
                      .concat((0, l.h)(2), ")"),
            },
          };
        }),
        y = (0, p.d5)((e, t) => {
          let r = (0, s.w)("InputDescription", g, e),
            {
              classNames: a,
              className: o,
              style: l,
              styles: i,
              unstyled: u,
              vars: d,
              size: p,
              __staticSelector: v,
              __inheritStyles: y = !0,
              variant: S,
              ...w
            } = (0, s.w)("InputDescription", g, r),
            x = m(),
            E = (0, c.y)({
              name: ["InputWrapper", v],
              props: r,
              classes: h,
              className: o,
              style: l,
              classNames: a,
              styles: i,
              unstyled: u,
              rootSelector: "description",
              vars: d,
              varsResolver: b,
            }),
            V = (y && (null == x ? void 0 : x.getStyles)) || E;
          return (0, n.jsx)(f.x, {
            component: "p",
            ref: t,
            variant: S,
            size: p,
            ...V(
              "description",
              (null == x ? void 0 : x.getStyles)
                ? { className: o, style: l }
                : void 0,
            ),
            ...w,
          });
        });
      (y.classes = h), (y.displayName = "@mantine/core/InputDescription");
      let S = {},
        w = (0, u.Z)((e, t) => {
          let { size: r } = t;
          return {
            error: {
              "--input-error-size":
                void 0 === r
                  ? void 0
                  : "calc("
                      .concat((0, i.yv)(r), " - ")
                      .concat((0, l.h)(2), ")"),
            },
          };
        }),
        x = (0, p.d5)((e, t) => {
          let r = (0, s.w)("InputError", S, e),
            {
              classNames: a,
              className: o,
              style: l,
              styles: i,
              unstyled: u,
              vars: d,
              size: p,
              __staticSelector: v,
              __inheritStyles: g = !0,
              variant: b,
              ...y
            } = r,
            x = (0, c.y)({
              name: ["InputWrapper", v],
              props: r,
              classes: h,
              className: o,
              style: l,
              classNames: a,
              styles: i,
              unstyled: u,
              rootSelector: "error",
              vars: d,
              varsResolver: w,
            }),
            E = m(),
            V = (g && (null == E ? void 0 : E.getStyles)) || x;
          return (0, n.jsx)(f.x, {
            component: "p",
            ref: t,
            variant: b,
            size: p,
            ...V(
              "error",
              (null == E ? void 0 : E.getStyles)
                ? { className: o, style: l }
                : void 0,
            ),
            ...y,
          });
        });
      (x.classes = h), (x.displayName = "@mantine/core/InputError");
      let E = { labelElement: "label" },
        V = (0, u.Z)((e, t) => {
          let { size: r } = t;
          return {
            label: {
              "--input-label-size": (0, i.yv)(r),
              "--input-asterisk-color": void 0,
            },
          };
        }),
        j = (0, p.d5)((e, t) => {
          let r = (0, s.w)("InputLabel", E, e),
            {
              classNames: a,
              className: o,
              style: l,
              styles: i,
              unstyled: u,
              vars: d,
              labelElement: p,
              size: v,
              required: g,
              htmlFor: b,
              onMouseDown: y,
              children: S,
              __staticSelector: w,
              variant: x,
              mod: j,
              ...C
            } = (0, s.w)("InputLabel", E, r),
            N = (0, c.y)({
              name: ["InputWrapper", w],
              props: r,
              classes: h,
              className: o,
              style: l,
              classNames: a,
              styles: i,
              unstyled: u,
              rootSelector: "label",
              vars: d,
              varsResolver: V,
            }),
            k = m(),
            I = (null == k ? void 0 : k.getStyles) || N;
          return (0, n.jsxs)(f.x, {
            ...I(
              "label",
              (null == k ? void 0 : k.getStyles)
                ? { className: o, style: l }
                : void 0,
            ),
            component: p,
            variant: x,
            size: v,
            ref: t,
            htmlFor: "label" === p ? b : void 0,
            mod: [{ required: g }, j],
            onMouseDown: (e) => {
              null == y || y(e),
                !e.defaultPrevented && e.detail > 1 && e.preventDefault();
            },
            ...C,
            children: [
              S,
              g &&
                (0, n.jsx)("span", {
                  ...I("required"),
                  "aria-hidden": !0,
                  children: " *",
                }),
            ],
          });
        });
      (j.classes = h), (j.displayName = "@mantine/core/InputLabel");
      let C = {},
        N = (0, p.d5)((e, t) => {
          let r = (0, s.w)("InputPlaceholder", C, e),
            {
              classNames: a,
              className: o,
              style: l,
              styles: i,
              unstyled: u,
              vars: d,
              __staticSelector: p,
              variant: v,
              error: m,
              mod: g,
              ...b
            } = (0, s.w)("InputPlaceholder", C, r),
            y = (0, c.y)({
              name: ["InputPlaceholder", p],
              props: r,
              classes: h,
              className: o,
              style: l,
              classNames: a,
              styles: i,
              unstyled: u,
              rootSelector: "placeholder",
            });
          return (0, n.jsx)(f.x, {
            ...y("placeholder"),
            mod: [{ error: !!m }, g],
            component: "span",
            variant: v,
            ref: t,
            ...b,
          });
        });
      (N.classes = h), (N.displayName = "@mantine/core/InputPlaceholder");
      var k = r(5206);
      let I = a["useId".toString()] || (() => void 0),
        D = {
          labelElement: "label",
          inputContainer: (e) => e,
          inputWrapperOrder: ["label", "description", "input", "error"],
        },
        O = (0, u.Z)((e, t) => {
          let { size: r } = t;
          return {
            label: {
              "--input-label-size": (0, i.yv)(r),
              "--input-asterisk-color": void 0,
            },
            error: {
              "--input-error-size":
                void 0 === r
                  ? void 0
                  : "calc("
                      .concat((0, i.yv)(r), " - ")
                      .concat((0, l.h)(2), ")"),
            },
            description: {
              "--input-description-size":
                void 0 === r
                  ? void 0
                  : "calc("
                      .concat((0, i.yv)(r), " - ")
                      .concat((0, l.h)(2), ")"),
            },
          };
        }),
        _ = (0, p.d5)((e, t) => {
          let r = (0, s.w)("InputWrapper", D, e),
            {
              classNames: o,
              className: l,
              style: i,
              styles: u,
              unstyled: d,
              vars: p,
              size: m,
              variant: g,
              __staticSelector: b,
              inputContainer: S,
              inputWrapperOrder: w,
              label: E,
              error: V,
              description: C,
              labelProps: N,
              descriptionProps: _,
              errorProps: T,
              labelElement: F,
              children: A,
              withAsterisk: M,
              id: R,
              required: L,
              __stylesApiProps: P,
              mod: B,
              ...z
            } = r,
            W = (0, c.y)({
              name: ["InputWrapper", b],
              props: P || r,
              classes: h,
              className: l,
              style: i,
              classNames: o,
              styles: u,
              unstyled: d,
              vars: p,
              varsResolver: O,
            }),
            Z = { size: m, variant: g, __staticSelector: b },
            G = (function (e) {
              let t = (function () {
                  let e = I();
                  return e ? "mantine-".concat(e.replace(/:/g, "")) : "";
                })(),
                [r, n] = (0, a.useState)(t);
              return ((0, k.Y)(() => {
                n("mantine-".concat(Math.random().toString(36).slice(2, 11)));
              }, []),
              "string" == typeof e)
                ? e
                : "undefined" == typeof window
                  ? t
                  : r;
            })(R),
            K = (null == T ? void 0 : T.id) || "".concat(G, "-error"),
            U = (null == _ ? void 0 : _.id) || "".concat(G, "-description"),
            $ = !!V && "boolean" != typeof V,
            q = !!C,
            H = "".concat($ ? K : "", " ").concat(q ? U : ""),
            X = H.trim().length > 0 ? H.trim() : void 0,
            Y = (null == N ? void 0 : N.id) || "".concat(G, "-label"),
            J =
              E &&
              (0, n.jsx)(
                j,
                {
                  labelElement: F,
                  id: Y,
                  htmlFor: G,
                  required: "boolean" == typeof M ? M : L,
                  ...Z,
                  ...N,
                  children: E,
                },
                "label",
              ),
            Q =
              q &&
              (0, n.jsx)(
                y,
                {
                  ..._,
                  ...Z,
                  size: (null == _ ? void 0 : _.size) || Z.size,
                  id: (null == _ ? void 0 : _.id) || U,
                  children: C,
                },
                "description",
              ),
            ee = (0, n.jsx)(a.Fragment, { children: S(A) }, "input"),
            et =
              $ &&
              (0, a.createElement)(
                x,
                {
                  ...T,
                  ...Z,
                  size: (null == T ? void 0 : T.size) || Z.size,
                  key: "error",
                  id: (null == T ? void 0 : T.id) || K,
                },
                V,
              ),
            er = w.map((e) => {
              switch (e) {
                case "label":
                  return J;
                case "input":
                  return ee;
                case "description":
                  return Q;
                case "error":
                  return et;
                default:
                  return null;
              }
            });
          return (0, n.jsx)(v, {
            value: {
              getStyles: W,
              describedBy: X,
              inputId: G,
              labelId: Y,
              ...(function (e, t) {
                let { hasDescription: r, hasError: n } = t,
                  a = e.findIndex((e) => "input" === e),
                  o = e.slice(0, a),
                  l = e.slice(a + 1),
                  i =
                    (r && o.includes("description")) ||
                    (n && o.includes("error"));
                return {
                  offsetBottom:
                    (r && l.includes("description")) ||
                    (n && l.includes("error")),
                  offsetTop: i,
                };
              })(w, { hasDescription: q, hasError: $ }),
            },
            children: (0, n.jsx)(f.x, {
              ref: t,
              variant: g,
              size: m,
              mod: [{ error: !!V }, B],
              ...W("root"),
              ...z,
              children: er,
            }),
          });
        });
      (_.classes = h), (_.displayName = "@mantine/core/InputWrapper");
      let T = {
          variant: "default",
          leftSectionPointerEvents: "none",
          rightSectionPointerEvents: "none",
          withAria: !0,
          withErrorStyles: !0,
        },
        F = (0, u.Z)((e, t, r) => ({
          wrapper: {
            "--input-margin-top": r.offsetTop
              ? "calc(var(--mantine-spacing-xs) / 2)"
              : void 0,
            "--input-margin-bottom": r.offsetBottom
              ? "calc(var(--mantine-spacing-xs) / 2)"
              : void 0,
            "--input-height": (0, i.ap)(t.size, "input-height"),
            "--input-fz": (0, i.yv)(t.size),
            "--input-radius":
              void 0 === t.radius ? void 0 : (0, i.H5)(t.radius),
            "--input-left-section-width":
              void 0 !== t.leftSectionWidth
                ? (0, l.h)(t.leftSectionWidth)
                : void 0,
            "--input-right-section-width":
              void 0 !== t.rightSectionWidth
                ? (0, l.h)(t.rightSectionWidth)
                : void 0,
            "--input-padding-y": t.multiline
              ? (0, i.ap)(t.size, "input-padding-y")
              : void 0,
            "--input-left-section-pointer-events": t.leftSectionPointerEvents,
            "--input-right-section-pointer-events": t.rightSectionPointerEvents,
          },
        })),
        A = (0, o.b)((e, t) => {
          let r = (0, s.w)("Input", T, e),
            {
              classNames: a,
              className: o,
              style: l,
              styles: i,
              unstyled: u,
              required: p,
              __staticSelector: v,
              __stylesApiProps: g,
              size: b,
              wrapperProps: y,
              error: S,
              disabled: w,
              leftSection: x,
              leftSectionProps: E,
              leftSectionWidth: V,
              rightSection: j,
              rightSectionProps: C,
              rightSectionWidth: N,
              rightSectionPointerEvents: k,
              leftSectionPointerEvents: I,
              variant: D,
              vars: O,
              pointer: _,
              multiline: A,
              radius: M,
              id: R,
              withAria: L,
              withErrorStyles: P,
              mod: B,
              inputSize: z,
              ...W
            } = r,
            { styleProps: Z, rest: G } = (0, d.c)(W),
            K = m(),
            U = {
              offsetBottom: null == K ? void 0 : K.offsetBottom,
              offsetTop: null == K ? void 0 : K.offsetTop,
            },
            $ = (0, c.y)({
              name: ["Input", v],
              props: g || r,
              classes: h,
              className: o,
              style: l,
              classNames: a,
              styles: i,
              unstyled: u,
              stylesCtx: U,
              rootSelector: "wrapper",
              vars: O,
              varsResolver: F,
            }),
            q = L
              ? {
                  required: p,
                  disabled: w,
                  "aria-invalid": !!S,
                  "aria-describedby": null == K ? void 0 : K.describedBy,
                  id: (null == K ? void 0 : K.inputId) || R,
                }
              : {};
          return (0, n.jsxs)(f.x, {
            ...$("wrapper"),
            ...Z,
            ...y,
            mod: [
              {
                error: !!S && P,
                pointer: _,
                disabled: w,
                multiline: A,
                "data-with-right-section": !!j,
                "data-with-left-section": !!x,
              },
              B,
            ],
            variant: D,
            size: b,
            children: [
              x &&
                (0, n.jsx)("div", {
                  ...E,
                  "data-position": "left",
                  ...$("section", {
                    className: null == E ? void 0 : E.className,
                    style: null == E ? void 0 : E.style,
                  }),
                  children: x,
                }),
              (0, n.jsx)(f.x, {
                component: "input",
                ...G,
                ...q,
                ref: t,
                required: p,
                mod: { disabled: w, error: !!S && P },
                variant: D,
                __size: z,
                ...$("input"),
              }),
              j &&
                (0, n.jsx)("div", {
                  ...C,
                  "data-position": "right",
                  ...$("section", {
                    className: null == C ? void 0 : C.className,
                    style: null == C ? void 0 : C.style,
                  }),
                  children: j,
                }),
            ],
          });
        });
      (A.classes = h),
        (A.Wrapper = _),
        (A.Label = j),
        (A.Error = x),
        (A.Description = y),
        (A.Placeholder = N),
        (A.displayName = "@mantine/core/Input");
      let M = { __staticSelector: "InputBase", withAria: !0 },
        R = (0, o.b)((e, t) => {
          let {
            inputProps: r,
            wrapperProps: a,
            ...o
          } = (function (e, t, r) {
            let n = (0, s.w)(e, t, r),
              {
                label: a,
                description: o,
                error: l,
                required: i,
                classNames: u,
                styles: c,
                className: f,
                unstyled: p,
                __staticSelector: v,
                __stylesApiProps: m,
                errorProps: h,
                labelProps: g,
                descriptionProps: b,
                wrapperProps: y,
                id: S,
                size: w,
                style: x,
                inputContainer: E,
                inputWrapperOrder: V,
                withAsterisk: j,
                variant: C,
                vars: N,
                mod: k,
                ...I
              } = n,
              { styleProps: D, rest: O } = (0, d.c)(I),
              _ = {
                label: a,
                description: o,
                error: l,
                required: i,
                classNames: u,
                className: f,
                __staticSelector: v,
                __stylesApiProps: m || n,
                errorProps: h,
                labelProps: g,
                descriptionProps: b,
                unstyled: p,
                styles: c,
                size: w,
                style: x,
                inputContainer: E,
                inputWrapperOrder: V,
                withAsterisk: j,
                variant: C,
                id: S,
                mod: k,
                ...y,
              };
            return {
              ...O,
              classNames: u,
              styles: c,
              unstyled: p,
              wrapperProps: { ..._, ...D },
              inputProps: {
                required: i,
                classNames: u,
                styles: c,
                unstyled: p,
                size: w,
                __staticSelector: v,
                __stylesApiProps: m || n,
                error: l,
                variant: C,
                id: S,
              },
            };
          })("InputBase", M, e);
          return (0, n.jsx)(A.Wrapper, {
            ...a,
            children: (0, n.jsx)(A, { ...r, ...o, ref: t }),
          });
        });
      (R.classes = { ...A.classes, ...A.Wrapper.classes }),
        (R.displayName = "@mantine/core/InputBase");
    },
    4235: (e, t, r) => {
      r.d(t, { p: () => g });
      var n = r(7437);
      r(2265);
      var a = r(591),
        o = r(3147),
        l = r(4120),
        i = r(5593),
        u = r(6348),
        s = r(8987),
        c = {
          dropdown: "m_88b62a41",
          search: "m_985517d8",
          options: "m_b2821a6e",
          option: "m_92253aa5",
          empty: "m_2530cd1d",
          header: "m_858f94bd",
          footer: "m_82b967cb",
          group: "m_254f3e4f",
          groupLabel: "m_2bb2e9e5",
          chevron: "m_2943220b",
          optionsDropdownOption: "m_390b5f4",
          optionsDropdownCheckIcon: "m_8ee53fc2",
        };
      let d = { error: null },
        f = (0, i.Z)((e, t) => {
          let { size: r } = t;
          return {
            chevron: {
              "--combobox-chevron-size": (0, l.ap)(r, "combobox-chevron-size"),
            },
          };
        }),
        p = (0, o.d5)((e, t) => {
          let r = (0, a.w)("ComboboxChevron", d, e),
            {
              size: o,
              error: l,
              style: i,
              className: p,
              classNames: v,
              styles: m,
              unstyled: h,
              vars: g,
              mod: b,
              ...y
            } = r,
            S = (0, u.y)({
              name: "ComboboxChevron",
              classes: c,
              props: r,
              style: i,
              className: p,
              classNames: v,
              styles: m,
              unstyled: h,
              vars: g,
              varsResolver: f,
              rootSelector: "chevron",
            });
          return (0, n.jsx)(s.x, {
            component: "svg",
            ...y,
            ...S("chevron"),
            size: o,
            viewBox: "0 0 15 15",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            mod: ["combobox-chevron", { error: l }, b],
            ref: t,
            children: (0, n.jsx)("path", {
              d: "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",
              fill: "currentColor",
              fillRule: "evenodd",
              clipRule: "evenodd",
            }),
          });
        });
      (p.classes = c), (p.displayName = "@mantine/core/ComboboxChevron");
      var v = r(4269);
      function m(e) {
        let { data: t } = e;
        if ("group" in t) {
          let e = t.items.map((e) => (0, n.jsx)(m, { data: e }, e.value));
          return (0, n.jsx)("optgroup", { label: t.group, children: e });
        }
        let { value: r, label: a, ...o } = t;
        return (0, n.jsx)(
          "option",
          { value: t.value, ...o, children: t.label },
          t.value,
        );
      }
      m.displayName = "@mantine/core/NativeSelectOption";
      let h = { rightSectionPointerEvents: "none" },
        g = (0, o.d5)((e, t) => {
          let {
              data: r,
              children: o,
              size: l,
              error: i,
              rightSection: u,
              unstyled: s,
              ...c
            } = (0, a.w)("NativeSelect", h, e),
            d = (function (e) {
              return e
                ? e.map((e) =>
                    (function e(t) {
                      return "string" == typeof t
                        ? { value: t, label: t }
                        : "value" in t && !("label" in t)
                          ? {
                              value: t.value,
                              label: t.value,
                              disabled: t.disabled,
                            }
                          : "number" == typeof t
                            ? { value: t.toString(), label: t.toString() }
                            : "group" in t
                              ? {
                                  group: t.group,
                                  items: t.items.map((t) => e(t)),
                                }
                              : t;
                    })(e),
                  )
                : [];
            })(r).map((e, t) => (0, n.jsx)(m, { data: e }, t));
          return (0, n.jsx)(v.M, {
            component: "select",
            ref: t,
            ...c,
            __staticSelector: "NativeSelect",
            size: l,
            pointer: !0,
            error: i,
            unstyled: s,
            rightSection:
              u || (0, n.jsx)(p, { size: l, error: i, unstyled: s }),
            children: o || d,
          });
        });
      (g.classes = v.M.classes), (g.displayName = "@mantine/core/NativeSelect");
    },
    6610: (e, t, r) => {
      r.d(t, { Y: () => X });
      var n,
        a = r(7437),
        o = r(2265),
        l = r(4839);
      function i(e, t) {
        var r = {};
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) &&
            0 > t.indexOf(n) &&
            (r[n] = e[n]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols)
          for (
            var a = 0, n = Object.getOwnPropertySymbols(e);
            a < n.length;
            a++
          )
            0 > t.indexOf(n[a]) &&
              Object.prototype.propertyIsEnumerable.call(e, n[a]) &&
              (r[n[a]] = e[n[a]]);
        return r;
      }
      function u() {}
      function s(e) {
        return !!(e || "").match(/\d/);
      }
      function c(e) {
        return null == e;
      }
      function d(e) {
        return (
          c(e) ||
          ("number" == typeof e && isNaN(e)) ||
          ("number" == typeof e && !isFinite(e))
        );
      }
      function f(e) {
        return e.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
      }
      function p(e, t) {
        void 0 === t && (t = !0);
        var r = "-" === e[0],
          n = r && t,
          a = (e = e.replace("-", "")).split(".");
        return {
          beforeDecimal: a[0],
          afterDecimal: a[1] || "",
          hasNegation: r,
          addNegation: n,
        };
      }
      function v(e, t, r) {
        for (var n = "", a = r ? "0" : "", o = 0; o <= t - 1; o++)
          n += e[o] || a;
        return n;
      }
      function m(e, t) {
        return Array(t + 1).join(e);
      }
      function h(e) {
        var t = e + "",
          r = "-" === t[0] ? "-" : "";
        r && (t = t.substring(1));
        var n = t.split(/[eE]/g),
          a = n[0],
          o = n[1];
        if (!(o = Number(o))) return r + a;
        a = a.replace(".", "");
        var l = 1 + o,
          i = a.length;
        return (
          l < 0
            ? (a = "0." + m("0", Math.abs(l)) + a)
            : l >= i
              ? (a += m("0", l - i))
              : (a = (a.substring(0, l) || "0") + "." + a.substring(l)),
          r + a
        );
      }
      function g(e, t, r) {
        if (-1 !== ["", "-"].indexOf(e)) return e;
        var n = (-1 !== e.indexOf(".") || r) && t,
          a = p(e),
          o = a.beforeDecimal,
          l = a.afterDecimal,
          i = a.hasNegation,
          u = parseFloat("0." + (l || "0")),
          s = (l.length <= t ? "0." + l : u.toFixed(t)).split(".");
        return (
          (i ? "-" : "") +
          o
            .split("")
            .reverse()
            .reduce(function (e, t, r) {
              return e.length > r
                ? (Number(e[0]) + Number(t)).toString() +
                    e.substring(1, e.length)
                : t + e;
            }, s[0]) +
          (n ? "." : "") +
          v(s[1] || "", t, r)
        );
      }
      function b(e, t) {
        if (((e.value = e.value), null !== e)) {
          if (e.createTextRange) {
            var r = e.createTextRange();
            return r.move("character", t), r.select(), !0;
          }
          return e.selectionStart || 0 === e.selectionStart
            ? (e.focus(), e.setSelectionRange(t, t), !0)
            : (e.focus(), !1);
        }
      }
      !(function (e) {
        (e.event = "event"), (e.props = "prop");
      })(n || (n = {}));
      var y = (function (e) {
        var t,
          r = void 0;
        return function () {
          for (var n = [], a = arguments.length; a--; ) n[a] = arguments[a];
          return t &&
            n.length === t.length &&
            n.every(function (e, r) {
              return e === t[r];
            })
            ? r
            : ((t = n), (r = e.apply(void 0, n)));
        };
      })(function (e, t) {
        for (
          var r = 0, n = 0, a = e.length, o = t.length;
          e[r] === t[r] && r < a;

        )
          r++;
        for (; e[a - 1 - n] === t[o - 1 - n] && o - n > r && a - n > r; ) n++;
        return { from: { start: r, end: a - n }, to: { start: r, end: o - n } };
      });
      function S(e) {
        return Math.max(e.selectionStart, e.selectionEnd);
      }
      function w(e) {
        var t = e.currentValue,
          r = e.formattedValue,
          n = e.currentValueIndex,
          a = e.formattedValueIndex;
        return t[n] === r[a];
      }
      function x(e, t, r, n) {
        var a = e.length;
        if (((t = Math.min(Math.max(t, 0), a)), "left" === n)) {
          for (; t >= 0 && !r[t]; ) t--;
          -1 === t && (t = r.indexOf(!0));
        } else {
          for (; t <= a && !r[t]; ) t++;
          t > a && (t = r.lastIndexOf(!0));
        }
        return -1 === t && (t = a), t;
      }
      function E(e) {
        for (
          var t = Array.from({ length: e.length + 1 }).map(function () {
              return !0;
            }),
            r = 0,
            n = t.length;
          r < n;
          r++
        )
          t[r] = !!(s(e[r]) || s(e[r - 1]));
        return t;
      }
      function V(e, t, r, n, a, l) {
        void 0 === l && (l = u);
        var i,
          s,
          f =
            ((i = function (e, t) {
              var r, o;
              return (
                d(e)
                  ? ((o = ""), (r = ""))
                  : (r =
                      "number" == typeof e || t
                        ? n((o = "number" == typeof e ? h(e) : e))
                        : n((o = a(e, void 0)))),
                { formattedValue: r, numAsString: o }
              );
            }),
            ((s = (0, o.useRef)(i)).current = i),
            (0, o.useRef)(function () {
              for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
              return s.current.apply(s, e);
            }).current),
          p = (0, o.useState)(function () {
            return f(c(e) ? t : e, r);
          }),
          v = p[0],
          m = p[1],
          g = e,
          b = r;
        c(e) && ((g = v.numAsString), (b = !0));
        var y = f(g, b);
        return (
          (0, o.useMemo)(
            function () {
              m(y);
            },
            [y.formattedValue],
          ),
          [
            v,
            function (e, t) {
              e.formattedValue !== v.formattedValue &&
                m({ formattedValue: e.formattedValue, numAsString: e.value }),
                l(e, t);
            },
          ]
        );
      }
      function j(e) {
        return e.replace(/[^0-9]/g, "");
      }
      function C(e) {
        return e;
      }
      function N(e) {
        var t = e.type;
        void 0 === t && (t = "text");
        var r = e.displayType;
        void 0 === r && (r = "input");
        var a = e.customInput,
          l = e.renderText,
          c = e.getInputRef,
          d = e.format;
        void 0 === d && (d = C);
        var f = e.removeFormatting;
        void 0 === f && (f = j);
        var p = e.defaultValue,
          v = e.valueIsNumericString,
          m = e.onValueChange,
          h = e.isAllowed,
          g = e.onChange;
        void 0 === g && (g = u);
        var N = e.onKeyDown;
        void 0 === N && (N = u);
        var k = e.onMouseUp;
        void 0 === k && (k = u);
        var I = e.onFocus;
        void 0 === I && (I = u);
        var D = e.onBlur;
        void 0 === D && (D = u);
        var O = e.value,
          _ = e.getCaretBoundary;
        void 0 === _ && (_ = E);
        var T = e.isValidInputCharacter;
        void 0 === T && (T = s);
        var F = e.isCharacterSame,
          A = i(e, [
            "type",
            "displayType",
            "customInput",
            "renderText",
            "getInputRef",
            "format",
            "removeFormatting",
            "defaultValue",
            "valueIsNumericString",
            "onValueChange",
            "isAllowed",
            "onChange",
            "onKeyDown",
            "onMouseUp",
            "onFocus",
            "onBlur",
            "value",
            "getCaretBoundary",
            "isValidInputCharacter",
            "isCharacterSame",
          ]),
          M = V(O, p, !!v, d, f, m),
          R = M[0],
          L = R.formattedValue,
          P = R.numAsString,
          B = M[1],
          z = (0, o.useRef)({ formattedValue: L, numAsString: P }),
          W = function (e, t) {
            (z.current = {
              formattedValue: e.formattedValue,
              numAsString: e.value,
            }),
              B(e, t);
          },
          Z = (0, o.useState)(!1),
          G = Z[0],
          K = Z[1],
          U = (0, o.useRef)(null),
          $ = (0, o.useRef)({ setCaretTimeout: null, focusTimeout: null });
        (0, o.useEffect)(function () {
          return (
            K(!0),
            function () {
              clearTimeout($.current.setCaretTimeout),
                clearTimeout($.current.focusTimeout);
            }
          );
        }, []);
        var q = d,
          H = function (e, t) {
            var r = parseFloat(t);
            return {
              formattedValue: e,
              value: t,
              floatValue: isNaN(r) ? void 0 : r,
            };
          },
          X = function (e, t, r) {
            (0 !== e.selectionStart || e.selectionEnd !== e.value.length) &&
              (b(e, t),
              ($.current.setCaretTimeout = setTimeout(function () {
                e.value === r && e.selectionStart !== e.selectionEnd && b(e, t);
              }, 0)));
          },
          Y = function (e, t, r) {
            return x(e, t, _(e), r);
          },
          J = function (e, t, r) {
            var n = _(t),
              a = (function (e, t, r, n, a, o, l) {
                void 0 === l && (l = w);
                var i = a.findIndex(function (e) {
                    return e;
                  }),
                  u = e.slice(0, i);
                t || r.startsWith(u) || ((t = u), (r = u + r), (n += u.length));
                for (
                  var s = r.length, c = e.length, d = {}, f = Array(s), p = 0;
                  p < s;
                  p++
                ) {
                  f[p] = -1;
                  for (var v = 0; v < c; v++)
                    if (
                      l({
                        currentValue: r,
                        lastValue: t,
                        formattedValue: e,
                        currentValueIndex: p,
                        formattedValueIndex: v,
                      }) &&
                      !0 !== d[v]
                    ) {
                      (f[p] = v), (d[v] = !0);
                      break;
                    }
                }
                for (var m = n; m < s && (-1 === f[m] || !o(r[m])); ) m++;
                var h = m === s || -1 === f[m] ? c : f[m];
                for (m = n - 1; m > 0 && -1 === f[m]; ) m--;
                var g = -1 === m || -1 === f[m] ? 0 : f[m] + 1;
                return g > h ? h : n - g < h - n ? g : h;
              })(t, L, e, r, n, T, F);
            return x(t, a, n);
          },
          Q = function (e) {
            var t = e.formattedValue;
            void 0 === t && (t = "");
            var r = e.input,
              n = e.setCaretPosition;
            void 0 === n && (n = !0);
            var a = e.source,
              o = e.event,
              l = e.numAsString,
              i = e.caretPos;
            if (r) {
              if (void 0 === i && n) {
                var u = e.inputValue || r.value,
                  s = S(r);
                (r.value = t), (i = J(u, t, s));
              }
              (r.value = t), n && void 0 !== i && X(r, i, t);
            }
            t !== L && W(H(t, l), { event: o, source: a });
          };
        (0, o.useEffect)(
          function () {
            var e = z.current,
              t = e.formattedValue,
              r = e.numAsString;
            L !== t &&
              (L !== P || t !== r) &&
              W(H(L, P), { event: void 0, source: n.props });
          },
          [L, P],
        );
        var ee = U.current ? S(U.current) : void 0;
        ("undefined" != typeof window ? o.useLayoutEffect : o.useEffect)(
          function () {
            var e = U.current;
            if (L !== z.current.formattedValue && e) {
              var t = J(z.current.formattedValue, L, ee);
              (e.value = L), X(e, t, L);
            }
          },
          [L],
        );
        var et = function (e, t, r) {
            var n = Object.assign(Object.assign({}, y(L, e)), { lastValue: L }),
              a = f(e, n),
              o = q(a);
            if (((a = f(o, void 0)), h && !h(H(o, a)))) {
              var l = t.target,
                i = J(e, L, S(l));
              return (l.value = L), X(l, i, L), !1;
            }
            return (
              Q({
                formattedValue: o,
                numAsString: a,
                inputValue: e,
                event: t,
                source: r,
                setCaretPosition: !0,
                input: t.target,
              }),
              !0
            );
          },
          er = Object.assign(
            {
              inputMode:
                G &&
                "undefined" != typeof navigator &&
                !(navigator.platform && /iPhone|iPod/.test(navigator.platform))
                  ? "numeric"
                  : void 0,
            },
            A,
            {
              type: t,
              value: L,
              onChange: function (e) {
                et(e.target.value, e, n.event) && g(e);
              },
              onKeyDown: function (e) {
                var t,
                  r = e.target,
                  n = e.key,
                  a = r.selectionStart,
                  o = r.selectionEnd,
                  l = r.value;
                if (
                  (void 0 === l && (l = ""),
                  "ArrowLeft" === n || "Backspace" === n
                    ? (t = Math.max(a - 1, 0))
                    : "ArrowRight" === n
                      ? (t = Math.min(a + 1, l.length))
                      : "Delete" === n && (t = a),
                  void 0 === t || a !== o)
                ) {
                  N(e);
                  return;
                }
                var i = t;
                "ArrowLeft" === n || "ArrowRight" === n
                  ? (i = Y(l, t, "ArrowLeft" === n ? "left" : "right")) !== t &&
                    e.preventDefault()
                  : "Delete" !== n || T(l[t])
                    ? "Backspace" !== n || T(l[t]) || (i = Y(l, t, "left"))
                    : (i = Y(l, t, "right")),
                  i !== t && X(r, i, l),
                  e.isUnitTestRun && X(r, i, l),
                  N(e);
              },
              onMouseUp: function (e) {
                var t = e.target,
                  r = t.selectionStart,
                  n = t.selectionEnd,
                  a = t.value;
                if ((void 0 === a && (a = ""), r === n)) {
                  var o = Y(a, r);
                  o !== r && X(t, o, a);
                }
                k(e);
              },
              onFocus: function (e) {
                e.persist && e.persist();
                var t = e.target;
                (U.current = t),
                  ($.current.focusTimeout = setTimeout(function () {
                    var r = t.selectionStart,
                      n = t.selectionEnd,
                      a = t.value;
                    void 0 === a && (a = "");
                    var o = Y(a, r);
                    o === r || (0 === r && n === a.length) || X(t, o, a), I(e);
                  }, 0));
              },
              onBlur: function (e) {
                (U.current = null),
                  clearTimeout($.current.focusTimeout),
                  clearTimeout($.current.setCaretTimeout),
                  D(e);
              },
            },
          );
        return "text" === r
          ? l
            ? o.createElement(o.Fragment, null, l(L, A) || null)
            : o.createElement("span", Object.assign({}, A, { ref: c }), L)
          : a
            ? o.createElement(a, Object.assign({}, er, { ref: c }))
            : o.createElement("input", Object.assign({}, er, { ref: c }));
      }
      function k(e, t) {
        var r,
          n,
          a,
          o = t.decimalScale,
          l = t.fixedDecimalScale,
          i = t.prefix;
        void 0 === i && (i = "");
        var u = t.suffix;
        void 0 === u && (u = "");
        var s = t.allowNegative,
          c = t.thousandsGroupStyle;
        if ((void 0 === c && (c = "thousand"), "" === e || "-" === e)) return e;
        var d = I(t),
          f = d.thousandSeparator,
          m = d.decimalSeparator,
          h = (0 !== o && -1 !== e.indexOf(".")) || (o && l),
          g = p(e, s),
          b = g.beforeDecimal,
          y = g.afterDecimal,
          S = g.addNegation;
        return (
          void 0 !== o && (y = v(y, o, !!l)),
          f &&
            ((r = b),
            (n = (function (e) {
              switch (e) {
                case "lakh":
                  return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
                case "wan":
                  return /(\d)(?=(\d{4})+(?!\d))/g;
                default:
                  return /(\d)(?=(\d{3})+(?!\d))/g;
              }
            })(c)),
            (a = -1 === (a = r.search(/[1-9]/)) ? r.length : a),
            (b =
              r.substring(0, a) +
              r.substring(a, r.length).replace(n, "$1" + f))),
          i && (b = i + b),
          u && (y += u),
          S && (b = "-" + b),
          (e = b + ((h && m) || "") + y)
        );
      }
      function I(e) {
        var t = e.decimalSeparator;
        void 0 === t && (t = ".");
        var r = e.thousandSeparator,
          n = e.allowedDecimalSeparators;
        return (
          !0 === r && (r = ","),
          n || (n = [t, "."]),
          {
            decimalSeparator: t,
            thousandSeparator: r,
            allowedDecimalSeparators: n,
          }
        );
      }
      function D(e) {
        var t,
          r,
          a,
          l,
          v,
          m,
          S,
          w,
          x,
          E,
          j,
          C,
          D,
          O,
          _,
          T,
          F,
          A,
          M,
          R,
          L,
          P,
          B,
          z,
          W,
          Z,
          G,
          K,
          U,
          $ =
            ((t = (function (e) {
              var t = I(e),
                r = t.thousandSeparator,
                n = t.decimalSeparator,
                a = e.prefix;
              void 0 === a && (a = "");
              var o = e.allowNegative;
              if ((void 0 === o && (o = !0), r === n))
                throw Error(
                  "\n        Decimal separator can't be same as thousand separator.\n        thousandSeparator: " +
                    r +
                    ' (thousandSeparator = {true} is same as thousandSeparator = ",")\n        decimalSeparator: ' +
                    n +
                    " (default value for decimalSeparator is .)\n     ",
                );
              return (
                a.startsWith("-") &&
                  o &&
                  (console.error(
                    "\n      Prefix can't start with '-' when allowNegative is true.\n      prefix: " +
                      a +
                      "\n      allowNegative: " +
                      o +
                      "\n    ",
                  ),
                  (o = !1)),
                Object.assign(Object.assign({}, e), { allowNegative: o })
              );
            })((t = e))).decimalSeparator,
            t.allowedDecimalSeparators,
            t.thousandsGroupStyle,
            (r = t.suffix),
            (a = t.allowNegative),
            (l = t.allowLeadingZeros),
            void 0 === (v = t.onKeyDown) && (v = u),
            void 0 === (m = t.onBlur) && (m = u),
            (S = t.thousandSeparator),
            (w = t.decimalScale),
            (x = t.fixedDecimalScale),
            void 0 === (E = t.prefix) && (E = ""),
            (j = t.defaultValue),
            (C = t.value),
            (D = t.valueIsNumericString),
            (O = t.onValueChange),
            (_ = i(t, [
              "decimalSeparator",
              "allowedDecimalSeparators",
              "thousandsGroupStyle",
              "suffix",
              "allowNegative",
              "allowLeadingZeros",
              "onKeyDown",
              "onBlur",
              "thousandSeparator",
              "decimalScale",
              "fixedDecimalScale",
              "prefix",
              "defaultValue",
              "value",
              "valueIsNumericString",
              "onValueChange",
            ])),
            (F = (T = I(t)).decimalSeparator),
            (A = T.allowedDecimalSeparators),
            (M = function (e) {
              return k(e, t);
            }),
            (R = function (e, r) {
              return (function (e, t, r) {
                void 0 === t &&
                  (t = {
                    from: { start: 0, end: 0 },
                    to: { start: 0, end: e.length },
                    lastValue: "",
                  });
                var n,
                  a,
                  o,
                  l,
                  i = r.allowNegative,
                  u = r.prefix;
                void 0 === u && (u = "");
                var c = r.suffix;
                void 0 === c && (c = "");
                var d = r.decimalScale,
                  v = t.from,
                  m = t.to,
                  h = m.start,
                  g = m.end,
                  b = I(r),
                  y = b.allowedDecimalSeparators,
                  S = b.decimalSeparator,
                  w = e[g] === S;
                if (s(e) && (e === u || e === c) && "" === t.lastValue)
                  return e;
                if (g - h == 1 && -1 !== y.indexOf(e[h])) {
                  var x = 0 === d ? "" : S;
                  e = e.substring(0, h) + x + e.substring(h + 1, e.length);
                }
                var E = function (e, t, r) {
                    var n = !1,
                      a = !1;
                    u.startsWith("-")
                      ? (n = !1)
                      : e.startsWith("--")
                        ? ((n = !1), (a = !0))
                        : c.startsWith("-") && e.length === c.length
                          ? (n = !1)
                          : "-" === e[0] && (n = !0);
                    var o = n ? 1 : 0;
                    return (
                      a && (o = 2),
                      o && ((e = e.substring(o)), (t -= o), (r -= o)),
                      { value: e, start: t, end: r, hasNegation: n }
                    );
                  },
                  V = E(e, h, g),
                  j = V.hasNegation;
                (e = V.value), (h = V.start), (g = V.end);
                var C = E(t.lastValue, v.start, v.end),
                  N = C.start,
                  k = C.end,
                  D = C.value,
                  O = e.substring(h, g);
                e.length &&
                  D.length &&
                  (N > D.length - c.length || k < u.length) &&
                  !(O && c.startsWith(O)) &&
                  (e = D);
                var _ = 0;
                e.startsWith(u) ? (_ += u.length) : h < u.length && (_ = h),
                  (e = e.substring(_)),
                  (g -= _);
                var T = e.length,
                  F = e.length - c.length;
                e.endsWith(c)
                  ? (T = F)
                  : g > F
                    ? (T = g)
                    : g > e.length - c.length && (T = g),
                  (e = e.substring(0, T)),
                  void 0 === (n = j ? "-" + e : e) && (n = ""),
                  (a = RegExp("(-)(.)*(-)")),
                  (o = /(-)/.test(n)),
                  (l = a.test(n)),
                  (n = n.replace(/-/g, "")),
                  o && !l && i && (n = "-" + n);
                var A = (e = (
                    (e = n).match(RegExp("(^-)|[0-9]|" + f(S), "g")) || []
                  ).join("")).indexOf(S),
                  M = p(
                    (e = e.replace(RegExp(f(S), "g"), function (e, t) {
                      return t === A ? "." : "";
                    })),
                    i,
                  ),
                  R = M.beforeDecimal,
                  L = M.afterDecimal,
                  P = M.addNegation;
                return (
                  m.end - m.start < v.end - v.start &&
                    "" === R &&
                    w &&
                    !parseFloat(L) &&
                    (e = P ? "-" : ""),
                  e
                );
              })(e, r, t);
            }),
            (L = c(C) ? j : C),
            (B =
              null != D
                ? D
                : ((P = E),
                  "" === L ||
                    (!(null == P ? void 0 : P.match(/\d/)) &&
                      !(null == r ? void 0 : r.match(/\d/)) &&
                      "string" == typeof L &&
                      !isNaN(Number(L))))),
            c(C)
              ? c(j) || (B = B || "number" == typeof j)
              : (B = B || "number" == typeof C),
            (G = (Z = (W = V(
              (z = function (e) {
                return d(e)
                  ? e
                  : ("number" == typeof e && (e = h(e)),
                      B && "number" == typeof w)
                    ? g(e, w, !!x)
                    : e;
              })(C),
              z(j),
              !!B,
              M,
              R,
              O,
            ))[0]).numAsString),
            (K = Z.formattedValue),
            (U = W[1]),
            Object.assign(Object.assign({}, _), {
              value: K,
              valueIsNumericString: !1,
              isValidInputCharacter: function (e) {
                return e === F || s(e);
              },
              isCharacterSame: function (e) {
                var t = e.currentValue,
                  r = e.lastValue,
                  n = e.formattedValue,
                  a = e.currentValueIndex,
                  o = e.formattedValueIndex,
                  l = t[a],
                  i = n[o],
                  u = y(r, t).to;
                return (
                  (!!(a >= u.start && a < u.end && A && A.includes(l)) &&
                    i === F) ||
                  l === i
                );
              },
              onValueChange: U,
              format: M,
              removeFormatting: R,
              getCaretBoundary: function (e) {
                var r, n, a, o, l, i;
                return (
                  void 0 === (n = (r = t).prefix) && (n = ""),
                  void 0 === (a = r.suffix) && (a = ""),
                  (o = Array.from({ length: e.length + 1 }).map(function () {
                    return !0;
                  })),
                  (l = "-" === e[0]),
                  o.fill(!1, 0, n.length + (l ? 1 : 0)),
                  (i = e.length),
                  o.fill(!1, i - a.length + 1, i + 1),
                  o
                );
              },
              onKeyDown: function (e) {
                var t = e.target,
                  r = e.key,
                  n = t.selectionStart,
                  o = t.selectionEnd,
                  l = t.value;
                if ((void 0 === l && (l = ""), n !== o)) {
                  v(e);
                  return;
                }
                "Backspace" === r &&
                  "-" === l[0] &&
                  n === E.length + 1 &&
                  a &&
                  b(t, 1),
                  w &&
                    x &&
                    ("Backspace" === r && l[n - 1] === F
                      ? (b(t, n - 1), e.preventDefault())
                      : "Delete" === r && l[n] === F && e.preventDefault()),
                  (null == A ? void 0 : A.includes(r)) &&
                    l[n] === F &&
                    b(t, n + 1);
                var i = !0 === S ? "," : S;
                "Backspace" === r && l[n - 1] === i && b(t, n - 1),
                  "Delete" === r && l[n] === i && b(t, n + 1),
                  v(e);
              },
              onBlur: function (e) {
                var r = G;
                r.match(/\d/g) || (r = ""),
                  l ||
                    (r = (function (e) {
                      if (!e) return e;
                      var t = "-" === e[0];
                      t && (e = e.substring(1, e.length));
                      var r = e.split("."),
                        n = r[0].replace(/^0+/, "") || "0",
                        a = r[1] || "";
                      return (t ? "-" : "") + n + (a ? "." + a : "");
                    })(r)),
                  x && w && (r = g(r, w, x)),
                  r !== G &&
                    U(
                      {
                        formattedValue: k(r, t),
                        value: r,
                        floatValue: parseFloat(r),
                      },
                      { event: e, source: n.event },
                    ),
                  m(e);
              },
            }));
        return o.createElement(N, Object.assign({}, $));
      }
      function O(e, t, r) {
        return void 0 === t && void 0 === r
          ? e
          : void 0 !== t && void 0 === r
            ? Math.max(e, t)
            : void 0 === t && void 0 !== r
              ? Math.min(e, r)
              : Math.min(Math.max(e, t), r);
      }
      var _ = r(9373),
        T = r(4120),
        F = r(5593),
        A = r(5274),
        M = r(954),
        R = r(98),
        L = r(6348),
        P = r(591),
        B = r(3147),
        z = r(4269),
        W = r(712);
      function Z(e) {
        let { direction: t, style: r, ...n } = e;
        return (0, a.jsx)("svg", {
          style: {
            width: "var(--ni-chevron-size)",
            height: "var(--ni-chevron-size)",
            transform: "up" === t ? "rotate(180deg)" : void 0,
            ...r,
          },
          viewBox: "0 0 15 15",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          ...n,
          children: (0, a.jsx)("path", {
            d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
            fill: "currentColor",
            fillRule: "evenodd",
            clipRule: "evenodd",
          }),
        });
      }
      var G = {
        root: "m_e2f5cd4e",
        controls: "m_95e17d22",
        control: "m_80b4b171",
      };
      let K = /^(0\.0*|-0(\.0*)?)$/,
        U = /^-?0\d+(\.\d+)?\.?$/;
      function $(e, t, r) {
        return (
          void 0 === e || ((void 0 === t || e >= t) && (void 0 === r || e <= r))
        );
      }
      let q = {
          step: 1,
          clampBehavior: "blur",
          allowDecimal: !0,
          allowNegative: !0,
          withKeyboardEvents: !0,
          allowLeadingZeros: !0,
          trimLeadingZeroesOnBlur: !0,
          startValue: 0,
        },
        H = (0, F.Z)((e, t) => {
          let { size: r } = t;
          return {
            controls: { "--ni-chevron-size": (0, T.ap)(r, "ni-chevron-size") },
          };
        }),
        X = (0, B.d5)((e, t) => {
          let r = (0, P.w)("NumberInput", q, e),
            {
              className: n,
              classNames: i,
              styles: u,
              unstyled: s,
              vars: c,
              onChange: d,
              onValueChange: f,
              value: p,
              defaultValue: v,
              max: m,
              min: h,
              step: g,
              hideControls: b,
              rightSection: y,
              isAllowed: S,
              clampBehavior: w,
              onBlur: x,
              allowDecimal: E,
              decimalScale: V,
              onKeyDown: j,
              onKeyDownCapture: C,
              handlersRef: N,
              startValue: k,
              disabled: I,
              rightSectionPointerEvents: T,
              allowNegative: F,
              readOnly: B,
              size: X,
              rightSectionWidth: Y,
              stepHoldInterval: J,
              stepHoldDelay: Q,
              allowLeadingZeros: ee,
              withKeyboardEvents: et,
              trimLeadingZeroesOnBlur: er,
              ...en
            } = r,
            ea = (0, L.y)({
              name: "NumberInput",
              classes: G,
              props: r,
              classNames: i,
              styles: u,
              unstyled: s,
              vars: c,
              varsResolver: H,
            }),
            { resolvedClassNames: eo, resolvedStyles: el } = (function (e) {
              let { classNames: t, styles: r, props: n, stylesCtx: a } = e,
                o = (0, A.rZ)();
              return {
                resolvedClassNames: (0, M.m)({
                  theme: o,
                  classNames: t,
                  props: n,
                  stylesCtx: a || void 0,
                }),
                resolvedStyles: (0, R.i)({
                  theme: o,
                  styles: r,
                  props: n,
                  stylesCtx: a || void 0,
                }),
              };
            })({ classNames: i, styles: u, props: r }),
            [ei, eu] = (function (e) {
              let {
                  value: t,
                  defaultValue: r,
                  finalValue: n,
                  onChange: a = () => {},
                } = e,
                [l, i] = (0, o.useState)(void 0 !== r ? r : n);
              return void 0 !== t
                ? [t, a, !0]
                : [
                    l,
                    function (e) {
                      for (
                        var t = arguments.length,
                          r = Array(t > 1 ? t - 1 : 0),
                          n = 1;
                        n < t;
                        n++
                      )
                        r[n - 1] = arguments[n];
                      i(e), null == a || a(e, ...r);
                    },
                    !1,
                  ];
            })({ value: p, defaultValue: v, onChange: d }),
            es = void 0 !== Q && void 0 !== J,
            ec = (0, o.useRef)(null),
            ed = (0, o.useRef)(null),
            ef = (0, o.useRef)(0),
            ep = (e) => {
              let t = String(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
              return t
                ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0))
                : 0;
            },
            ev = (e) => {
              ec.current && void 0 !== e && ec.current.setSelectionRange(e, e);
            },
            em = (0, o.useRef)();
          em.current = () => {
            let e;
            let t = Math.max(ep(ei), ep(g)),
              r = 10 ** t;
            if ("number" != typeof ei || Number.isNaN(ei)) e = O(k, h, m);
            else if (void 0 !== m) {
              let t = (Math.round(ei * r) + Math.round(g * r)) / r;
              e = t <= m ? t : m;
            } else e = (Math.round(ei * r) + Math.round(g * r)) / r;
            let n = e.toFixed(t);
            eu(parseFloat(n)),
              null == f ||
                f(
                  { floatValue: parseFloat(n), formattedValue: n, value: n },
                  { source: "increment" },
                ),
              setTimeout(() => {
                var e;
                return ev(
                  null === (e = ec.current) || void 0 === e
                    ? void 0
                    : e.value.length,
                );
              }, 0);
          };
          let eh = (0, o.useRef)();
          (eh.current = () => {
            let e;
            let t = void 0 !== h ? h : F ? Number.MIN_SAFE_INTEGER : 0,
              r = Math.max(ep(ei), ep(g)),
              n = 10 ** r;
            if ("number" != typeof ei || Number.isNaN(ei)) e = O(k, t, m);
            else {
              let r = (Math.round(ei * n) - Math.round(g * n)) / n;
              e = void 0 !== t && r < t ? t : r;
            }
            let a = e.toFixed(r);
            eu(parseFloat(a)),
              null == f ||
                f(
                  { floatValue: parseFloat(a), formattedValue: a, value: a },
                  { source: "decrement" },
                ),
              setTimeout(() => {
                var e;
                return ev(
                  null === (e = ec.current) || void 0 === e
                    ? void 0
                    : e.value.length,
                );
              }, 0);
          }),
            (0, _.kR)(N, { increment: em.current, decrement: eh.current });
          let eg = (e) => {
              e ? em.current() : eh.current(), (ef.current += 1);
            },
            eb = (e) => {
              if ((eg(e), es)) {
                let t = "number" == typeof J ? J : J(ef.current);
                ed.current = window.setTimeout(() => eb(e), t);
              }
            },
            ey = (e, t) => {
              var r;
              e.preventDefault(),
                null === (r = ec.current) || void 0 === r || r.focus(),
                eg(t),
                es && (ed.current = window.setTimeout(() => eb(t), Q));
            },
            eS = () => {
              ed.current && window.clearTimeout(ed.current),
                (ed.current = null),
                (ef.current = 0);
            },
            ew = (0, a.jsxs)("div", {
              ...ea("controls"),
              children: [
                (0, a.jsx)(W.k, {
                  ...ea("control"),
                  tabIndex: -1,
                  "aria-hidden": !0,
                  disabled:
                    I || ("number" == typeof ei && void 0 !== m && ei >= m),
                  mod: { direction: "up" },
                  onMouseDown: (e) => e.preventDefault(),
                  onPointerDown: (e) => {
                    ey(e, !0);
                  },
                  onPointerUp: eS,
                  onPointerLeave: eS,
                  children: (0, a.jsx)(Z, { direction: "up" }),
                }),
                (0, a.jsx)(W.k, {
                  ...ea("control"),
                  tabIndex: -1,
                  "aria-hidden": !0,
                  disabled:
                    I || ("number" == typeof ei && void 0 !== h && ei <= h),
                  mod: { direction: "down" },
                  onMouseDown: (e) => e.preventDefault(),
                  onPointerDown: (e) => {
                    ey(e, !1);
                  },
                  onPointerUp: eS,
                  onPointerLeave: eS,
                  children: (0, a.jsx)(Z, { direction: "down" }),
                }),
              ],
            });
          return (0, a.jsx)(z.M, {
            component: D,
            allowNegative: F,
            className: (0, l.Z)(G.root, n),
            size: X,
            ...en,
            readOnly: B,
            disabled: I,
            value: ei,
            getInputRef: (0, _.Yx)(t, ec),
            onValueChange: (e, t) => {
              "event" === t.source &&
                eu(
                  !(function (e, t) {
                    return (
                      ("number" == typeof e
                        ? e < Number.MAX_SAFE_INTEGER
                        : !Number.isNaN(Number(e))) &&
                      !Number.isNaN(e) &&
                      14 > t.toString().replace(".", "").length &&
                      "" !== t
                    );
                  })(e.floatValue, e.value) ||
                    K.test(e.value) ||
                    (ee && U.test(e.value))
                    ? e.value
                    : e.floatValue,
                ),
                null == f || f(e, t);
            },
            rightSection: b || B ? y : y || ew,
            classNames: eo,
            styles: el,
            unstyled: s,
            __staticSelector: "NumberInput",
            decimalScale: E ? V : 0,
            onKeyDown: (e) => {
              null == j || j(e),
                !B &&
                  et &&
                  ("ArrowUp" === e.key && (e.preventDefault(), em.current()),
                  "ArrowDown" === e.key && (e.preventDefault(), eh.current()));
            },
            onKeyDownCapture: (e) => {
              if ((null == C || C(e), "Backspace" === e.key)) {
                let t = ec.current;
                0 === t.selectionStart &&
                  t.selectionStart === t.selectionEnd &&
                  (e.preventDefault(), window.setTimeout(() => ev(0), 0));
              }
            },
            rightSectionPointerEvents: null != T ? T : I ? "none" : void 0,
            rightSectionWidth:
              null != Y
                ? Y
                : "var(--ni-right-section-width-".concat(X || "sm", ")"),
            allowLeadingZeros: ee,
            onBlur: (e) => {
              if (
                (null == x || x(e),
                "blur" === w &&
                  "number" == typeof ei &&
                  O(ei, h, m) !== ei &&
                  eu(O(ei, h, m)),
                er && "string" == typeof ei && 15 > ep(ei))
              ) {
                let e = ei.replace(/^0+/, ""),
                  t = parseFloat(e);
                eu(Number.isNaN(t) || t > Number.MAX_SAFE_INTEGER ? e : t);
              }
            },
            isAllowed: (e) =>
              "strict" === w
                ? S
                  ? S(e) && $(e.floatValue, h, m)
                  : $(e.floatValue, h, m)
                : !S || S(e),
          });
        });
      (X.classes = { ...z.M.classes, ...G }),
        (X.displayName = "@mantine/core/NumberInput");
    },
    132: (e, t, r) => {
      r.d(t, { K: () => p });
      var n = r(7437);
      r(2265);
      var a = r(4120),
        o = r(5593),
        l = r(591),
        i = r(6348),
        u = r(8987),
        s = r(3147),
        c = { root: "m_6d731127" };
      let d = { gap: "md", align: "stretch", justify: "flex-start" },
        f = (0, o.Z)((e, t) => {
          let { gap: r, align: n, justify: o } = t;
          return {
            root: {
              "--stack-gap": (0, a.bG)(r),
              "--stack-align": n,
              "--stack-justify": o,
            },
          };
        }),
        p = (0, s.d5)((e, t) => {
          let r = (0, l.w)("Stack", d, e),
            {
              classNames: a,
              className: o,
              style: s,
              styles: p,
              unstyled: v,
              vars: m,
              align: h,
              justify: g,
              gap: b,
              variant: y,
              ...S
            } = r,
            w = (0, i.y)({
              name: "Stack",
              props: r,
              classes: c,
              className: o,
              style: s,
              classNames: a,
              styles: p,
              unstyled: v,
              vars: m,
              varsResolver: f,
            });
          return (0, n.jsx)(u.x, { ref: t, ...w("root"), variant: y, ...S });
        });
      (p.classes = c), (p.displayName = "@mantine/core/Stack");
    },
    6293: (e, t, r) => {
      r.d(t, { x: () => m });
      var n = r(7437);
      r(2265);
      var a = r(4120),
        o = r(5593),
        l = r(5027),
        i = r(2442),
        u = r(591),
        s = r(6348),
        c = r(8987),
        d = r(869),
        f = { root: "m_b6d8b162" };
      let p = { inherit: !1 },
        v = (0, o.Z)((e, t) => {
          let { variant: r, lineClamp: n, gradient: o, size: u, color: s } = t;
          return {
            root: {
              "--text-fz": (0, a.yv)(u),
              "--text-lh": (0, a.Dp)(u),
              "--text-gradient": "gradient" === r ? (0, i.u)(o, e) : void 0,
              "--text-line-clamp": "number" == typeof n ? n.toString() : void 0,
              "--text-color": s ? (0, l.p)(s, e) : void 0,
            },
          };
        }),
        m = (0, d.b)((e, t) => {
          let r = (0, u.w)("Text", p, e),
            {
              lineClamp: a,
              truncate: o,
              inline: l,
              inherit: i,
              gradient: d,
              span: m,
              __staticSelector: h,
              vars: g,
              className: b,
              style: y,
              classNames: S,
              styles: w,
              unstyled: x,
              variant: E,
              mod: V,
              size: j,
              ...C
            } = r,
            N = (0, s.y)({
              name: ["Text", h],
              props: r,
              classes: f,
              className: b,
              style: y,
              classNames: S,
              styles: w,
              unstyled: x,
              vars: g,
              varsResolver: v,
            });
          return (0, n.jsx)(c.x, {
            ...N("root", { focusable: !0 }),
            ref: t,
            component: m ? "span" : "p",
            variant: E,
            mod: [
              {
                "data-truncate": (function (e) {
                  return "start" === e
                    ? "start"
                    : "end" === e || e
                      ? "end"
                      : void 0;
                })(o),
                "data-line-clamp": "number" == typeof a,
                "data-inline": l,
                "data-inherit": i,
              },
              V,
            ],
            size: j,
            ...C,
          });
        });
      (m.classes = f), (m.displayName = "@mantine/core/Text");
    },
    7497: (e, t, r) => {
      r.d(t, { c: () => x });
      var n = r(2265);
      let a = "undefined" != typeof window ? n.useLayoutEffect : n.useEffect;
      function o(e, t) {
        a(() => {
          if (e)
            return (
              window.addEventListener(e, t),
              () => window.removeEventListener(e, t)
            );
        }, [e]);
      }
      function l(e) {
        return null === e || "object" != typeof e
          ? {}
          : Object.keys(e).reduce((t, r) => {
              let n = e[r];
              return null != n && !1 !== n && (t[r] = n), t;
            }, {});
      }
      function i(e, t) {
        if (null === t || "object" != typeof t) return {};
        let r = { ...t };
        return (
          Object.keys(t).forEach((t) => {
            t.includes("".concat(String(e), ".")) && delete r[t];
          }),
          r
        );
      }
      function u(e, t) {
        return parseInt(e.substring(t.length + 1).split(".")[0], 10);
      }
      function s(e, t, r, n) {
        if (void 0 === t) return r;
        let a = "".concat(String(e)),
          o = r;
        -1 === n && (o = i("".concat(a, ".").concat(t), o));
        let l = { ...o },
          s = new Set();
        return (
          Object.entries(o)
            .filter((e) => {
              let [r] = e;
              if (!r.startsWith("".concat(a, "."))) return !1;
              let n = u(r, a);
              return !Number.isNaN(n) && n >= t;
            })
            .forEach((e) => {
              let [t, r] = e,
                o = u(t, a),
                i = t.replace(
                  "".concat(a, ".").concat(o),
                  "".concat(a, ".").concat(o + n),
                );
              (l[i] = r), s.add(i), s.has(t) || delete l[t];
            }),
          l
        );
      }
      function c(e) {
        return "string" != typeof e ? [] : e.split(".");
      }
      function d(e, t) {
        let r = c(e);
        if (0 === r.length || "object" != typeof t || null === t) return;
        let n = t[r[0]];
        for (let e = 1; e < r.length && null != n; e += 1) n = n[r[e]];
        return n;
      }
      function f(e, t, r) {
        "object" == typeof r.value && (r.value = p(r.value)),
          r.enumerable &&
          !r.get &&
          !r.set &&
          r.configurable &&
          r.writable &&
          "__proto__" !== t
            ? (e[t] = r.value)
            : Object.defineProperty(e, t, r);
      }
      function p(e) {
        if ("object" != typeof e) return e;
        var t,
          r,
          n,
          a = 0,
          o = Object.prototype.toString.call(e);
        if (
          ("[object Object]" === o
            ? (n = Object.create(e.__proto__ || null))
            : "[object Array]" === o
              ? (n = Array(e.length))
              : "[object Set]" === o
                ? ((n = new Set()),
                  e.forEach(function (e) {
                    n.add(p(e));
                  }))
                : "[object Map]" === o
                  ? ((n = new Map()),
                    e.forEach(function (e, t) {
                      n.set(p(t), p(e));
                    }))
                  : "[object Date]" === o
                    ? (n = new Date(+e))
                    : "[object RegExp]" === o
                      ? (n = new RegExp(e.source, e.flags))
                      : "[object DataView]" === o
                        ? (n = new e.constructor(p(e.buffer)))
                        : "[object ArrayBuffer]" === o
                          ? (n = e.slice(0))
                          : "Array]" === o.slice(-6) &&
                            (n = new e.constructor(e)),
          n)
        ) {
          for (r = Object.getOwnPropertySymbols(e); a < r.length; a++)
            f(n, r[a], Object.getOwnPropertyDescriptor(e, r[a]));
          for (a = 0, r = Object.getOwnPropertyNames(e); a < r.length; a++)
            (Object.hasOwnProperty.call(n, (t = r[a])) && n[t] === e[t]) ||
              f(n, t, Object.getOwnPropertyDescriptor(e, t));
        }
        return n || e;
      }
      function v(e, t, r) {
        let n = c(e);
        if (0 === n.length) return r;
        let a = p(r);
        if (1 === n.length) return (a[n[0]] = t), a;
        let o = a[n[0]];
        for (let e = 1; e < n.length - 1; e += 1) {
          if (void 0 === o) return a;
          o = o[n[e]];
        }
        return (o[n[n.length - 1]] = t), a;
      }
      var m = r(9731);
      function h(e, t) {
        let r = Object.keys(e);
        if ("string" == typeof t) {
          let n = r.filter((e) => e.startsWith("".concat(t, ".")));
          return e[t] || n.some((t) => e[t]) || !1;
        }
        return r.some((t) => e[t]);
      }
      function g(e, t) {
        return e ? "".concat(e, "-").concat(t.toString()) : t.toString();
      }
      function b(e) {
        let t = l(e);
        return { hasErrors: Object.keys(t).length > 0, errors: t };
      }
      function y(e, t) {
        return "function" == typeof e
          ? b(e(t))
          : b(
              (function e(t, r) {
                let n =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : "",
                  a =
                    arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : {};
                return "object" != typeof t || null === t
                  ? a
                  : Object.keys(t).reduce((a, o) => {
                      let l = t[o],
                        i = ""
                          .concat("" === n ? "" : "".concat(n, "."))
                          .concat(o),
                        u = d(i, r),
                        s = !1;
                      return (
                        "function" == typeof l && (a[i] = l(u, r, i)),
                        "object" == typeof l &&
                          Array.isArray(u) &&
                          ((s = !0),
                          u.forEach((t, n) =>
                            e(l, r, "".concat(i, ".").concat(n), a),
                          )),
                        "object" != typeof l ||
                          "object" != typeof u ||
                          null === u ||
                          s ||
                          e(l, r, i, a),
                        a
                      );
                    }, a);
              })(e, t),
            );
      }
      function S(e, t, r) {
        if ("string" != typeof e) return { hasError: !1, error: null };
        let n = y(t, r),
          a = Object.keys(n.errors).find((t) =>
            e.split(".").every((e, r) => e === t.split(".")[r]),
          );
        return { hasError: !!a, error: a ? n.errors[a] : null };
      }
      function w(e, t) {
        return (
          !!t &&
          ("boolean" == typeof t
            ? t
            : !!Array.isArray(t) &&
              t.includes(
                e.replace(/[.][0-9]+/g, ".".concat("__MANTINE_FORM_INDEX__")),
              ))
        );
      }
      function x() {
        let {
            name: e,
            mode: t = "controlled",
            initialValues: r,
            initialErrors: a = {},
            initialDirty: u = {},
            initialTouched: c = {},
            clearInputErrorOnChange: f = !0,
            validateInputOnChange: p = !1,
            validateInputOnBlur: b = !1,
            onValuesChange: x,
            transformValues: E = (e) => e,
            enhanceGetInputProps: V,
            validate: j,
          } = arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {},
          C = (function (e) {
            let [t, r] = (0, n.useState)(l(e)),
              a = (0, n.useRef)(t),
              o = (0, n.useCallback)((e) => {
                r((t) => {
                  let r = l("function" == typeof e ? e(t) : e);
                  return (a.current = r), r;
                });
              }, []),
              i = (0, n.useCallback)(() => o({}), []),
              u = (0, n.useCallback)(
                (e) => {
                  void 0 !== a.current[e] &&
                    o((t) => {
                      let r = { ...t };
                      return delete r[e], r;
                    });
                },
                [t],
              ),
              s = (0, n.useCallback)(
                (e, t) => {
                  null == t || !1 === t
                    ? u(e)
                    : a.current[e] !== t && o((r) => ({ ...r, [e]: t }));
                },
                [t],
              );
            return {
              errorsState: t,
              setErrors: o,
              clearErrors: i,
              setFieldError: s,
              clearFieldError: u,
            };
          })(a),
          N = (function (e) {
            let { initialValues: t, onValuesChange: r, mode: a } = e,
              o = (0, n.useRef)(!1),
              [l, i] = (0, n.useState)(t || {}),
              u = (0, n.useRef)(l),
              s = (0, n.useRef)(l),
              c = (0, n.useCallback)(
                (e) => {
                  let {
                      values: t,
                      subscribers: n,
                      updateState: a = !0,
                      mergeWithPreviousValues: o = !0,
                    } = e,
                    l = u.current,
                    s = t instanceof Function ? t(u.current) : t,
                    c = o ? { ...l, ...s } : s;
                  (u.current = c),
                    a && i(c),
                    null == r || r(c, l),
                    null == n ||
                      n
                        .filter(Boolean)
                        .forEach((e) =>
                          e({ updatedValues: c, previousValues: l }),
                        );
                },
                [r],
              ),
              f = (0, n.useCallback)(
                (e) => {
                  let t = d(e.path, u.current),
                    r = e.value instanceof Function ? e.value(t) : e.value;
                  if (t !== r) {
                    var n;
                    let t = u.current,
                      a = v(e.path, r, u.current);
                    c({ values: a, updateState: e.updateState }),
                      null === (n = e.subscribers) ||
                        void 0 === n ||
                        n
                          .filter(Boolean)
                          .forEach((r) =>
                            r({
                              path: e.path,
                              updatedValues: a,
                              previousValues: t,
                            }),
                          );
                  }
                },
                [c],
              ),
              p = (0, n.useCallback)((e) => {
                s.current = e;
              }, []),
              m = (0, n.useCallback)(
                (e, t) => {
                  o.current ||
                    ((o.current = !0),
                    c({ values: e, updateState: "controlled" === a }),
                    p(e),
                    t());
                },
                [c],
              ),
              h = (0, n.useCallback)(() => {
                c({
                  values: s.current,
                  updateState: !0,
                  mergeWithPreviousValues: !1,
                });
              }, [c]),
              g = (0, n.useCallback)(() => u.current, []),
              b = (0, n.useCallback)(() => s.current, []);
            return {
              initialized: o,
              stateValues: l,
              refValues: u,
              valuesSnapshot: s,
              setValues: c,
              setFieldValue: f,
              resetValues: h,
              setValuesSnapshot: p,
              initialize: m,
              getValues: g,
              getValuesSnapshot: b,
            };
          })({ initialValues: r, onValuesChange: x, mode: t }),
          k = (function (e) {
            let { initialDirty: t, initialTouched: r, mode: a, $values: o } = e,
              [l, u] = (0, n.useState)(r),
              [s, c] = (0, n.useState)(t),
              f = (0, n.useRef)(r),
              p = (0, n.useRef)(t),
              v = (0, n.useCallback)((e) => {
                let t = "function" == typeof e ? e(f.current) : e;
                (f.current = t), "controlled" === a && u(t);
              }, []),
              g = (0, n.useCallback)(function (e) {
                let t =
                    arguments.length > 1 &&
                    void 0 !== arguments[1] &&
                    arguments[1],
                  r = "function" == typeof e ? e(p.current) : e;
                (p.current = r), ("controlled" === a || t) && c(r);
              }, []),
              b = (0, n.useCallback)(() => v({}), []),
              y = (0, n.useCallback)((e, t) => {
                v((r) => (h(r, e) === t ? r : { ...r, [e]: t }));
              }, []),
              S = (0, n.useCallback)((e, t, r) => {
                g((r) => (h(r, e) === t ? r : { ...r, [e]: t }), r);
              }, []),
              w = (0, n.useCallback)((e, t) => {
                let r = h(p.current, e),
                  n = !m(d(e, o.getValuesSnapshot()), t),
                  a = i(e, p.current);
                (a[e] = n), g(a, r !== n);
              }, []),
              x = (0, n.useCallback)((e) => h(f.current, e), []),
              E = (0, n.useCallback)(
                (e) =>
                  g((t) => {
                    if ("string" != typeof e) return t;
                    let r = i(e, t);
                    return (delete r[e], m(r, t)) ? t : r;
                  }),
                [],
              ),
              V = (0, n.useCallback)((e) => {
                if (e) {
                  let t = d(e, p.current);
                  return "boolean" == typeof t
                    ? t
                    : !m(
                        d(e, o.refValues.current),
                        d(e, o.valuesSnapshot.current),
                      );
                }
                return Object.keys(p.current).length > 0
                  ? h(p.current)
                  : !m(o.refValues.current, o.valuesSnapshot.current);
              }, []),
              j = (0, n.useCallback)(() => p.current, []),
              C = (0, n.useCallback)(() => f.current, []);
            return {
              touchedState: l,
              dirtyState: s,
              touchedRef: f,
              dirtyRef: p,
              setTouched: v,
              setDirty: g,
              resetDirty: (e) => {
                let t = e
                  ? { ...e, ...o.refValues.current }
                  : o.refValues.current;
                o.setValuesSnapshot(t), g({});
              },
              resetTouched: b,
              isTouched: x,
              setFieldTouched: y,
              setFieldDirty: S,
              setTouchedState: u,
              setDirtyState: c,
              clearFieldDirty: E,
              isDirty: V,
              getDirty: j,
              getTouched: C,
              setCalculatedFieldDirty: w,
            };
          })({ initialDirty: u, initialTouched: c, $values: N, mode: t }),
          I = (function (e) {
            let { $values: t, $errors: r, $status: a } = e;
            return {
              reorderListItem: (0, n.useCallback)((e, n) => {
                a.clearFieldDirty(e),
                  r.setErrors((t) =>
                    (function (e, t, r) {
                      let { from: n, to: a } = t,
                        o = "".concat(e, ".").concat(n),
                        l = "".concat(e, ".").concat(a),
                        i = { ...r };
                      return (
                        Object.keys(r).every((e) => {
                          let t, r;
                          if (
                            (e.startsWith(o) &&
                              ((t = e), (r = e.replace(o, l))),
                            e.startsWith(l) && ((t = e.replace(l, o)), (r = e)),
                            t && r)
                          ) {
                            let e = i[t],
                              n = i[r];
                            return (
                              void 0 === n ? delete i[t] : (i[t] = n),
                              void 0 === e ? delete i[r] : (i[r] = e),
                              !1
                            );
                          }
                          return !0;
                        }),
                        i
                      );
                    })(e, n, t),
                  ),
                  t.setValues({
                    values: (function (e, t, r) {
                      let { from: n, to: a } = t,
                        o = d(e, r);
                      if (!Array.isArray(o)) return r;
                      let l = [...o],
                        i = o[n];
                      return l.splice(n, 1), l.splice(a, 0, i), v(e, l, r);
                    })(e, n, t.refValues.current),
                    updateState: !0,
                  });
              }, []),
              removeListItem: (0, n.useCallback)((e, n) => {
                a.clearFieldDirty(e),
                  r.setErrors((t) => s(e, n, t, -1)),
                  t.setValues({
                    values: (function (e, t, r) {
                      let n = d(e, r);
                      return Array.isArray(n)
                        ? v(
                            e,
                            n.filter((e, r) => r !== t),
                            r,
                          )
                        : r;
                    })(e, n, t.refValues.current),
                    updateState: !0,
                  });
              }, []),
              insertListItem: (0, n.useCallback)((e, n, o) => {
                a.clearFieldDirty(e),
                  r.setErrors((t) => s(e, o, t, 1)),
                  t.setValues({
                    values: (function (e, t, r, n) {
                      let a = d(e, n);
                      if (!Array.isArray(a)) return n;
                      let o = [...a];
                      return (
                        o.splice("number" == typeof r ? r : o.length, 0, t),
                        v(e, o, n)
                      );
                    })(e, n, o, t.refValues.current),
                    updateState: !0,
                  });
              }, []),
            };
          })({ $values: N, $errors: C, $status: k }),
          D = (function (e) {
            let { $status: t } = e,
              r = (0, n.useRef)({}),
              a = (0, n.useCallback)((e, t) => {
                (0, n.useEffect)(
                  () => (
                    (r.current[e] = r.current[e] || []),
                    r.current[e].push(t),
                    () => {
                      r.current[e] = r.current[e].filter((e) => e !== t);
                    }
                  ),
                  [t],
                );
              }, []),
              o = (0, n.useCallback)(
                (e) =>
                  r.current[e]
                    ? r.current[e].map(
                        (r) => (n) =>
                          r({
                            previousValue: d(e, n.previousValues),
                            value: d(e, n.updatedValues),
                            touched: t.isTouched(e),
                            dirty: t.isDirty(e),
                          }),
                      )
                    : [],
                [],
              );
            return { subscribers: r, watch: a, getFieldSubscribers: o };
          })({ $status: k }),
          [O, _] = (0, n.useState)(0),
          [T, F] = (0, n.useState)({}),
          A = (0, n.useCallback)(() => {
            N.resetValues(),
              C.clearErrors(),
              k.resetDirty(),
              k.resetTouched(),
              "uncontrolled" === t && _((e) => e + 1);
          }, []),
          M = (0, n.useCallback)(
            (e) => {
              f && C.clearErrors(),
                "uncontrolled" === t && _((e) => e + 1),
                Object.keys(D.subscribers.current).forEach((t) => {
                  d(t, N.refValues.current) !== d(t, e) &&
                    D.getFieldSubscribers(t).forEach((t) =>
                      t({
                        previousValues: e,
                        updatedValues: N.refValues.current,
                      }),
                    );
                });
            },
            [f],
          ),
          R = (0, n.useCallback)(
            (e) => {
              let r = N.refValues.current;
              N.initialize(e, () => "uncontrolled" === t && _((e) => e + 1)),
                M(r);
            },
            [M],
          ),
          L = (0, n.useCallback)(
            (e, r, n) => {
              let a = w(e, p),
                o = r instanceof Function ? r(d(e, N.refValues.current)) : r;
              k.setCalculatedFieldDirty(e, o),
                k.setFieldTouched(e, !0),
                !a && f && C.clearFieldError(e),
                N.setFieldValue({
                  path: e,
                  value: r,
                  updateState: "controlled" === t,
                  subscribers: [
                    ...D.getFieldSubscribers(e),
                    a
                      ? (t) => {
                          let r = S(e, j, t.updatedValues);
                          r.hasError
                            ? C.setFieldError(e, r.error)
                            : C.clearFieldError(e);
                        }
                      : null,
                    (null == n ? void 0 : n.forceUpdate) !== !1 &&
                    "controlled" !== t
                      ? () => F((t) => ({ ...t, [e]: (t[e] || 0) + 1 }))
                      : null,
                  ],
                });
            },
            [x, j],
          ),
          P = (0, n.useCallback)(
            (e) => {
              let r = N.refValues.current;
              N.setValues({ values: e, updateState: "controlled" === t }), M(r);
            },
            [x, M],
          ),
          B = (0, n.useCallback)(() => {
            let e = y(j, N.refValues.current);
            return C.setErrors(e.errors), e;
          }, [j]),
          z = (0, n.useCallback)(
            (e) => {
              let t = S(e, j, N.refValues.current);
              return (
                t.hasError ? C.setFieldError(e, t.error) : C.clearFieldError(e),
                t
              );
            },
            [j],
          ),
          W = (0, n.useCallback)((e) => {
            e.preventDefault(), A();
          }, []),
          Z = (0, n.useCallback)(
            (e) =>
              e
                ? !S(e, j, N.refValues.current).hasError
                : !y(j, N.refValues.current).hasErrors,
            [j],
          ),
          G = (0, n.useCallback)(
            (t) => document.querySelector('[data-path="'.concat(g(e, t), '"]')),
            [],
          ),
          K = {
            watch: D.watch,
            initialized: N.initialized.current,
            values: N.stateValues,
            getValues: N.getValues,
            setInitialValues: N.setValuesSnapshot,
            initialize: R,
            setValues: P,
            setFieldValue: L,
            errors: C.errorsState,
            setErrors: C.setErrors,
            setFieldError: C.setFieldError,
            clearFieldError: C.clearFieldError,
            clearErrors: C.clearErrors,
            resetDirty: k.resetDirty,
            setTouched: k.setTouched,
            setDirty: k.setDirty,
            isTouched: k.isTouched,
            resetTouched: k.resetTouched,
            isDirty: k.isDirty,
            getTouched: k.getTouched,
            getDirty: k.getDirty,
            reorderListItem: I.reorderListItem,
            insertListItem: I.insertListItem,
            removeListItem: I.removeListItem,
            reset: A,
            validate: B,
            validateField: z,
            getInputProps: function (r) {
              var n;
              let {
                  type: a = "input",
                  withError: o = !0,
                  withFocus: l = !0,
                  ...i
                } = arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
                u = {
                  onChange:
                    ((n = (e) => L(r, e, { forceUpdate: !1 })),
                    (e) => {
                      if (e) {
                        if ("function" == typeof e) n(e);
                        else if ("object" == typeof e && "nativeEvent" in e) {
                          let { currentTarget: t } = e;
                          t instanceof HTMLInputElement
                            ? "checkbox" === t.type
                              ? n(t.checked)
                              : n(t.value)
                            : (t instanceof HTMLTextAreaElement ||
                                t instanceof HTMLSelectElement) &&
                              n(t.value);
                        } else n(e);
                      } else n(e);
                    }),
                  "data-path": g(e, r),
                };
              return (
                o && (u.error = C.errorsState[r]),
                "checkbox" === a
                  ? (u["controlled" === t ? "checked" : "defaultChecked"] = d(
                      r,
                      N.refValues.current,
                    ))
                  : (u["controlled" === t ? "value" : "defaultValue"] = d(
                      r,
                      N.refValues.current,
                    )),
                l &&
                  ((u.onFocus = () => k.setFieldTouched(r, !0)),
                  (u.onBlur = () => {
                    if (w(r, b)) {
                      let e = S(r, j, N.refValues.current);
                      e.hasError
                        ? C.setFieldError(r, e.error)
                        : C.clearFieldError(r);
                    }
                  })),
                Object.assign(
                  u,
                  null == V
                    ? void 0
                    : V({
                        inputProps: u,
                        field: r,
                        options: { type: a, withError: o, withFocus: l, ...i },
                        form: K,
                      }),
                )
              );
            },
            onSubmit: (e, t) => (r) => {
              null == r || r.preventDefault();
              let n = B();
              n.hasErrors
                ? null == t || t(n.errors, N.refValues.current, r)
                : null == e || e(E(N.refValues.current), r);
            },
            onReset: W,
            isValid: Z,
            getTransformedValues: (e) => E(e || N.refValues.current),
            key: (e) =>
              ""
                .concat(O, "-")
                .concat(e, "-")
                .concat(T[e] || 0),
            getInputNode: G,
          };
        return (
          e &&
            (function (e) {
              if (!/^[0-9a-zA-Z-]+$/.test(e))
                throw Error(
                  '[@mantine/use-form] Form name "'.concat(
                    e,
                    '" is invalid, it should contain only letters, numbers and dashes',
                  ),
                );
            })(e),
          o("mantine-form:".concat(e, ":set-field-value"), (e) =>
            K.setFieldValue(e.detail.path, e.detail.value),
          ),
          o("mantine-form:".concat(e, ":set-values"), (e) =>
            K.setValues(e.detail),
          ),
          o("mantine-form:".concat(e, ":set-initial-values"), (e) =>
            K.setInitialValues(e.detail),
          ),
          o("mantine-form:".concat(e, ":set-errors"), (e) =>
            K.setErrors(e.detail),
          ),
          o("mantine-form:".concat(e, ":set-field-error"), (e) =>
            K.setFieldError(e.detail.path, e.detail.error),
          ),
          o("mantine-form:".concat(e, ":clear-field-error"), (e) =>
            K.clearFieldError(e.detail),
          ),
          o("mantine-form:".concat(e, ":clear-errors"), K.clearErrors),
          o("mantine-form:".concat(e, ":reset"), K.reset),
          o("mantine-form:".concat(e, ":validate"), K.validate),
          o("mantine-form:".concat(e, ":validate-field"), (e) =>
            K.validateField(e.detail),
          ),
          o("mantine-form:".concat(e, ":reorder-list-item"), (e) =>
            K.reorderListItem(e.detail.path, e.detail.payload),
          ),
          o("mantine-form:".concat(e, ":remove-list-item"), (e) =>
            K.removeListItem(e.detail.path, e.detail.index),
          ),
          o("mantine-form:".concat(e, ":insert-list-item"), (e) =>
            K.insertListItem(e.detail.path, e.detail.item, e.detail.index),
          ),
          o("mantine-form:".concat(e, ":set-dirty"), (e) =>
            K.setDirty(e.detail),
          ),
          o("mantine-form:".concat(e, ":set-touched"), (e) =>
            K.setTouched(e.detail),
          ),
          o("mantine-form:".concat(e, ":reset-dirty"), (e) =>
            K.resetDirty(e.detail),
          ),
          o("mantine-form:".concat(e, ":reset-touched"), K.resetTouched),
          K
        );
      }
    },
  },
]);
