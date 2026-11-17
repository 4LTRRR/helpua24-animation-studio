import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

type NarrationCue = {
  start: number;
  end: number;
  text: string;
};

const cues: NarrationCue[] = [
  {
    start: 90,
    end: 300,
    text: "Три дні тому він подав рапорт: лікарі наполягали на стаціонарному обстеженні.",
  },
  {
    start: 300,
    end: 480,
    text: "У відповідь почув лише одне: «Чекай. Зараз не до цього».",
  },
  {
    start: 480,
    end: 660,
    text: "Він чекав. Біль посилювався. А рапорт так і не повернувся з резолюцією.",
  },
  {
    start: 660,
    end: 840,
    text: "На третій день йому сказали, що такого документа взагалі не надходило.",
  },
  {
    start: 840,
    end: 990,
    text: "Але в нього залишилася копія. І на ній був вхідний номер.",
  },
  {
    start: 990,
    end: 1200,
    text: "Він надіслав фото адвокату. Той одразу попросив не видаляти жодного повідомлення.",
  },
  {
    start: 1200,
    end: 1410,
    text: "Дата була. Підпис був. Та підтвердження, куди саме передали рапорт, не було.",
  },
  {
    start: 1410,
    end: 1620,
    text: "Адвокат почав перевіряти шлях документа. І знайшов дивну невідповідність.",
  },
  {
    start: 1620,
    end: 1800,
    text: "У журналі за цим номером значилося зовсім інше звернення.",
  },
  {
    start: 1800,
    end: 2010,
    text: "Два різні рапорти. Один номер. Одна дата. Такого збігу не мало бути.",
  },
  {
    start: 2010,
    end: 2220,
    text: "Військовий зрозумів: хтось дуже хотів, щоб його звернення зникло без сліду.",
  },
  {
    start: 2220,
    end: 2400,
    text: "І саме тоді на телефон прийшло повідомлення з невідомого номера.",
  },
  {
    start: 2400,
    end: 2580,
    text: "«Забери рапорт. Інакше матимеш проблеми».",
  },
  {
    start: 2580,
    end: 2760,
    text: "Він перечитав ці слова тричі. А потім зателефонував адвокату.",
  },
  {
    start: 2760,
    end: 2970,
    text: "Адвокат знову збільшив фото. Тепер його увагу привернула печатка.",
  },
  {
    start: 2970,
    end: 3180,
    text: "Вона виглядала справжньою. Але належала зовсім іншому підрозділу.",
  },
  {
    start: 3180,
    end: 3390,
    text: "Це вже не було схоже на звичайну помилку в документах.",
  },
  {
    start: 3390,
    end: 3540,
    text: "Адвокат зрозумів: хтось не просто загубив рапорт. Хтось залишив підказку.",
  },
  {
    start: 3540,
    end: 3600,
    text: "І тоді задзвонив телефон. На екрані — номер військової частини.",
  },
];

export const EpisodeNarration: React.FC = () => {
  const frame = useCurrentFrame();
  const cue = cues.find((item) => frame >= item.start && frame < item.end);

  const opacity = cue
    ? interpolate(
        frame,
        [cue.start, cue.start + 12, cue.end - 12, cue.end],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      )
    : 0;

  const notificationProgress = interpolate(
    frame,
    [2220, 2240, 2560, 2580],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const callProgress = interpolate(
    frame,
    [3450, 3470, 3590, 3600],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 30 }}>
      {/* Постійна назва епізоду */}
      <div
        style={{
          position: "absolute",
          top: 86,
          left: 68,
          padding: "12px 18px",
          backgroundColor: "rgba(8, 13, 18, 0.58)",
          borderLeft: "4px solid #b78b55",
          color: "rgba(255,255,255,0.82)",
          fontFamily: "Arial, sans-serif",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 3,
        }}
      >
        HELPUA24  /  СПРАВА № 01
      </div>

      {/* Закадровий текст */}
      {cue && (
        <div
          style={{
            position: "absolute",
            left: "6%",
            right: "6%",
            bottom: 175,
            padding: "30px 34px",
            background:
              "linear-gradient(110deg, rgba(7, 12, 17, 0.94), rgba(17, 24, 31, 0.84))",
            borderLeft: "6px solid #b78b55",
            borderRadius: 8,
            boxShadow: "0 16px 50px rgba(0,0,0,0.32)",
            opacity,
            transform: `translateY(${interpolate(opacity, [0, 1], [18, 0])}px)`,
          }}
        >
          <div
            style={{
              marginBottom: 12,
              color: "#c9a575",
              fontFamily: "Arial, sans-serif",
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: 3,
            }}
          >
            РАПОРТ, ЯКОГО НІХТО НЕ БАЧИТЬ
          </div>
          <div
            style={{
              color: "#ffffff",
              fontFamily: "Arial, sans-serif",
              fontSize: 39,
              lineHeight: 1.24,
              fontWeight: 600,
              textShadow: "0 2px 8px rgba(0,0,0,0.45)",
            }}
          >
            {cue.text}
          </div>
        </div>
      )}

      {/* Повідомлення з невідомого номера */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: "9%",
          right: "9%",
          padding: "25px 30px",
          borderRadius: 20,
          backgroundColor: "rgba(20, 25, 31, 0.96)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 18px 55px rgba(0,0,0,0.45)",
          opacity: notificationProgress,
          transform: `translateY(${interpolate(notificationProgress, [0, 1], [-24, 0])}px)`,
        }}
      >
        <div
          style={{
            color: "#d4b17f",
            fontFamily: "Arial, sans-serif",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          ПОВІДОМЛЕННЯ  ·  НЕВІДОМИЙ НОМЕР
        </div>
        <div
          style={{
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            fontSize: 34,
            lineHeight: 1.25,
            fontWeight: 600,
          }}
        >
          «Забери рапорт. Інакше матимеш проблеми».
        </div>
      </div>

      {/* Фінальний вхідний дзвінок */}
      <div
        style={{
          position: "absolute",
          top: "34%",
          left: "12%",
          right: "12%",
          padding: "34px 30px 38px",
          borderRadius: 24,
          backgroundColor: "rgba(12, 17, 23, 0.97)",
          border: "1px solid rgba(255,255,255,0.16)",
          boxShadow: "0 22px 70px rgba(0,0,0,0.55)",
          textAlign: "center",
          opacity: callProgress,
          transform: `scale(${interpolate(callProgress, [0, 1], [0.96, 1])})`,
        }}
      >
        <div
          style={{
            color: "#b9c2ca",
            fontFamily: "Arial, sans-serif",
            fontSize: 21,
            letterSpacing: 3,
            marginBottom: 20,
          }}
        >
          ВХІДНИЙ ДЗВІНОК
        </div>
        <div
          style={{
            width: 92,
            height: 92,
            margin: "0 auto 22px",
            borderRadius: "50%",
            backgroundColor: "#8f3034",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Arial, sans-serif",
            fontSize: 42,
            fontWeight: 700,
          }}
        >
          !
        </div>
        <div
          style={{
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            fontSize: 37,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          ВІЙСЬКОВА ЧАСТИНА
        </div>
        <div
          style={{
            color: "#c9a575",
            fontFamily: "Arial, sans-serif",
            fontSize: 20,
            marginTop: 14,
            letterSpacing: 2,
          }}
        >
          НЕВІДОМО, ХТО НА ІНШОМУ КІНЦІ
        </div>
      </div>
    </AbsoluteFill>
  );
};
