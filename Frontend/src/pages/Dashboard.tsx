import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
import {
  Activity,
  AlertTriangle,
  Battery,
  MapPin,
  TrendingUp,
  Wifi,
  Clock,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data - ready for backend integration
const mockMetrics = {
  activeSensors: 24,
  totalSensors: 28,
  activeAlerts: 3,
  lastRainfall: "2.3mm (6h ago)",
  batteryHealth: 87,
  networkStatus: "Operational",
};

const mockAlerts = [
  {
    id: 1,
    nodeId: "Node-07",
    location: "Sector A-3",
    type: "High Vibration",
    severity: "critical",
    timestamp: "15 minutes ago",
  },
  {
    id: 2,
    nodeId: "Node-12",
    location: "Sector B-1",
    type: "Tilt Angle",
    severity: "warning",
    timestamp: "1 hour ago",
  },
  {
    id: 3,
    nodeId: "Node-18",
    location: "Sector C-2",
    type: "Low Battery",
    severity: "warning",
    timestamp: "3 hours ago",
  },
];

const mockRecentData = [
  { node: "Node-07", vibration: 156, tilt: 12.3, battery: 67 },
  { node: "Node-12", vibration: 89, tilt: 8.7, battery: 82 },
  { node: "Node-15", vibration: 45, tilt: 4.2, battery: 91 },
  { node: "Node-03", vibration: 78, tilt: 6.1, battery: 88 },
];

export default function Dashboard() {

  const navigate = useNavigate();

  // 🔐 Protect route: redirect if no token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // 🔓 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "status-critical";
      case "warning":
        return "status-warning";
      default:
        return "status-safe";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            System Overview
          </h1>
          <p className="text-muted-foreground">
            Real-time monitoring of rockfall detection network
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-status-safe border-status-safe"
          >
            <Shield className="w-3 h-3 mr-1" />
            System Online
          </Badge>
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Last Update: 2 min ago
          </Button>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {mockAlerts.filter((alert) => alert.severity === "critical").length >
        0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-status-critical/10 border border-status-critical/30 rounded-lg p-4"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-status-critical" />
            <div>
              <h3 className="font-semibold text-foreground">
                Critical Alert Active
              </h3>
              <p className="text-sm text-muted-foreground">
                High vibration detected at Node-07. Immediate attention required.
              </p>
            </div>
            <Button variant="destructive" size="sm" className="ml-auto">
              View Details
            </Button>
          </div>
        </motion.div>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="monitoring-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Sensors
              </CardTitle>
              <Activity className="h-4 w-4 text-chart-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockMetrics.activeSensors}
              </div>
              <p className="text-xs text-muted-foreground">
                of {mockMetrics.totalSensors} total sensors
              </p>
              <div className="mt-2 h-2 bg-muted rounded">
                <div
                  className="h-2 bg-chart-primary rounded"
                  style={{
                    width: `${
                      (mockMetrics.activeSensors / mockMetrics.totalSensors) *
                      100
                    }%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="monitoring-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Alerts
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-chart-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-warning">
                {mockMetrics.activeAlerts}
              </div>
              <p className="text-xs text-muted-foreground">
                requiring attention
              </p>
              <div className="flex gap-1 mt-2">
                <Badge className="status-critical text-xs">1 Critical</Badge>
                <Badge className="status-warning text-xs">2 Warnings</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="monitoring-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Last Rainfall
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-chart-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3mm</div>
              <p className="text-xs text-muted-foreground">6 hours ago</p>
              <div className="mt-2 text-xs text-chart-secondary">
                ↑ Normal levels
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="monitoring-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Battery Health
              </CardTitle>
              <Battery className="h-4 w-4 text-chart-tertiary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockMetrics.batteryHealth}%
              </div>
              <p className="text-xs text-muted-foreground">average across network</p>
              <div className="mt-2 h-2 bg-muted rounded">
                <div
                  className="h-2 bg-chart-tertiary rounded"
                  style={{ width: `${mockMetrics.batteryHealth}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Alerts and Quick Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="monitoring-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.nodeId}
                    </Badge>
                    <div>
                      <div className="font-medium text-sm">{alert.type}</div>
                      <div className="text-xs text-muted-foreground">
                        {alert.location} • {alert.timestamp}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Status Overview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="monitoring-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Network Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRecentData.map((data, index) => (
                <div
                  key={data.node}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-status-safe rounded-full" />
                    <div>
                      <div className="font-medium text-sm">{data.node}</div>
                      <div className="text-xs text-muted-foreground">
                        Vibration: {data.vibration}μg • Tilt: {data.tilt}°
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-chart-tertiary" />
                    <span className="text-sm">{data.battery}%</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                <MapPin className="w-4 h-4 mr-2" />
                View Map
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}