import React from 'react';
import {
  History,
  MapPin,
  Landmark,
  GraduationCap,
  HeartPulse,
  Building2,
  ShoppingBag,
  Award,
  Users,
  Compass,
  CheckCircle,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const timelineEvents = [
    {
      year: 'Early 20th Century',
      title: 'Settlement & Foundation of Unguwar Kanawa',
      description:
        'Established by traditional artisans, traders, and agricultural settlers drawn by the fertile Kaduna plains and commercial railway transit links.',
    },
    {
      year: '1960s',
      title: 'Formalization of Ward Administrative Sectors',
      description:
        'Sub-demarcation of the community into organized residential wards (Shanu, Masallaci, Kasuwa, Sarki) under recognized traditional ward heads (Wakilai).',
    },
    {
      year: '1976',
      title: 'Establishment of LEA Primary School Unguwar Kanawa',
      description:
        'Opening of the community pioneer primary education institution by the Kaduna local education authority, providing foundational literacy.',
    },
    {
      year: '1998',
      title: 'Reconstruction of Central Juma\'at Mosque',
      description:
        'Massive communal fundraising effort leading to the modern expansion of the Unguwar Kanawa Central Juma\'at Mosque and Islamic education library.',
    },
    {
      year: '2015',
      title: 'Inauguration of Community Development Committee (CDC)',
      description:
        'Formation of the CDC to spearhead self-help public works, environmental desiltation, street grading, and borehole water installations.',
    },
    {
      year: '2026',
      title: 'Launch of Unguwar Kanawa Official Digital Platform',
      description:
        'Adoption of the official digital palace and community management portal to modernize communication, preserve heritage, and boost civic transparency.',
    },
  ];

  const landmarks = [
    {
      name: 'Unguwar Kanawa Community Palace Grounds',
      category: 'Traditional & Administrative',
      desc: 'Seat of the Traditional Ruler and the council chambers where community arbitrations and official assemblies occur.',
      icon: Landmark,
    },
    {
      name: 'Unguwar Kanawa Central Juma\'at Mosque',
      category: 'Religious Institution',
      desc: 'Major spiritual gathering center accommodating thousands of worshippers for daily and Friday congregational prayers.',
      icon: Building2,
    },
    {
      name: 'Unguwar Kanawa Daily & Wood Market',
      category: 'Commercial Hub',
      desc: 'Bustling neighborhood market supplying fresh agricultural produce, timber, household goods, and local crafts.',
      icon: ShoppingBag,
    },
    {
      name: 'Unguwar Kanawa Primary Healthcare Clinic',
      category: 'Healthcare Facility',
      desc: 'Public healthcare centre delivering maternal-child care, routine immunizations, and primary emergency consultations.',
      icon: HeartPulse,
    },
    {
      name: 'LEA Primary & Government Secondary School',
      category: 'Educational Institutions',
      desc: 'Pioneering schools serving basic and secondary educational needs for generations of children in the community.',
      icon: GraduationCap,
    },
    {
      name: 'Central Youth Community Center & Football Arena',
      category: 'Recreation & Youth',
      desc: 'Public sports ground and multipurpose hall hosting the annual Unguwar Kanawa Peace Football Tournament and vocational bootcamps.',
      icon: Users,
    },
  ];

  const leadershipStructure = [
    {
      title: 'The Traditional Ruler (Mai Unguwar Kanawa)',
      desc: 'The supreme traditional custodian of community culture, grassroots peace, and liaison with Kaduna North traditional emirate structures.',
    },
    {
      title: 'Palace Secretary & Waziri',
      desc: 'Heads the official palace secretariat, correspondence records, verified announcements vetting, and public relations.',
    },
    {
      title: 'Ward Heads (Wakilan Unguwoyi)',
      desc: 'Direct custodians of individual residential quarters (Ward A - Shanu, Ward B - Masallaci, Ward C - Kasuwa, etc.), managing household disputes.',
    },
    {
      title: 'Community Development Committee (CDC)',
      desc: 'Elected civic engineers, elders, and leaders overseeing infrastructure self-help projects, drainage dredging, and donor coordination.',
    },
    {
      title: 'Youth & Women Representatives',
      desc: 'Mobilizers leading vocational apprenticeships, women trade cooperatives, environmental sanitation, and youth vanguard vigilance.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-950 text-xs font-bold uppercase tracking-wider">
          <History className="w-3.5 h-3.5" />
          <span>Heritage, Origins & Civic Identity</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-stone-900">
          ABOUT UNGUWAR KANAWA, KADUNA
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Discover the rich cultural ancestry, leadership heritage, geographic landscape, community facilities, and shared aspirations of Unguwar Kanawa in Kaduna North Local Government Area.
        </p>
      </div>

      {/* 1. History & Origins */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
        <div className="max-w-3xl space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-blue-950">
            Historical Origins & Cultural Lineage
          </h2>
          <p>
            <strong>Unguwar Kanawa</strong> is one of the historic, prominent, and culturally vibrant communities situated in Kaduna North Local Government Area of Kaduna State, Nigeria. Its establishment dates back to early settlements where traders, craftsmen, and agricultural settlers coalesced around trade corridors connecting the northern commerce hubs with the metropolitan capital of Kaduna.
          </p>
          <p>
            Known for enduring peace, hospitality, and communal solidarity, the name "Unguwar Kanawa" reflects early settler ties while evolving over successive decades into an all-embracing home for diverse tradesmen, public servants, scholars, and entrepreneurs across Northern Nigeria.
          </p>
          <p>
            Under the traditional institution of the <em>Mai Unguwar Kanawa</em> and the Traditional Council, the community has preserved revered Hausa cultural virtues, including mutual respect, family cohesion, peaceful resolution of disputes (sulhu), and deep civic responsibility.
          </p>
        </div>

        {/* Geographic location and stats card */}
        <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-stone-500 uppercase flex items-center gap-1">
              <Compass className="w-4 h-4 text-blue-800" /> Geographic Coordinates
            </span>
            <p className="font-bold text-stone-800 text-sm">Kaduna North LGA</p>
            <p className="text-stone-500">Kaduna Metropolis, Kaduna State, North-West Nigeria</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-stone-500 uppercase flex items-center gap-1">
              <MapPin className="w-4 h-4 text-amber-700" /> Primary Wards / Sectors
            </span>
            <p className="font-bold text-stone-800 text-sm">5 Autonomous Wards</p>
            <p className="text-stone-500">Ward A (Shanu), Ward B (Masallaci), Ward C (Kasuwa), Central Palace & Railway Quarters</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-stone-500 uppercase flex items-center gap-1">
              <Award className="w-4 h-4 text-blue-800" /> Core Values
            </span>
            <p className="font-bold text-stone-800 text-sm">Unity, Self-Help & Honor</p>
            <p className="text-stone-500">Respect for elders, youth empowerment, peaceful coexistence</p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Community History Timeline */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-cinzel text-2xl font-bold text-stone-900">
            CHRONOLOGICAL COMMUNITY TIMELINE
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Milestones charting the steady growth and development of Unguwar Kanawa
          </p>
        </div>

        <div className="relative border-l-2 border-blue-800 ml-4 sm:ml-32 space-y-8 py-4">
          {timelineEvents.map((evt, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Timeline marker pin */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-400 border-2 border-blue-950 shadow group-hover:scale-125 transition"></div>

              {/* Year label on left for larger screens */}
              <div className="sm:absolute sm:-left-32 sm:top-1 sm:w-28 text-left sm:text-right font-cinzel font-bold text-xs sm:text-sm text-amber-800">
                {evt.year}
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition">
                <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                  {evt.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                  {evt.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Community Leadership Structure */}
      <section className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-cinzel text-2xl font-bold text-stone-900">
            TRADITIONAL & COMMUNITY LEADERSHIP STRUCTURE
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            An organized traditional governance framework ensuring every household and ward has a voice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadershipStructure.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center">
                0{idx + 1}
              </div>
              <h3 className="font-bold text-stone-900 text-sm font-cinzel">
                {item.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Important Landmarks & Public Institutions */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-cinzel text-2xl font-bold text-stone-900">
            LANDMARKS & PUBLIC INSTITUTIONS
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Schools, healthcare facilities, religious centres, markets, and civic hubs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {landmarks.map((l, idx) => {
            const Icon = l.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-blue-700/50 transition flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-blue-50 text-blue-900 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                    {l.category}
                  </span>
                  <h3 className="font-bold text-stone-900 text-sm leading-snug">
                    {l.name}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{l.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Cultural Activities & Traditional Values */}
      <section className="bg-gradient-to-r from-blue-950 to-stone-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border-2 border-amber-500/40">
        <div className="max-w-3xl space-y-4">
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-400">
            CULTURAL FESTIVALS & TRADITIONAL VALUES
          </h2>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            The people of Unguwar Kanawa celebrate rich cultural festivities including the annual <strong>Sallah Durbar horse processions</strong>, traditional Hausa wrestling (<strong>Kokawa</strong>), and inter-ward archery exhibitions. In addition, the community takes immense pride in communal self-help (<strong>Aikin Gayya</strong>), where youth and elders unite to clear waterways, repair lanes, and safeguard neighborhood security.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-amber-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-amber-400" /> Sallah Equestrian Durbar
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-amber-400" /> Traditional Kokawa Wrestling
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-amber-400" /> Aikin Gayya (Communal Self-Help)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-amber-400" /> Quranic Recitation Festivals
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
