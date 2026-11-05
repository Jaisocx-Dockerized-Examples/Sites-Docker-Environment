<?php

class Db
{
    const HOST = "mysql:host=localhost;dbname=jaisocx-com-website";
    const USER = "postgres";
    const PASS = "ZjKXwnjeA7EncPwFNyx4FPOwtCV3bpgZ";

    public function getConnection()
    {
        $dbh = new PDO(self::HOST, self::USER, self::PASS);
        return $dbh;
    }

    public function getConfigSpecMarkup_Domain() {
        $sql = "select * from `conf-xml-domains`";
        return $this->getConfigSpecMarkup($sql);
    }
    public function getConfigSpecMarkup_Jwt() {
        $sql = "select * from `conf-xml-jwt`";
        return $this->getConfigSpecMarkup($sql);
    }

    public function getConfigSpecMarkup_Alias() {
        $sql = "select * from `conf-xml-alias`";
        return $this->getConfigSpecMarkup($sql);
    }

    public function getConfigSpecMarkup($sql) {
        $dbh = $this->getConnection();
        $stmt = $dbh->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $markup = [];
        $markup[] = "<div class=\"config-nodes-container\">";
        $rowsCounter = 0;
        foreach ($result as $row) {
            if ($rowsCounter === 0) {
                $markup[] = "<div class=\"config-nodes-row config-table-header\">";
                foreach ($row as $fieldName => $value) {
                    $markup[] = "<div class=\"cell\"><span class=\"label\">$fieldName</span></div>";
                }
                $markup[] = "</div>";
            }
            $markup[] = "<div class=\"config-nodes-row\">";
            foreach ($row as $fieldName => $value) {
                $markup[] = "<div class=\"cell\"><span class=\"label\">$fieldName</span><span class=\"value\">$value</span></div>";
            }
            $markup[] = "</div>";
            $rowsCounter++;
        }
        $markup[] = "</div>";
        $dbh = null;
        $stmt = null;

        return join("\r\n", $markup);
    }
}