import React, { useEffect, useState } from 'react';
import { useAuth } from '../api/AuthContext';
import { Col, Row, Card, Form, Container } from 'react-bootstrap';
import {
    FaBan, FaBox, FaChartLine, FaArrowUp, FaArrowDown,
} from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, } from 'recharts';
import orderApi from '../api/orderApi';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import AdminSidebar from '../components/AdminSidebar';
import AdminNav from '../components/AdminNav';

const Home = () => {
    const { t, i18n } = useTranslation();
    const { user, isLoggedIn } = useAuth();
    const [chartData, setChartData] = useState([]);
    const [timeRange, setTimeRange] = useState("This Week");
    const [dashboardData, setDashboardData] = useState({
        bestSellingObject: null,
        weekOrder: 0,
        weekSale: 0,
        weekCancel: 0,
    });

    useEffect(() => {
        if (isLoggedIn && user) {
            console.log("User info:", user);
        }
    }, [user, isLoggedIn]);

    useEffect(() => {
        fetchDashboardInfo();
        fetchChartData(timeRange);
    }, []);

    useEffect(() => {
        fetchChartData(timeRange);
    }, [timeRange]);

    const fetchDashboardInfo = async () => {
        try {
            // const today = dayjs().format('YYYY-MM-DD');
            const today = '2025-06-14';
            const [product, order, sale, cancel] = await Promise.all([
                orderApi.bestSellingProduct(today),
                orderApi.weekTotalOrder(today),
                orderApi.weekTotalRevenue(today),
                orderApi.getAllOrder(),
            ]);

            const cancelledOrders = allOrders.data.result.filter(
                (order) => order.status === 'CANCELLED'
            ).length;

            setDashboardData({
                bestSellingObject: product.data.result,
                weekOrder: order.data.result,
                weekSale: sale.data.result,
                weekCancel: cancelledOrders,
            });
        } catch (err) {
            console.error('Error fetching dashboard info:', err);
        }
    };

    const fetchChartData = async (range) => {
        const today = dayjs().format("YYYY-MM-DD");
        let apiFn;

        switch (range) {
            case "This Week":
                apiFn = orderApi.getWeeklySales;
                break;
            case "This month":
                apiFn = orderApi.getMonthlySales;
                break;
            case "This year":
                apiFn = orderApi.getYearlySales;
                break;
            default:
                return;
        }

        try {
            const res = await apiFn(today);
            const transformed = res.data.result.map(item => ({
                name: item.label,
                value: item.value,
            }));
            setChartData(transformed);
        } catch (err) {
            console.error("Error loading chart data:", err);
        }
    };

    const DashboardStats = () => (
        <Row className="g-4 my-4">
            <StatCard
                title={t("adminHome.totalOrder")}
                value={dashboardData.weekOrder}
                icon={<FaBox size={32} className="text-white" />}
                iconBg="bg-warning"
                trend="up"
                trendValue="+1.3%"
                trendNote={t("adminHome.upFromLastWeek")}
            />

            <StatCard
                title={t("adminHome.totalSales")}
                value={t("currency", { value: dashboardData.weekSale })}
                icon={<FaChartLine size={32} className="text-white" />}
                iconBg="bg-success"
                trend="down"
                trendValue="-4.3%"
                trendNote={t("adminHome.downFromLastWeek")}
            />

            <Col md={6} lg={3}>
                <Card className="shadow-sm border-0 rounded-4 h-100">
                    <Card.Body className="d-flex flex-column gap-3">
                        <div className="fw-bold mb-0">{t("adminHome.bestSelling")}</div>
                        <div className="p-2 rounded-3 d-flex align-items-center justify-content-center">
                            <img
                                src={dashboardData.bestSellingObject?.image || ''}
                                alt="product imgage"
                                style={{ height: "80px", width: "100%", objectFit: "cover" }}
                            />
                        </div>
                        <h4 className="fw-bold mb-0">
                            {dashboardData.bestSellingObject?.name || t("adminHome.loading")}
                        </h4>
                    </Card.Body>
                </Card>
            </Col>

            <StatCard
                title={t("adminHome.cancelledOrders")}
                value={dashboardData.weekCancel}
                icon={<FaBan size={32} className="text-white" />}
                iconBg="bg-danger"
                trend="up"
                trendValue="+8.5%"
                trendNote={t("adminHome.upFromLastWeek")}
            />
        </Row>
    );

    const StatCard = ({ title, value, icon, iconBg, trend, trendValue, trendNote }) => (
        <Col md={6} lg={3}>
            <Card className="shadow-sm border-0 rounded-4 h-100">
                <Card.Body className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="fw-bold mb-0">{title}</div>
                        <div className={`p-2 rounded-3 d-flex align-items-center justify-content-center ${iconBg}`}>
                            {icon}
                        </div>
                    </div>
                    <h3 className="fw-bold mb-0">{value}</h3>
                    <div className="d-flex align-items-center gap-2">
                        {trend === 'up' ? <FaArrowUp className="text-success" /> : <FaArrowDown className="text-danger" />}
                        <span className={`fw-semibold ${trend === 'up' ? 'text-success' : 'text-danger'}`}>{trendValue}</span>
                        <span className="text-muted small">{trendNote}</span>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );

    const SalesChart = () => (
        <Card className="shadow-sm border-0 rounded-4 p-5 mt-4">
            <Row className="align-items-center mb-3">
                <Col>
                    <h5 className="fw-bold mb-0">{t("adminHome.salesDetails")}</h5>
                </Col>
                <Col xs="auto">
                    <Form.Select
                        size="sm"
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                    >
                        <option value="This Week">{t("adminHome.thisWeek")}</option>
                        <option value="This month">{t("adminHome.thisMonth")}</option>
                        <option value="This year">{t("adminHome.thisYear")}</option>
                    </Form.Select>
                </Col>
            </Row>

            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4e7cf3" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#4e7cf3" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis
                        tickFormatter={(val) => t("currency", { value: val })}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip formatter={(val) => t("currency", { value: val.toFixed(2) })} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#4e7cf3"
                        fillOpacity={1}
                        fill="url(#colorBlue)"
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );

    return (
        <div style={{ backgroundColor: '#F5F6FA' }}>
            <Container fluid>
                <Row>
                    <Col md={2} className="p-0" style={{ minHeight: "100vh" }}>
                        <AdminSidebar />
                    </Col>
                    <Col md={10} style={{ minHeight: "100vh" }}>
                        <AdminNav user={user} title={t("adminTitle.dashboard")} />
                        <DashboardStats />
                        <SalesChart />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
