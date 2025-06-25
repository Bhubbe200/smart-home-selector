import { useState } from "react";

// Tooltip for jargon/acronyms (hover/tap/focus)
function Tooltip({ text, children }) {
  return (
    <span className="relative group cursor-help inline-block focus-within:outline-none">
      <span tabIndex={0} className="underline decoration-dotted decoration-yellow-300 outline-none">
        {children}
      </span>
      <span className="pointer-events-none invisible group-hover:visible group-focus-within:visible opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition bg-gray-900 text-xs text-yellow-100 rounded p-2 absolute z-10 left-1/2 -translate-x-1/2 top-full mt-2 min-w-max shadow-xl border border-yellow-400">
        {text}
      </span>
    </span>
  );
}

// Device card: modern, compact, gold accent
function DeviceCard({ option, isSelected, onSelect }) {
  return (
    <div
      className={`rounded-xl shadow transition-all p-3 bg-gray-800/95 border
        ${isSelected ? "border-yellow-400 ring-2 ring-yellow-300 shadow-yellow-200/40 scale-105" : "border-gray-700 hover:border-yellow-300 hover:shadow-yellow-200/30"}
        cursor-pointer flex flex-col w-full max-w-xs mx-auto min-h-[230px] font-sans`}
      onClick={onSelect}
      tabIndex={0}
      aria-pressed={isSelected}
      style={{fontFamily: "Montserrat, ui-sans-serif, system-ui"}}
    >
      <img
        src={option.image}
        alt={`${option.brand} ${option.model}`}
        className="rounded-lg w-full h-20 object-cover mb-2 shadow-sm"
      />
      <div className="flex items-center gap-2 mb-1">
        <h4 className="text-base font-bold">{option.brand}</h4>
        <span className="bg-yellow-800 text-yellow-100 px-2 py-0.5 rounded text-xs">{option.model}</span>
      </div>
      <div className="text-yellow-200 font-semibold mb-1 text-base">${option.price.toLocaleString()}</div>
      <div className="text-gray-100 text-xs mb-1 leading-tight">{option.description}</div>
      <div className="text-xs text-gray-400 italic mb-1">{option.reasoning}</div>
      <button
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        className={`mt-auto px-3 py-1 rounded-md font-bold shadow transition
          ${isSelected ? "bg-yellow-400 text-yellow-900" : "bg-yellow-800 hover:bg-yellow-400 hover:text-yellow-900 text-white"} text-xs`}
      >
        {isSelected ? "Selected" : "Select"}
      </button>
    </div>
  );
}

// AV options data, using /public/images paths
const AV_DEVICE_OPTIONS = {
  preamp: [
    {
      id: "marantz7706",
      brand: "Marantz",
      model: "AV7706",
      image: "/images/av7706.jpg",
      price: 2300,
      description: (
        <>
          Pro-grade processor with <Tooltip text="11 main speaker outputs, plus two for subwoofers">11.2 channels</Tooltip>, support for <Tooltip text="Ultra HD video, 4x the detail of 1080p">8K HDMI</Tooltip>, and renowned Marantz sound. Best value for big homes when paired with dedicated amps.
        </>
      ),
      reasoning: "Integrates well with pro amps, great value for large custom installs.",
      rackmount: true,
    },
    {
      id: "denonx6700h",
      brand: "Denon",
      model: "AVR-X6700H",
      image: "/images/denonx6700h.png",
      price: 3000,
      description: (
        <>
          Feature-rich receiver, drives up to 13 speakers, great for theaters/main zones. Advanced <Tooltip text="Automatic speaker calibration system to tune sound for your room">room correction (Audyssey XT32)</Tooltip>, full 8K HDMI.
        </>
      ),
      reasoning: "Great value for theater, powers some zones itself, expands easily.",
      rackmount: true,
    }
  ],
  amp: [
    {
      id: "monoprice16ch",
      brand: "Monoprice",
      model: "16-Channel Amplifier",
      image: "/images/monoprice16ch.jpg",
      price: 1300,
      description: (
        <>
          Affordable, reliable, <Tooltip text="Can be installed in a standard AV rack for neat wiring and cooling">rack-mountable</Tooltip> amp. Drives 16 pairs (32 channels) of speakers. Stack as needed for your system.
        </>
      ),
      reasoning: "Industry value leader for large distributed audio. Scalable.",
      rackmount: true,
      max_pairs: 16,
    },
    {
      id: "audiocontrol2660",
      brand: "AudioControl",
      model: "Architect Model 2660",
      image: "/images/audiocontrol2660.jpg",
      price: 2800,
      description: (
        <>
          Audiophile amp, 16 channels, smart load balancing, <Tooltip text="Advanced monitoring and adjustments to optimize sound in each room">room-by-room DSP</Tooltip>.
        </>
      ),
      reasoning: "More expensive, but highest fidelity. For critical rooms.",
      rackmount: true,
      max_pairs: 8,
    },
    // --- SONOS OPTION ---
    {
      id: "sonosamp",
      brand: "Sonos",
      model: "Amp",
      image: "/images/sonosamp.jpg",
      price: 699,
      description: (
        <>
          <Tooltip text="Each Sonos Amp powers a pair of speakers (stereo)">Wireless streaming amp</Tooltip> with built-in music, voice assistant, and app control. Each unit powers one zone (2 speakers).
        </>
      ),
      reasoning: "Gold standard for easy, app-driven, multiroom audio. More lifestyle, less 'pro rack,' but clients love it.",
      rackmount: false,
      max_pairs: 1,
    }
  ],
  matrix: [
    {
      id: "atlona16x16",
      brand: "Atlona",
      model: "AT-UHD-PRO3-16M",
      image: "/images/atlona16x16.jpg",
      price: 4000,
      description: (
        <>
          Cost-effective <Tooltip text="Switches multiple HDMI sources to multiple TVs, letting you watch any source on any screen.">16x16 HDMI matrix switch</Tooltip> for routing all your video. Works with all control systems.
        </>
      ),
      reasoning: "Feature-packed for the price, easy to expand.",
      rackmount: true,
      max_tvs: 16,
    },
    {
      id: "wyrestorm16x16",
      brand: "Wyrestorm",
      model: "MXV-1616-H2A",
      image: "/images/wyrestorm16x16.jpg",
      price: 8000,
      description: (
        <>
          Top build quality, full <Tooltip text="High Dynamic Range—richer colors and contrast">HDR</Tooltip> support, robust IR/RS232 control for integration.
        </>
      ),
      reasoning: "Worth it for robust control and best-in-class video quality.",
      rackmount: true,
      max_tvs: 16,
    }
  ]
};

const NAV_PAGES = [
  { id: "av", label: "A/V System Builder" },
  { id: "lighting", label: "LED Lighting" },
  { id: "networking", label: "Networking" },
  { id: "racks", label: "Equipment Racks" },
  { id: "security", label: "Security Sensors" },
  { id: "cameras", label: "POE Cameras" },
  { id: "touchscreens", label: "In-Wall Touchscreens" },
  { id: "summary", label: "Summary" },
];

function App() {
  const [page, setPage] = useState("av");
  const [selectedPreamp, setSelectedPreamp] = useState(null);
  const [selectedAmp, setSelectedAmp] = useState(null);
  const [selectedMatrix, setSelectedMatrix] = useState(null);

  // For nav flow
  const navOrder = NAV_PAGES.map((p) => p.id);
  const pageIdx = navOrder.indexOf(page);

  // Helper for summary: get selected option from section
  function getOption(section, id) {
    return AV_DEVICE_OPTIONS[section]?.find((o) => o.id === id) || null;
  }

  // System total price calculation (preamp + amps needed + matrix)
  let systemTotal = 0;
  const preamp = getOption("preamp", selectedPreamp);
  const amp = getOption("amp", selectedAmp);
  const matrix = getOption("matrix", selectedMatrix);
  let numAmps = amp ? Math.ceil(54 / amp.max_pairs) : 0;
  if (preamp) systemTotal += preamp.price;
  if (amp) systemTotal += amp.price * numAmps;
  if (matrix) systemTotal += matrix.price;

  // Navigation helpers
  function goNext() {
    if (pageIdx < navOrder.length - 1) setPage(navOrder[pageIdx + 1]);
  }
  function goBack() {
    if (pageIdx > 0) setPage(navOrder[pageIdx - 1]);
  }

  // Helper to generate summary for email
  function generateSummaryText() {
    const parts = [];
    if (preamp) parts.push(`Preamp: ${preamp.brand} ${preamp.model} ($${preamp.price})`);
    if (amp) parts.push(`Amp: ${amp.brand} ${amp.model} x${numAmps} ($${amp.price} each, $${amp.price * numAmps} total)`);
    if (matrix) parts.push(`Matrix: ${matrix.brand} ${matrix.model} ($${matrix.price})`);
    parts.push(`System Total: $${systemTotal.toLocaleString()}`);
    return parts.join('\n');
  }

  // Create mailto link for Send to Technician
  function getMailtoLink() {
    const subject = encodeURIComponent("Smart Home Selector - My System Selections");
    const body = encodeURIComponent(generateSummaryText());
    return `mailto:bruce.hubbell@live.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans pb-20" style={{fontFamily: "Montserrat, ui-sans-serif, system-ui"}}>
      {/* Header */}
      <header className="relative p-3 mb-2 rounded-b-2xl overflow-hidden shadow-lg"
        style={{
          background: "linear-gradient(120deg, #1a2733 0%, #252a36 100%)",
          borderBottom: "3px solid #ffe599"
        }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_60%_0,_#ffe599_15%,_transparent_55%)]"></div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{letterSpacing: ".01em"}}>
          Clayton Estate Smart Home Selector
        </h1>
        <p className="text-yellow-100 mt-1 text-sm italic font-serif">
          Experience the future of home living. Select with confidence.
        </p>
      </header>

      {/* Top Nav bar */}
      <nav className="flex flex-wrap gap-1 px-2 pb-2 border-b border-yellow-400/50">
        {NAV_PAGES.map((p) => (
          <button
            key={p.id}
            onClick={() => setPage(p.id)}
            className={`px-2 py-1 rounded-full text-xs font-semibold transition 
              ${page === p.id
                ? "bg-yellow-400 text-yellow-900 shadow"
                : "bg-gray-800 hover:bg-yellow-300 hover:text-yellow-900 text-yellow-100"
              }`}
          >
            {p.label}
          </button>
        ))}
      </nav>

      <main className="p-2">
        {page === "av" && (
          <div>
            <h2 className="text-xl font-bold mb-1">A/V System Builder</h2>
            <p className="text-yellow-200 mb-2 text-sm">
              Select one <b>Preamp/Processor/Receiver</b>, one <b>Amplifier</b> (multiply as needed), and a <b>HDMI Matrix Switch</b>.
              <br />
              <span className="underline decoration-dotted decoration-yellow-300">Underlined terms</span> can be tapped for explanations.
            </p>

            {/* Preamp Section */}
            <h3 className="text-base font-semibold mb-1 mt-2 text-yellow-200">Preamp / Processor / Receiver</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              {AV_DEVICE_OPTIONS.preamp.map(option => (
                <DeviceCard
                  key={option.id}
                  option={option}
                  isSelected={selectedPreamp === option.id}
                  onSelect={() => setSelectedPreamp(selectedPreamp === option.id ? null : option.id)}
                />
              ))}
            </div>

            {/* Amp Section */}
            <h3 className="text-base font-semibold mb-1 mt-2 text-yellow-200">Amplifiers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-1">
              {AV_DEVICE_OPTIONS.amp.map(option => (
                <DeviceCard
                  key={option.id}
                  option={option}
                  isSelected={selectedAmp === option.id}
                  onSelect={() => setSelectedAmp(selectedAmp === option.id ? null : option.id)}
                />
              ))}
            </div>
            {/* Amp system sizing feedback */}
            {selectedAmp && (
              <div className="mb-2 text-yellow-200 text-sm">
                {(() => {
                  const amp = AV_DEVICE_OPTIONS.amp.find(o => o.id === selectedAmp);
                  if (!amp) return null;
                  const numRequired = Math.ceil(54 / amp.max_pairs);
                  const totalCost = amp.price * numRequired;
                  return (
                    <>
                      You will need <b>{numRequired}</b> of these amplifiers to power 54 speaker pairs.<br />
                      <span className="text-xs text-yellow-100">
                        Estimated total: <b>${totalCost.toLocaleString()}</b>
                        {amp.id === "sonosamp" && (
                          <> — Sonos units required: <b>{numRequired}</b> (one per zone). Note: Sonos is amazing for music, but can't switch video!</>
                        )}
                      </span>
                    </>
                  );
                })()}
              </div>
            )}

            {/* Matrix Section */}
            <h3 className="text-base font-semibold mb-1 mt-2 text-yellow-200">HDMI Matrix Switch</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-1">
              {AV_DEVICE_OPTIONS.matrix.map(option => (
                <DeviceCard
                  key={option.id}
                  option={option}
                  isSelected={selectedMatrix === option.id}
                  onSelect={() => setSelectedMatrix(selectedMatrix === option.id ? null : option.id)}
                />
              ))}
            </div>
            {/* Matrix warning */}
            {selectedMatrix && (
              <div className="mb-2 text-yellow-200 text-sm">
                {(() => {
                  const matrix = AV_DEVICE_OPTIONS.matrix.find(o => o.id === selectedMatrix);
                  if (!matrix) return null;
                  if (matrix.max_tvs < 16) {
                    return <>Warning: This matrix does not support all 16 TVs.</>;
                  }
                  return <>This matrix will support all 16 TVs.</>;
                })()}
              </div>
            )}
          </div>
        )}

        {/* SUMMARY PAGE */}
        {page === "summary" && (
          <div className="max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-2 text-yellow-300">Your Selections</h2>
            <div className="space-y-3">
              {/* Preamp */}
              <div className="bg-gray-800/90 rounded-xl p-3 shadow border border-yellow-800/60">
                <h3 className="text-base font-semibold mb-1 text-yellow-200">Preamp/Processor/Receiver</h3>
                {preamp ? (
                  <div className="flex gap-3 items-center">
                    <img src={preamp.image} alt={preamp.model} className="w-16 h-10 rounded shadow" />
                    <div>
                      <div className="font-bold text-yellow-100">{preamp.brand} {preamp.model}</div>
                      <div className="text-yellow-200 text-xs">${preamp.price.toLocaleString()}</div>
                    </div>
                  </div>
                ) : <div className="text-yellow-100/70 text-xs">No preamp selected.</div>}
              </div>
              {/* Amp */}
              <div className="bg-gray-800/90 rounded-xl p-3 shadow border border-yellow-800/60">
                <h3 className="text-base font-semibold mb-1 text-yellow-200">Amplifier(s)</h3>
                {amp ? (
                  <div>
                    <div className="flex gap-3 items-center">
                      <img src={amp.image} alt={amp.model} className="w-16 h-10 rounded shadow" />
                      <div>
                        <div className="font-bold text-yellow-100">{amp.brand} {amp.model}</div>
                        <div className="text-yellow-200 text-xs">${amp.price.toLocaleString()} x {numAmps} units</div>
                        <div className="text-yellow-200 text-xs mt-0.5">Total: <b>${(amp.price * numAmps).toLocaleString()}</b></div>
                      </div>
                    </div>
                    {amp.id === "sonosamp" && (
                      <div className="text-xs text-yellow-100 mt-1">Note: <b>{numAmps}</b> Sonos Amps needed (1 per pair/zone).</div>
                    )}
                  </div>
                ) : <div className="text-yellow-100/70 text-xs">No amplifier selected.</div>}
              </div>
              {/* Matrix */}
              <div className="bg-gray-800/90 rounded-xl p-3 shadow border border-yellow-800/60">
                <h3 className="text-base font-semibold mb-1 text-yellow-200">HDMI Matrix Switch</h3>
                {matrix ? (
                  <div className="flex gap-3 items-center">
                    <img src={matrix.image} alt={matrix.model} className="w-16 h-10 rounded shadow" />
                    <div>
                      <div className="font-bold text-yellow-100">{matrix.brand} {matrix.model}</div>
                      <div className="text-yellow-200 text-xs">${matrix.price.toLocaleString()}</div>
                    </div>
                  </div>
                ) : <div className="text-yellow-100/70 text-xs">No matrix selected.</div>}
              </div>
            </div>
            {/* System Total */}
            <div className="text-right mt-4">
              <div className="inline-block bg-yellow-300/90 rounded-lg px-4 py-2 text-lg font-bold text-gray-900 shadow">
                System Total: ${systemTotal.toLocaleString()}
              </div>
            </div>
            <div className="mt-3 text-yellow-200 text-xs text-center">
              <b>Next:</b> Tap “Send to Technician” below to email your selections.<br/>
              (Or use the Back button to adjust your choices.)
            </div>
          </div>
        )}

        {/* The rest: simple placeholders for now */}
        {page === "lighting" && <div><h2 className="text-base">LED Lighting Page (Coming Soon)</h2></div>}
        {page === "networking" && <div><h2 className="text-base">Networking Page (Coming Soon)</h2></div>}
        {page === "racks" && <div><h2 className="text-base">Equipment Racks Page (Coming Soon)</h2></div>}
        {page === "security" && <div><h2 className="text-base">Security Sensors Page (Coming Soon)</h2></div>}
        {page === "cameras" && <div><h2 className="text-base">POE Cameras Page (Coming Soon)</h2></div>}
        {page === "touchscreens" && <div><h2 className="text-base">In-Wall Touchscreens Page (Coming Soon)</h2></div>}
      </main>

      {/* BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-gray-950/95 border-t border-yellow-300 flex justify-between items-center px-4 py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.15)] font-semibold"
        style={{fontFamily: "Montserrat, ui-sans-serif, system-ui"}}>
        {pageIdx > 0 ? (
          <button
            className="px-4 py-2 rounded-full bg-yellow-400 text-yellow-900 shadow hover:bg-yellow-300 transition"
            onClick={goBack}
          >
            Back
          </button>
        ) : <div className="w-20" />} {/* Placeholder to balance flex */}
        
        {page !== "summary" ? (
          <button
            className="px-4 py-2 rounded-full bg-yellow-400 text-yellow-900 shadow hover:bg-yellow-300 transition"
            onClick={goNext}
          >
            Next
          </button>
        ) : (
          <a
            href={getMailtoLink()}
            className="px-4 py-2 rounded-full bg-green-400 text-green-900 shadow hover:bg-green-300 transition font-semibold"
            style={{ textDecoration: "none" }}
          >
            Send to Technician
          </a>
        )}
      </nav>
    </div>
  );
}

export default App;
