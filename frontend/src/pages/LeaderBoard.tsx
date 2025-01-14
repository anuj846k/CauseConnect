import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Users, 
  Medal, 
  Crown, 
  Star, 
  Heart,
  Clock,
  Calendar,
  ChevronDown,
  Check
} from "lucide-react";

interface LeaderData {
  id: number;
  name: string;
  points: number;
  hours?: number;
  events: number;
  members?: number;
  avatar: string;
}

const TimeFilterDropdown = ({ value, onChange }: { 
  value: string; 
  onChange: (value: string) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'weekly', label: 'This Week' },
    { value: 'monthly', label: 'This Month' },
    { value: 'yearly', label: 'This Year' },
    { value: 'allTime', label: 'All Time' }
  ];

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="appearance-none bg-white/90 backdrop-blur-sm border-2 border-gray-200/80 
          rounded-2xl px-6 pl-12 py-3.5 pr-12 w-[200px]
          text-gray-700 font-medium text-left
          focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
          shadow-sm group-hover:shadow-md transition-all duration-300
          hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
      >
        {selectedOption?.label}
      </button>

      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 
        pointer-events-none transition-transform duration-300 group-hover:scale-110" />
      
      <ChevronDown className={`absolute right-4 top-1/2 w-5 h-5 text-gray-400 
        pointer-events-none transition-all duration-300 group-hover:text-blue-600
        transform -translate-y-1/2 ${isOpen ? 'rotate-180' : ''}`} />

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 
        opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 overflow-hidden origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 
          animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors
                  ${value === option.value ? 'bg-blue-50/50 text-blue-600 font-medium' : ''}
                  group/item`}
              >
                <span className="flex-grow">{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-blue-600 group-hover/item:scale-110 transition-transform" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const LeaderBoard = () => {
  const [timeFilter, setTimeFilter] = useState('weekly');

  const topVolunteers: LeaderData[] = [
    { id: 1, name: "Sarah Johnson", points: 2500, hours: 48, events: 12, avatar: "https://img.freepik.com/premium-photo/world-charity-day-backgrounds_1198941-10278.jpg?w=740" },
    { id: 2, name: "Mike Chen", points: 2350, hours: 45, events: 10, avatar: "https://img.freepik.com/premium-photo/world-charity-day-backgrounds_1198941-10278.jpg?w=740" },
    { id: 3, name: "Emma Davis", points: 2200, hours: 42, events: 11, avatar: "https://img.freepik.com/premium-photo/world-charity-day-backgrounds_1198941-10278.jpg?w=740" },
    { id: 4, name: "Alex Kim", points: 2100, hours: 40, events: 9, avatar: "https://img.freepik.com/premium-photo/world-charity-day-backgrounds_1198941-10278.jpg?w=740" },
    { id: 5, name: "Lisa Patel", points: 2000, hours: 38, events: 8, avatar: "https://img.freepik.com/premium-photo/world-charity-day-backgrounds_1198941-10278.jpg?w=740" },
  ];

  const topTeams: LeaderData[] = [
    { id: 1, name: "Green Warriors", points: 7500, members: 12, events: 25, avatar: "https://img.freepik.com/premium-photo/world-charity-day-backgrounds_1198941-10278.jpg?w=740" },
    { id: 2, name: "Community Heroes", points: 7000, members: 10, events: 22, avatar: "https://img.freepik.com/premium-photo/world-charity-day-backgrounds_1198941-10278.jpg?w=740" },
    { id: 3, name: "Impact Makers", points: 6800, members: 15, events: 20, avatar: "https://img.freepik.com/premium-photo/world-charity-day-backgrounds_1198941-10278.jpg?w=740" },
    { id: 4, name: "City Volunteers", points: 6500, members: 8, events: 18, avatar: "https://img.freepik.com/premium-photo/world-charity-day-backgrounds_1198941-10278.jpg?w=740" },
    { id: 5, name: "Hope Brigade", points: 6200, members: 11, events: 16, avatar: "https://img.freepik.com/premium-photo/world-charity-day-backgrounds_1198941-10278.jpg?w=740" },
  ];

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0:
        return "text-yellow-400";
      case 1:
        return "text-gray-400";
      case 2:
        return "text-amber-600";
      default:
        return "text-blue-900";
    }
  };

  const LeaderCard = ({ rank, data, type }: { rank: number; data: LeaderData; type: 'volunteer' | 'team' }) => (
    <div 
      className={`relative flex items-center gap-4 p-4
        backdrop-blur-md bg-white/98 hover:bg-gradient-to-r hover:from-white hover:to-gray-50/95
        shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(8,_112,_184,_0.12)] 
        transition-all duration-500 mb-3
        border border-gray-100/50 group
        transform hover:scale-[1.02] hover:-translate-y-1
        rounded-[20px]
        overflow-hidden
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-transparent before:via-white/40 before:to-transparent
        before:translate-x-[-100%] before:animate-[shimmer_2s_infinite]
        after:absolute after:inset-0 after:bg-gradient-to-r
        after:from-transparent after:via-white/20 after:to-transparent
        after:translate-x-[-100%] after:animate-[shimmer_2s_infinite]
        after:delay-1000`}
    >
      {/* Rank */}
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
        {rank <= 3 ? (
          <div className="relative">
            <Medal className={`w-8 h-8 ${getMedalColor(rank - 1)} drop-shadow-lg group-hover:scale-110 
              transition-transform duration-500 group-hover:rotate-12 filter group-hover:brightness-110`} />
          </div>
        ) : (
          <span className="text-base font-bold text-gray-500/90 tracking-wider bg-white/80 px-3 py-1.5 
            rounded-full shadow-sm group-hover:shadow-md transition-all">#{rank}</span>
        )}
      </div>

      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-offset-2 ring-blue-500/40 
          group-hover:ring-blue-500/60 transition-all duration-500 transform group-hover:rotate-3
          group-hover:shadow-[0_8px_20px_rgba(8,_112,_184,_0.2)]">
          <img
            src={data.avatar}
            alt={data.name}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700
              filter group-hover:brightness-105"
          />
        </div>
        {rank === 1 && (
          <Crown className="absolute -top-2 -right-1 w-5 h-5 text-amber-400 drop-shadow-lg 
            animate-bounce group-hover:text-amber-500 transition-colors duration-300
            filter group-hover:brightness-110" />
        )}
      </div>

      {/* Info */}
      <div className="flex-grow">
        <h3 className="font-bold text-base text-blue-950 mb-2 group-hover:text-blue-800 
          transition-colors duration-300 group-hover:tracking-wide">
          {data.name}
        </h3>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 bg-gradient-to-r from-blue-50/90 to-blue-100/80 
            text-blue-700 px-3 py-1.5 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300
            group-hover:from-blue-100/90 group-hover:to-blue-200/80 group-hover:scale-105">
            <Star className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" /> 
            {data.points.toLocaleString()} pts
          </span>
          {type === 'volunteer' ? (
            <>
              <span className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-50/90 to-green-100/80 
                text-emerald-700 px-3 py-1.5 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300
                group-hover:from-emerald-100/90 group-hover:to-green-200/80 group-hover:scale-105">
                <Clock className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" /> 
                {data.hours}h
              </span>
              <span className="flex items-center gap-1.5 bg-gradient-to-r from-purple-50/90 to-purple-100/80 
                text-purple-700 px-3 py-1.5 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300
                group-hover:from-purple-100/90 group-hover:to-purple-200/80 group-hover:scale-105">
                <Calendar className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" /> 
                {data.events} events
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1.5 bg-gradient-to-r from-orange-50/90 to-orange-100/80 
                text-orange-700 px-3 py-1.5 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300
                group-hover:from-orange-100/90 group-hover:to-orange-200/80 group-hover:scale-105">
                <Users className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" /> 
                {data.members} members
              </span>
              <span className="flex items-center gap-1.5 bg-gradient-to-r from-purple-50/90 to-purple-100/80 
                text-purple-700 px-3 py-1.5 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300
                group-hover:from-purple-100/90 group-hover:to-purple-200/80 group-hover:scale-105">
                <Calendar className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" /> 
                {data.events} events
              </span>
            </>
          )}
        </div>
      </div>

      {/* Points badge */}
      <div className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-2 
        rounded-lg text-sm font-bold shadow-lg group-hover:shadow-xl group-hover:from-blue-500 
        group-hover:to-blue-600 transition-all duration-500 transform group-hover:scale-105
        group-hover:translate-x-1 relative overflow-hidden
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-transparent before:via-white/20 before:to-transparent
        before:translate-x-[-100%] before:animate-[shimmer_2s_infinite]">
        {data.points.toLocaleString()} pts
      </div>
    </div>
  );

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50/95 via-white/98 to-purple-50/95 backdrop-blur-xl 
      shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border-gray-100/20 rounded-[28px] min-h-[600px] relative overflow-hidden
      before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-100/30 
      before:via-transparent before:to-purple-100/30 before:opacity-40 before:pointer-events-none">
      <Tabs defaultValue="volunteers" className="w-full">
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-5">
              <div className="bg-gradient-to-br from-amber-100/90 to-yellow-100/90 p-3.5 rounded-xl 
                shadow-[0_8px_20px_rgba(251,_191,_36,_0.15)] transform hover:scale-105 transition-all duration-300 
                ring-1 ring-amber-200/50 backdrop-blur-sm group">
                <Trophy className="w-6 h-6 text-amber-500 drop-shadow-md transform -rotate-6 group-hover:rotate-0 transition-all" />
              </div>
              <div>
                <h2 className="text-[2rem] font-bold bg-gradient-to-r from-blue-950 via-blue-800 to-indigo-700 
                  bg-clip-text text-transparent tracking-tight leading-tight">
                  Leaderboard
                </h2>
                <p className="text-gray-500 mt-1.5 text-sm tracking-wide">Recognizing our top contributors</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <TabsList className="flex w-[400px] bg-gray-100/80 backdrop-blur-xl 
                rounded-full p-2.5 gap-2 relative
                shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] border-0
                transition-all duration-500">
                <TabsTrigger 
                  value="volunteers" 
                  className="flex-1 flex items-center justify-center gap-2.5 px-7 py-3.5
                    text-gray-600 rounded-full
                    data-[state=active]:bg-white
                    data-[state=active]:shadow-[0_3px_12px_-2px_rgba(59,130,246,0.12)]
                    relative transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group
                    hover:text-blue-600
                    data-[state=active]:scale-[1.02]
                    data-[state=active]:translate-y-[-1px]
                    data-[state=active]:text-blue-950
                    before:absolute before:inset-0 before:rounded-full
                    before:bg-gradient-to-r before:from-blue-50 before:to-indigo-50/50
                    before:opacity-0 before:transition-opacity before:duration-500
                    before:-z-10
                    data-[state=active]:before:opacity-100"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2.5">
                    <Heart className="w-[18px] h-[18px] transition-all duration-500
                      group-hover:scale-110 group-hover:rotate-6
                      data-[state=active]:scale-125 data-[state=active]:rotate-12
                      data-[state=active]:text-blue-950" />
                    <span className="text-[15px] font-medium transition-all duration-500
                      data-[state=active]:font-bold
                      data-[state=active]:tracking-wide
                      data-[state=active]:text-blue-950">Top Volunteers</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="teams" 
                  className="flex-1 flex items-center justify-center gap-2.5 px-7 py-3.5
                    text-gray-600 rounded-full
                    data-[state=active]:bg-white
                    data-[state=active]:shadow-[0_3px_12px_-2px_rgba(59,130,246,0.12)]
                    relative transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group
                    hover:text-blue-600
                    data-[state=active]:scale-[1.02]
                    data-[state=active]:translate-y-[-1px]
                    data-[state=active]:text-blue-950
                    before:absolute before:inset-0 before:rounded-full
                    before:bg-gradient-to-r before:from-blue-50 before:to-indigo-50/50
                    before:opacity-0 before:transition-opacity before:duration-500
                    before:-z-10
                    data-[state=active]:before:opacity-100"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2.5">
                    <Users className="w-[18px] h-[18px] transition-all duration-500
                      group-hover:scale-110 group-hover:rotate-6
                      data-[state=active]:scale-125 data-[state=active]:rotate-12
                      data-[state=active]:text-blue-950" />
                    <span className="text-[15px] font-medium transition-all duration-500
                      data-[state=active]:font-bold
                      data-[state=active]:tracking-wide
                      data-[state=active]:text-blue-950">Top Teams</span>
                  </div>
                </TabsTrigger>
              </TabsList>
              <TimeFilterDropdown value={timeFilter} onChange={setTimeFilter} />
            </div>
          </div>

          <TabsContent 
            value="volunteers" 
            className="mt-2 space-y-3 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100 
              transition-all duration-500 relative before:absolute before:inset-0 before:bg-gradient-to-b 
              before:from-transparent before:to-white/50 before:pointer-events-none"
          >
            {topVolunteers.map((volunteer, index) => (
              <LeaderCard
                key={volunteer.id}
                rank={index + 1}
                data={volunteer}
                type="volunteer"
              />
            ))}
          </TabsContent>

          <TabsContent 
            value="teams" 
            className="mt-2 space-y-3 data-[state=inactive]:opacity-0 data-[state=active]:opacity-100 
              transition-all duration-500 relative before:absolute before:inset-0 before:bg-gradient-to-b 
              before:from-transparent before:to-white/50 before:pointer-events-none"
          >
            {topTeams.map((team, index) => (
              <LeaderCard
                key={team.id}
                rank={index + 1}
                data={team}
                type="team"
              />
            ))}
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};

export default LeaderBoard;