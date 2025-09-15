import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Battery,
  Wifi,
  Thermometer,
  Droplets,
  Wind,
  Clock,
  Pause,
  Play,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock live data - ready for backend integration via WebSocket or polling
const mockSensorData = [
  {
    nodeId: "Node-01",
    vibration: 23,
    tilt: 2.1,
    temperature: 18.5,
    humidity: 67,
    battery: 89,
    rssi: -67,
    status: "safe",
    lastUpdate: new Date(),
  },
  {
    nodeId: "Node-07",
    vibration: 156,
    tilt: 12.3,
    temperature: 19.2,
    humidity: 72,
    battery: 67,
    rssi: -72,
    status: "critical",
    lastUpdate: new Date(),
  },
  {
    nodeId: "Node-12",
    vibration: 89,
    tilt: 8.7,
    temperature: 17.8,
    humidity: 69,
    battery: 82,
    rssi: -69,
    status: "warning",
    lastUpdate: new Date(),
  },
  {
    nodeId: "Node-15",
    vibration: 45,
    tilt: 4.2,
    temperature: 18.9,
    humidity: 65,
    battery: 91,
    rssi: -64,
    status: "safe",
    lastUpdate: new Date(),
  },
];

const mockWeatherData = {
  temperature: 16.8,
  humidity: 71,
  windSpeed: 12.3,
  windDirection: "NW",
  pressure: 1013.2,
  rainfall: 0.0,
  lastRainfall: "6 hours ago",
};

export default function LiveData() {
  const [isLive, setIsLive] = useState(true);
  const [sensorData, setSensorData] = useState(mockSensorData);

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setSensorData((prevData) =>
        prevData.map((node) => ({
          ...node,
          vibration: Math.max(
            0,
            node.vibration + (Math.random() - 0.5) * 10
          ),
          tilt: Math.max(0, node.tilt + (Math.random() - 0.5) * 0.5),
          temperature: node.temperature + (Math.random() - 0.5) * 0.2,
          humidity: Math.max(
            0,
            Math.min(100, node.humidity + (Math.random() - 0.5) * 2)
          ),
          lastUpdate: new Date(),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "status-critical";
      case "warning":
        return "status-warning";
      case "safe":
        return "status-safe";
      default:
        return "status-offline";
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return "text-status-safe";
    if (battery > 20) return "text-status-warning";
    return "text-status-critical";
  };

  const getSignalStrength = (rssi: number) => {
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
          <h1 className="text-3xl font-bold text-foreground">Live Data Feed</h1>
          <p className="text-muted-foreground">
            Real-time sensor readings and environmental conditions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isLive ? "default" : "outline"}
            size="sm"
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause Live
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Resume Live
              </>
            )}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Live Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 p-3 bg-card border rounded-lg"
      >
        <div
          className={`w-3 h-3 rounded-full ${
            isLive ? "bg-status-safe animate-pulse-glow" : "bg-status-offline"
          }`}
        />
        <span className="text-sm font-medium">
          {isLive ? "Live Data Stream Active" : "Data Stream Paused"}
        </span>
        <Badge variant="outline" className="ml-auto">
          <Clock className="w-3 h-3 mr-1" />
          Updated {isLive ? "now" : "paused"}
        </Badge>
      </motion.div>

      <Tabs defaultValue="sensors" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sensors">Sensor Readings</TabsTrigger>
          <TabsTrigger value="weather">Weather Station</TabsTrigger>
          <TabsTrigger value="network">Network Status</TabsTrigger>
        </TabsList>

        <TabsContent value="sensors" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {sensorData.map((node, index) => (
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
                      <Badge className={getStatusColor(node.status)}>
                        {node.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-chart-primary">
                          {node.vibration.toFixed(0)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Vibration (μg)
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-chart-secondary">
                          {node.tilt.toFixed(1)}°
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Tilt Angle
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-chart-tertiary" />
                          <span className="text-sm">Temperature</span>
                        </div>
                        <span className="text-sm font-medium">
                          {node.temperature.toFixed(1)}°C
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-chart-secondary" />
                          <span className="text-sm">Humidity</span>
                        </div>
                        <span className="text-sm font-medium">
                          {node.humidity.toFixed(0)}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Battery
                            className={`w-4 h-4 ${getBatteryColor(
                              node.battery
                            )}`}
                          />
                          <span className="text-sm">Battery</span>
                        </div>
                        <span
                          className={`text-sm font-medium ${getBatteryColor(
                            node.battery
                          )}`}
                        >
                          {node.battery}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Wifi className="w-4 h-4" />
                          <span className="text-sm">Signal</span>
                        </div>
                        <span className="text-sm font-medium">
                          {node.rssi} dBm ({getSignalStrength(node.rssi)})
                        </span>
                      </div>

                      <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                        Last update: {node.lastUpdate.toLocaleTimeString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="weather" className="space-y-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="monitoring-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="w-5 h-5" />
                  Environmental Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Thermometer className="w-8 h-8 mx-auto mb-2 text-chart-tertiary" />
                    <div className="text-3xl font-bold">
                      {mockWeatherData.temperature}°C
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Temperature
                    </div>
                  </div>

                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Droplets className="w-8 h-8 mx-auto mb-2 text-chart-secondary" />
                    <div className="text-3xl font-bold">
                      {mockWeatherData.humidity}%
                    </div>
                    <div className="text-sm text-muted-foreground">Humidity</div>
                  </div>

                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Wind className="w-8 h-8 mx-auto mb-2 text-chart-primary" />
                    <div className="text-3xl font-bold">
                      {mockWeatherData.windSpeed}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Wind Speed (km/h)
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Atmospheric Conditions</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Pressure</span>
                        <span className="text-sm font-medium">
                          {mockWeatherData.pressure} hPa
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Wind Direction</span>
                        <span className="text-sm font-medium">
                          {mockWeatherData.windDirection}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Precipitation</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Current Rainfall</span>
                        <span className="text-sm font-medium">
                          {mockWeatherData.rainfall} mm/h
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Last Rainfall</span>
                        <span className="text-sm font-medium">
                          {mockWeatherData.lastRainfall}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="network" className="space-y-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="monitoring-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="w-5 h-5" />
                  Network Health Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {sensorData.map((node, index) => (
                    <div
                      key={node.nodeId}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            node.status === "safe"
                              ? "bg-status-safe"
                              : node.status === "warning"
                              ? "bg-status-warning"
                              : "bg-status-critical"
                          }`}
                        />
                        <div>
                          <div className="font-medium">{node.nodeId}</div>
                          <div className="text-sm text-muted-foreground">
                            {getSignalStrength(node.rssi)} signal strength
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-sm font-medium">
                            {node.rssi} dBm
                          </div>
                          <div className="text-xs text-muted-foreground">
                            RSSI
                          </div>
                        </div>
                        <div className="text-center">
                          <div
                            className={`text-sm font-medium ${getBatteryColor(
                              node.battery
                            )}`}
                          >
                            {node.battery}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Battery
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">
                            {Math.floor(Math.random() * 5) + 1}s
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Latency
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}