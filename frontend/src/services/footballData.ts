import axios from 'axios';

const FOOTBALL_API_BASE_URL = 'https://api.football-data.org/v4';
const FOOTBALL_API_KEY = 'eed37ffa5815ed6b34ea32953867153a';

const footballApiClient = axios.create({
  baseURL: FOOTBALL_API_BASE_URL,
  timeout: 10000,
  headers: {
    'X-Auth-Token': FOOTBALL_API_KEY,
    'Content-Type': 'application/json',
  },
});

export interface TeamStanding {
  position: number;
  team: { name: string; shortName: string; logo?: string; };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
  lastPosition?: number;
}

export interface ApiStanding {
  position: number;
  team: { name: string; shortName: string; tla: string; crest?: string; };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form?: string;
}

export interface StandingsResponse {
  standings: Array<{ table: ApiStanding[]; }>;
}

class FootballDataService {
  async getStandings(competitionId: number = 2021) {
    console.log('🏆 REAL DATA: Getting standings');
    const response = await footballApiClient.get<StandingsResponse>(`/competitions/${competitionId}/standings`);
    console.log('🏆 REAL DATA SUCCESS:', response.data.standings[0].table.slice(0, 3));
    
    return response.data.standings[0].table.map(standing => ({
      position: standing.position,
      team: {
        name: standing.team.name,
        shortName: standing.team.shortName || standing.team.tla,
        logo: standing.team.crest,
      },
      played: standing.playedGames,
      won: standing.won,
      drawn: standing.draw,
      lost: standing.lost,
      goalsFor: standing.goalsFor,
      goalsAgainst: standing.goalsAgainst,
      goalDifference: standing.goalDifference,
      points: standing.points,
      form: standing.form ? standing.form.split(',').map(result => result.trim() as 'W' | 'D' | 'L') : [],
      lastPosition: standing.position,
    }));
  }
}

export const footballDataService = new FootballDataService();
export default footballDataService;
import axios from 'axios';

// Football API configuration
const FOOTBALL_API_BASE_URL = 'https://api.football-data.org/v4';
const FOOTBALL_API_KEY = 'eed37ffa5815ed6b34ea32953867153a';

// Create dedicated axios instance for football data
const footballApiClient = axios.create({
  baseURL: FOOTBALL_API_BASE_URL,
  timeout: 10000,
  headers: {
    'X-Auth-Token': FOOTBALL_API_KEY,
    'Content-Type': 'application/json',
  },
});

// Types for API responses
export interface ApiTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest?: string;
}

export interface ApiStanding {
  position: number;
  team: ApiTeam;
  playedGames: number;
  form?: string;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface ApiMatch {
  id: number;
  homeTeam: ApiTeam;
  awayTeam: ApiTeam;
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
  status: 'SCHEDULED' | 'LIVE' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'POSTPONED' | 'SUSPENDED' | 'CANCELLED';
  utcDate: string;
  minute?: number;
  competition: {
    name: string;
  };
}

export interface StandingsResponse {
  standings: Array<{
    table: ApiStanding[];
  }>;
}

export interface MatchesResponse {
  matches: ApiMatch[];
}

// Transform API data to our internal format
export const transformStandingsData = (apiData: StandingsResponse) => {
  if (!apiData.standings || !apiData.standings[0]) {
    return [];
  }

  return apiData.standings[0].table.map((standing) => ({
    position: standing.position,
    team: {
      name: standing.team.name,
      shortName: standing.team.shortName || standing.team.tla,
      logo: standing.team.crest,
    },
    played: standing.playedGames,
    won: standing.won,
    drawn: standing.draw,
    lost: standing.lost,
    goalsFor: standing.goalsFor,
    goalsAgainst: standing.goalsAgainst,
    goalDifference: standing.goalDifference,
    points: standing.points,
    form: standing.form ? standing.form.split('').map(char => char as 'W' | 'D' | 'L') : [],
    lastPosition: standing.position + (Math.random() > 0.5 ? 1 : -1), // Mock previous position
  }));
};

export const transformMatchData = (match: ApiMatch) => ({
  id: match.id.toString(),
  homeTeam: {
    name: match.homeTeam.name,
    shortName: match.homeTeam.shortName || match.homeTeam.tla,
  },
  awayTeam: {
    name: match.awayTeam.name,
    shortName: match.awayTeam.shortName || match.awayTeam.tla,
  },
  homeScore: match.score.fullTime.home ?? undefined,
  awayScore: match.score.fullTime.away ?? undefined,
  status: match.status === 'FINISHED' ? 'ft' as const : 
          match.status === 'IN_PLAY' || match.status === 'LIVE' ? 'live' as const : 'scheduled' as const,
  minute: match.minute,
  time: new Date(match.utcDate).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  }),
  date: new Date(match.utcDate).toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  }),
  venue: '', // Not provided by free API
  competition: match.competition.name,
});

class FootballDataService {
  // Premier League standings (Competition ID: 2021 for Premier League)
  async getStandings(competitionId: number = 2021) {
    console.log('🏆 FootballDataService: Getting standings for competition', competitionId);
    console.log('🔑 API Key configured:', FOOTBALL_API_KEY ? 'YES' : 'NO');
    console.log('🌐 API URL:', `${FOOTBALL_API_BASE_URL}/competitions/${competitionId}/standings`);
    
    try {
      console.log('📡 FootballDataService: Making API request...');
      const response = await footballApiClient.get<StandingsResponse>(`/competitions/${competitionId}/standings`);
      console.log('✅ FootballDataService: API SUCCESS! Response:', response.data);
      console.log('📊 Raw standings data:', response.data.standings[0].table.slice(0, 3)); // First 3 teams
      
      const transformedData = transformStandingsData(response.data);
      console.log('🔄 Transformed standings data:', transformedData.slice(0, 3)); // First 3 teams
      return transformedData;
    } catch (error: any) {
      console.error('❌ FootballDataService: API FAILED');
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      
      // Fallback to mock data with realistic values
      console.log('🔄 FootballDataService: Using mock data fallback');
      return this.getMockStandings();
    }
  }

  // Get matches (fixtures and results)
  async getMatches(competitionId: number = 2021, status?: 'SCHEDULED' | 'LIVE' | 'FINISHED') {
    try {
      const params: any = {};
      if (status) {
        params.status = status;
      }
      
      const response = await footballApiClient.get<MatchesResponse>(`/competitions/${competitionId}/matches`, { params });
      return response.data.matches.map(transformMatchData);
    } catch (error) {
      console.warn('Primary API failed for matches, using mock data:', error);
      return this.getMockMatches();
    }
  }

  // Get today's matches
  async getTodaysMatches() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await footballApiClient.get<MatchesResponse>(`/matches`, {
        params: {
          dateFrom: today,
          dateTo: today,
        }
      });
      return response.data.matches
        .filter(match => match.competition.name === 'Premier League')
        .map(transformMatchData);
    } catch (error) {
      console.warn('Failed to get today\'s matches, using mock data:', error);
      return this.getMockTodaysMatches();
    }
  }

  // Fallback mock data methods
  private getMockStandings() {
    return [
      {
        position: 1,
        team: { name: 'Liverpool', shortName: 'Liverpool', logo: undefined },
        played: 16,
        won: 14,
        drawn: 1,
        lost: 1,
        goalsFor: 42,
        goalsAgainst: 12,
        goalDifference: 30,
        points: 43,
        form: ['W', 'W', 'W', 'W', 'W'] as ('W' | 'D' | 'L')[],
        lastPosition: 1
      },
      {
        position: 2,
        team: { name: 'Manchester City', shortName: 'Man City', logo: undefined },
        played: 16,
        won: 11,
        drawn: 1,
        lost: 4,
        goalsFor: 38,
        goalsAgainst: 18,
        goalDifference: 20,
        points: 34,
        form: ['W', 'L', 'W', 'W', 'D'] as ('W' | 'D' | 'L')[],
        lastPosition: 2
      },
      {
        position: 3,
        team: { name: 'Arsenal', shortName: 'Arsenal', logo: undefined },
        played: 16,
        won: 10,
        drawn: 3,
        lost: 3,
        goalsFor: 35,
        goalsAgainst: 20,
        goalDifference: 15,
        points: 33,
        form: ['W', 'D', 'W', 'L', 'W'] as ('W' | 'D' | 'L')[],
        lastPosition: 3
      },
      {
        position: 4,
        team: { name: 'Chelsea', shortName: 'Chelsea', logo: undefined },
        played: 15,
        won: 9,
        drawn: 4,
        lost: 2,
        goalsFor: 28,
        goalsAgainst: 18,
        goalDifference: 10,
        points: 31,
        form: ['D', 'W', 'W', 'D', 'L'] as ('W' | 'D' | 'L')[],
        lastPosition: 5
      },
      {
        position: 5,
        team: { name: 'Newcastle United', shortName: 'Newcastle', logo: undefined },
        played: 15,
        won: 8,
        drawn: 5,
        lost: 2,
        goalsFor: 25,
        goalsAgainst: 20,
        goalDifference: 5,
        points: 29,
        form: ['W', 'D', 'D', 'W', 'L'] as ('W' | 'D' | 'L')[],
        lastPosition: 4
      },
      {
        position: 6,
        team: { name: 'Manchester United', shortName: 'Man Utd', logo: undefined },
        played: 15,
        won: 8,
        drawn: 3,
        lost: 4,
        goalsFor: 24,
        goalsAgainst: 22,
        goalDifference: 2,
        points: 27,
        form: ['L', 'W', 'D', 'W', 'L'] as ('W' | 'D' | 'L')[],
        lastPosition: 6
      }
    ];
  }

  private getMockMatches() {
    return [
      {
        id: '1',
        homeTeam: { name: 'Arsenal', shortName: 'ARS' },
        awayTeam: { name: 'Chelsea', shortName: 'CHE' },
        homeScore: 2,
        awayScore: 1,
        status: 'live' as const,
        minute: 67,
        time: '16:30',
        date: 'Today',
        venue: 'Emirates Stadium',
        competition: 'Premier League'
      },
      {
        id: '2',
        homeTeam: { name: 'Manchester City', shortName: 'MCI' },
        awayTeam: { name: 'Liverpool', shortName: 'LIV' },
        homeScore: undefined,
        awayScore: undefined,
        status: 'scheduled' as const,
        time: '16:30',
        date: 'Tomorrow',
        venue: 'Etihad Stadium',
        competition: 'Premier League'
      }
    ];
  }

  private getMockTodaysMatches() {
    return [
      {
        id: '1',
        homeTeam: { name: 'Arsenal', shortName: 'ARS' },
        awayTeam: { name: 'Chelsea', shortName: 'CHE' },
        homeScore: 2,
        awayScore: 1,
        status: 'live' as const,
        minute: 67,
        time: '16:30',
        date: 'Today',
        venue: 'Emirates Stadium',
        competition: 'Premier League'
      }
    ];
  }
}

export const footballDataService = new FootballDataService();
export default footballDataService;