import { motion } from "framer-motion";
import {
  Heart,
  Battery,
  Wifi,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock system health data - ready for backend integration
const mockSystemHealth = {
  overallStatus: "operational",
  uptime: "127 days, 14 hours",
  totalNodes: 28,
  activeNodes: 24,
  offlineNodes: 4,
  averageBattery: 73,
  networkLatency: 45,
  dataCollectionRate: 99.2,
};

const mockNodeHealth = [
  {
    nodeId: "Node-01",
    status: "healthy",
    battery: 89,
    rssi: -67,
    lastSeen: "2 min ago",
    uptime: "45 days",
    dataQuality: 98.5,
    issues: [],
  },
  {
    nodeId: "Node-07",
    status: "warning",
    battery: 67,
    rssi: -72,
    lastSeen: "1 min ago",
    uptime: "43 days",
    dataQuality: 94.2,
    issues: ["Low battery", "Intermittent connectivity"],
  },
  {
    nodeId: "Node-12",
    status: "healthy",
    battery: 82,
    rssi: -69,
    lastSeen: "3 min ago",
    uptime: "41 days",
    dataQuality: 97.8,
    issues: [],
  },
  {
    nodeId: "Node-15",
    status: "critical",
    battery: 34,
    rssi: -78,
    lastSeen: "15 min ago",
    uptime: "12 hours",
    dataQuality: 67.3,
    issues: ["Critical battery", "Poor signal", "Frequent disconnections"],
  },
  {
    nodeId: "Node-18",
    status: "offline",
    battery: 0,
    rssi: null,
    lastSeen: "3 hours ago",
    uptime: "0 hours",
    dataQuality: 0,
    issues: ["Node offline", "No response", "Possible hardware failure"],
  },
  {
    nodeId: "Node-03",
    status: "healthy",
    battery: 91,
    rssi: -64,
    lastSeen: "1 min ago",
    uptime: "38 days",
    dataQuality: 99.1,
    issues: [],
  },
];

const mockSystemComponents = [
  {
    component: "Data Collection Service",
    status: "healthy",
    uptime: "99.8%",
    lastRestart: "3 days ago",
  },
  {
    component: "ML Prediction Engine",
    status: "healthy",
    uptime: "99.2%",
    lastRestart: "1 day ago",
  },
  {
    component: "Alert Management",
    status: "healthy",
    uptime: "100%",
    lastRestart: "7 days ago",
  },
  {
    component: "Database",
    status: "healthy",
    uptime: "99.9%",
    lastRestart: "12 days ago",
  },
  {
    component: "Weather Integration",
    status: "warning",
    uptime: "97.3%",
    lastRestart: "2 hours ago",
  },
];

export default function Health() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "status-safe";
      case "warning":
        return "status-warning";
      case "critical":
        return "status-critical";
      case "offline":
        return "status-offline";
      default:
        return "bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "critical":
        return <XCircle className="w-4 h-4" />;
      case "offline":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getBatteryColor = (battery: number | null) => {
    if (battery === null) return "text-status-offline";
    if (battery > 50) return "text-status-safe";
    if (battery > 20) return "text-status-warning";
    return "text-status-critical";
  };

  const getSignalStrength = (rssi: number | null) => {
    if (rssi === null) return "Offline";
    if (rssi > -60) return "Excellent";
    if (rssi > -70) return "Good";
    if (rssi > -80) return "Fair";
    return "Poor";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Health</h1>
          <p className="text-muted-foreground">
            Network diagnostics and system monitoring dashboard
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </Button>
          <Badge
            className={`${getStatusColor(mockSystemHealth.overallStatus)} text-white`}
          >
            <Heart className="w-3 h-3 mr-1" />
            System {mockSystemHealth.overallStatus.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="monitoring-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <Clock className="h-4 w-4 text-chart-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-primary">
                {mockSystemHealth.uptime.split(",")[0]}
              </div>
              <p className="text-xs text-muted-foreground">
                {mockSystemHealth.uptime.split(",")[1]}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="monitoring-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Nodes</CardTitle>
              <Wifi className="h-4 w-4 text-chart-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-secondary">
                {mockSystemHealth.activeNodes}
              </div>
              <p className="text-xs text-muted-foreground">
                of {mockSystemHealth.totalNodes} total nodes
              </p>
              <Progress
                value={(mockSystemHealth.activeNodes / mockSystemHealth.totalNodes) * 100}
                className="mt-2"
              />
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
                Average Battery
              </CardTitle>
              <Battery className="h-4 w-4 text-chart-tertiary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-tertiary">
                {mockSystemHealth.averageBattery}%
              </div>
              <p className="text-xs text-muted-foreground">
                network average
              </p>
              <Progress value={mockSystemHealth.averageBattery} className="mt-2" />
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
                Data Collection
              </CardTitle>
              <Heart className="h-4 w-4 text-chart-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-warning">
                {mockSystemHealth.dataCollectionRate}%
              </div>
              <p className="text-xs text-muted-foreground">
                success rate (24h)
              </p>
              <Progress value={mockSystemHealth.dataCollectionRate} className="mt-2" />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="nodes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="nodes">Node Health</TabsTrigger>
          <TabsTrigger value="components">System Components</TabsTrigger>
          <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
        </TabsList>

        <TabsContent value="nodes" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockNodeHealth.map((node, index) => (
              <motion.div
                key={node.nodeId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="monitoring-card">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <span>{node.nodeId}</span>
                      <Badge className={`${getStatusColor(node.status)} text-white`}>
                        {getStatusIcon(node.status)}
                        <span className="ml-1">
                          {node.status.toUpperCase()}
                        </span>
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className={`text-xl font-bold ${getBatteryColor(node.battery)}`}>
                          {node.battery || 0}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Battery
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-xl font-bold text-chart-primary">
                          {node.dataQuality.toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Data Quality
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Signal Strength</span>
                        <span className="text-sm font-medium">
                          {node.rssi ? `${node.rssi} dBm (${getSignalStrength(node.rssi)})` : "Offline"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Last Seen</span>
                        <span className="text-sm font-medium">{node.lastSeen}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Uptime</span>
                        <span className="text-sm font-medium">{node.uptime}</span>
                      </div>
                    </div>

                    {node.issues.length > 0 && (
                      <div className="border-t pt-3">
                        <h4 className="text-sm font-medium mb-2">Active Issues:</h4>
                        <div className="space-y-1">
                          {node.issues.map((issue, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <AlertTriangle className="w-3 h-3 text-status-warning" />
                              <span className="text-xs text-muted-foreground">
                                {issue}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="components" className="space-y-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="monitoring-card">
              <CardHeader>
                <CardTitle>System Components Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSystemComponents.map((component, index) => (
                    <div
                      key={component.component}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Badge className={`${getStatusColor(component.status)} text-white`}>
                          {getStatusIcon(component.status)}
                        </Badge>
                        <div>
                          <div className="font-medium">{component.component}</div>
                          <div className="text-sm text-muted-foreground">
                            Last restart: {component.lastRestart}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{component.uptime}</div>
                        <div className="text-sm text-muted-foreground">Uptime</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="diagnostics" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="monitoring-card">
                <CardHeader>
                  <CardTitle>Network Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Latency</span>
                    <span className="text-sm font-medium">
                      {mockSystemHealth.networkLatency}ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Packet Loss</span>
                    <span className="text-sm font-medium">0.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Throughput</span>
                    <span className="text-sm font-medium">2.4 Mbps</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Connection Stability</span>
                    <span className="text-sm font-medium">98.7%</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="monitoring-card">
                <CardHeader>
                  <CardTitle>System Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">CPU Usage</span>
                      <span className="text-sm font-medium">23%</span>
                    </div>
                    <Progress value={23} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Memory Usage</span>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                    <Progress value={67} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Disk Usage</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <Progress value={45} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Network Usage</span>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                    <Progress value={12} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="monitoring-card">
              <CardHeader>
                <CardTitle>Recent System Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-status-safe" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        All nodes successfully updated to firmware v2.1.3
                      </div>
                      <div className="text-xs text-muted-foreground">
                        2 hours ago
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-status-warning" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        Weather service connection restored
                      </div>
                      <div className="text-xs text-muted-foreground">
                        4 hours ago
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <XCircle className="w-4 h-4 text-status-critical" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        Node-18 went offline - investigating
                      </div>
                      <div className="text-xs text-muted-foreground">
                        6 hours ago
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}