import React, { useState } from "react";

// Tooltip helper (same as App.jsx)
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

// Buy Now button: matches AV page style
function BuyNowButton({ url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-3 py-1 rounded-lg bg-yellow-400 text-yellow-900 font-bold text-xs shadow border border-yellow-900 hover:bg-yellow-300 hover:scale-105 active:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
      onClick={e => e.stopPropagation()}
      style={{ minWidth: "80px", textAlign: "center" }}
    >
      Buy Now
    </a>
  );
}

// Device Card for Lighting options
function LightingOptionCard({ option, isSelected, onSelect }) {
  return (
    <div
      className={`rounded-xl shadow transition-all p-3 bg-gray-800/95 border
        ${isSelected ? "border-yellow-400 ring-2 ring-yellow-300 shadow-yellow-200/40 scale-105" : "border-gray-700 hover:border-yellow-300 hover:shadow-yellow-200/30"}
        cursor-pointer flex flex-col w-full max-w-xs mx-auto min-h-[250px] font-sans`}
      onClick={onSelect}
      tabIndex={0}
      aria-pressed={isSelected}
      style={{ fontFamily: "Montserrat, ui-sans-serif, system-ui" }}
    >
      <img
        src={option.image}
        alt={option.name}
        className="rounded-lg w-full h-20 object-cover mb-2 shadow-sm"
      />
      <div className="flex items-center gap-2 mb-1">
        <h4 className="text-base font-bold">{option.name}</h4>
        <span className="bg-yellow-800 text-yellow-100 px-2 py-0.5 rounded text-xs">{option.type}</span>
      </div>
      <div className="text-yellow-200 font-semibold mb-1 text-base">${option.price.toLocaleString()}</div>
      <div className="text-gray-100 text-xs mb-1 leading-tight">{option.description}</div>
      <div className="text-xs text-gray-400 italic mb-1">{option.reasoning}</div>
      <div className="flex gap-2 mt-2 mb-1">
        {option.buyLink && <BuyNowButton url={option.buyLink} />}
        <button
          onClick={e => { e.stopPropagation(); onSelect(); }}
          className={`px-3 py-1 rounded-md font-bold shadow transition text-xs
            ${isSelected ? "bg-yellow-400 text-yellow-900" : "bg-yellow-800 hover:bg-yellow-400 hover:text-yellow-900 text-white"}`}
        >
          {isSelected ? "Selected" : "Select"}
        </button>
      </div>
    </div>
  );
}

// Example lighting options (update links/images as needed!)
const LIGHTING_OPTIONS = [
  {
    id: "rgbww",
    name: "RGB+WW Strip",
    type: "LED Strip",
    image: "https://www.flexfireleds.com/content/images/thumbs/0002896_rgbww-5050-led-strip-light-16ft-ultra-bright.png",
    price: 139,
    buyLink: "https://www.flexfireleds.com/high-cri-rgbww-led-strip-light-ultra-bright-series/",
    description: (
      <>
        Full color-changing plus warm white. Great for accent or cove. <Tooltip text="Color Rendering Index — higher means colors look more natural.">High CRI</Tooltip> for true-to-life lighting.
      </>
    ),
    reasoning: "Most flexible for mood and color effects. Delivers high-end look for any space.",
  },
  {
    id: "cob24v",
    name: "COB Strip 24V",
    type: "COB LED",
    image: "https://www.flexfireleds.com/content/images/thumbs/0002793_ultra-bright-cob-led-strip-light.png",
    price: 99,
    buyLink: "https://www.flexfireleds.com/ultra-bright-cob-led-strip-light-24v/",
    description: (
      <>
        <Tooltip text="Chip-on-Board: continuous line of light, zero visible dots.">COB</Tooltip> for ultimate diffusion. 24V for longer runs with less voltage drop.
      </>
    ),
    reasoning: "Perfect for indirect lighting in crown molding or under cabinets. No hotspots.",
  },
  {
    id: "strip12v",
    name: "Standard White Strip 12V",
    type: "LED Strip",
    image: "https://www.flexfireleds.com/content/images/thumbs/0002652_ultra-bright-high-cri-white-led-strip-light.png",
    price: 59,
    buyLink: "https://www.flexfireleds.com/ultra-bright-high-cri-white-led-strip-light/",
    description: (
      <>
        Simple, high-output white. 12V for small spaces, up to 16 ft per run.
      </>
    ),
    reasoning: "Budget-friendly for closets, toe kicks, or shelving.",
  },
  {
    id: "aluminumtrack",
    name: "Aluminum Diffuser Track",
    type: "Mounting",
    image: "https://www.flexfireleds.com/content/images/thumbs/0002339_surface-mount-aluminum-led-strip-light-channel.jpeg",
    price: 29,
    buyLink: "https://www.flexfireleds.com/surface-mount-aluminum-led-strip-light-channel/",
    description: (
      <>
        Sleek <Tooltip text="Track with frosted cover to diffuse and protect LEDs.">surface or recessed</Tooltip> track. Improves looks, durability, and smooths out hotspots.
      </>
    ),
    reasoning: "Essential for a finished, architectural install.",
  },
  {
    id: "crownmolding",
    name: "Crown Molding",
    type: "Mounting",
    image: "https://www.americanwoodmoulding.com/wp-content/uploads/2015/04/crown-molding-led-strip-lighting.jpg",
    price: 55,
    buyLink: "https://www.americanwoodmoulding.com/products/crown-moulding/",
    description: (
      <>
        Traditional or modern styles. Run LED strip behind for floating glow. Works in any room.
      </>
    ),
    reasoning: "Classic high-end look. Blends lighting into the architecture.",
  },
  {
    id: "meanwell24v",
    name: "MeanWell 24V Driver",
    type: "Driver",
    image: "https://www.meanwell-web.com/content/images/thumbs/0000950_hlg-240h-24a.jpg",
    price: 65,
    buyLink: "https://www.meanwell-web.com/en-gb/ac-dc-enclosed-power-supply-output-hlg--240h--24a",
    description: (
      <>
        Industry-trusted 24V <Tooltip text="Regulates power for consistent, safe LED performance.">driver</Tooltip>. Efficient, reliable, safe for long runs.
      </>
    ),
    reasoning: "Pro installers trust MeanWell for zero headaches.",
  },
];

// Example controller (add more if you like!)
const CONTROLLERS = [
  {
    id: "lutroncaseta",
    name: "Lutron Caséta Wireless",
    image: "https://www.lutron.com/en-US/PublishingImages/casetawireless/caseta_remote_fan_dimmer.jpg",
    price: 60,
    buyLink: "https://www.casetawireless.com/us/en",
    description: (
      <>
        Wall dimmer, app, and voice control. Integrates with Alexa, Apple HomeKit, Google Assistant.
      </>
    ),
    reasoning: "Reliable, simple, and pro-level flexibility.",
  },
  {
    id: "dmxcontroller",
    name: "DMX Touch Panel",
    image: "https://www.godaklighting.com/images/201905/goods_img/221_G_1556957804713.jpg",
    price: 150,
    buyLink: "https://www.godaklighting.com/wall-dmx-controller-touch-panel-221.html",
    description: (
      <>
        Scene control, color changing, and smooth dimming from a wall panel. Used in custom homes and restaurants.
      </>
    ),
    reasoning: "Ultimate control for color, brightness, and scenes.",
  }
];

// Lighting page main component
export default function LightingPage() {
  // One selection per category
  const [selectedStrip, setSelectedStrip] = useState(null);
  const [selectedMount, setSelectedMount] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedController, setSelectedController] = useState(null);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Info/education area */}
      <div className="mb-4 bg-gray-800/80 rounded-xl shadow p-4 border border-yellow-300/40">
        <h2 className="text-lg font-bold mb-2 text-yellow-200">Why LED Strip Lighting?</h2>
        <ul className="list-disc list-inside text-sm text-yellow-100 space-y-1">
          <li>
            <Tooltip text="Color Rendering Index: a higher CRI means skin tones and decor look beautiful, not sickly.">High CRI</Tooltip> strips make your space, art, and even your food look their best.
          </li>
          <li>
            <Tooltip text="LED density: more LEDs per meter equals smoother, more uniform light.">Higher density</Tooltip> strips minimize "hot spots" and create premium, even illumination—especially when paired with a good <Tooltip text="Diffuser track: frosted cover that blends individual dots into a seamless line of light.">diffuser</Tooltip>.
          </li>
          <li>
            Voltage matters: <Tooltip text="24V can power longer runs (up to 32 feet or more) without losing brightness.">24V</Tooltip> for large rooms, <Tooltip text="12V is for smaller projects (shorter runs, less power).">12V</Tooltip> for under-cabinet or accent use.
          </li>
          <li>
            Mounting makes the difference: crown molding and diffuser tracks create high-end, seamless installs.
          </li>
          <li>
            Pro controls: choose from simple dimmers to advanced touch panels with scene and color control.
          </li>
        </ul>
      </div>

      {/* LED Strips */}
      <h3 className="text-base font-semibold mb-1 mt-2 text-yellow-200">LED Strip Options</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
        {LIGHTING_OPTIONS.filter(o => o.type === "LED Strip" || o.type === "COB LED").map(option => (
          <LightingOptionCard
            key={option.id}
            option={option}
            isSelected={selectedStrip === option.id}
            onSelect={() => setSelectedStrip(selectedStrip === option.id ? null : option.id)}
          />
        ))}
      </div>

      {/* Mounting */}
      <h3 className="text-base font-semibold mb-1 mt-2 text-yellow-200">Mounting Options</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
        {LIGHTING_OPTIONS.filter(o => o.type === "Mounting").map(option => (
          <LightingOptionCard
            key={option.id}
            option={option}
            isSelected={selectedMount === option.id}
            onSelect={() => setSelectedMount(selectedMount === option.id ? null : option.id)}
          />
        ))}
      </div>

      {/* Drivers */}
      <h3 className="text-base font-semibold mb-1 mt-2 text-yellow-200">Power Drivers</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
        {LIGHTING_OPTIONS.filter(o => o.type === "Driver").map(option => (
          <LightingOptionCard
            key={option.id}
            option={option}
            isSelected={selectedDriver === option.id}
            onSelect={() => setSelectedDriver(selectedDriver === option.id ? null : option.id)}
          />
        ))}
      </div>

      {/* Controllers */}
      <h3 className="text-base font-semibold mb-1 mt-2 text-yellow-200">Control Options</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
        {CONTROLLERS.map(option => (
          <LightingOptionCard
            key={option.id}
            option={option}
            isSelected={selectedController === option.id}
            onSelect={() => setSelectedController(selectedController === option.id ? null : option.id)}
          />
        ))}
      </div>
    </div>
  );
}
