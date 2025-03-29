import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>最近72小时热点</CardTitle>
            <CardDescription>基于全网公开新闻分析</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI技术突破</span>
                <span className="text-muted-foreground text-sm">热度: 98%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">新能源发展</span>
                <span className="text-muted-foreground text-sm">热度: 85%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">全球经济趋势</span>
                <span className="text-muted-foreground text-sm">热度: 76%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
