<?php

/* A small self contained helper to build a bis Url in php, from params.
@eggpoolnet, from public domain code.

function create_url( $recipient, $amount, $operation, $openfield)

*/


abstract class BaseEncoder
{
    protected $options = [
        "characters" => Base85::ASCII85,
        "compress.spaces" => false,
        "compress.zeroes" => true,
        "prefix" => null,
        "suffix" => null,
    ];

    public function __construct($options = [])
    {
        $this->options = array_merge($this->options, (array) $options);
    }

    abstract public function encode($data);

    public function decode($data, $integer = false)
    {
        /* Extract data between prefix and suffix. */
        if ($this->options["prefix"] && $this->options["suffix"]) {
            $prefix = preg_quote($this->options["prefix"]);
            $suffix = preg_quote($this->options["suffix"]);
            preg_match("/$prefix(.*)$suffix/", $data, $matches);
            $data = $matches[1];
        }

        if ($this->options["compress.zeroes"]) {
            $data = str_replace("z", "!!!!!", $data);
        }

        if ($this->options["compress.spaces"]) {
            $data = str_replace("y", "+<VdL", $data);
        }

        $padding = 0;
        if ($modulus = strlen($data) % 5) {
            $padding = 5 - $modulus;
            $data .= str_repeat("u", $padding);
        }

        /* From group of five base85 characters convert back to uint32. */
        $digits =  str_split($data, 5);
        $converted = array_map(function ($value) {
            $accumulator = 0;
            foreach (unpack("C*", $value) as $char) {
                $accumulator = $accumulator * 85 + strpos($this->options["characters"], $char);
            }
            return pack("N", $accumulator);
        }, $digits);

        /* Remove any padding from the returned result. */
        $last = count($converted) - 1;
        if ($padding) {
            $converted[$last] = substr($converted[$last], 0, 4 - $padding);
        }

        if (true === $integer) {
            return array_values(unpack("N", implode($converted)))[0];
        }
        return implode($converted);
    }
}

///////

class PhpEncoder extends BaseEncoder
{
    public function encode($data)
    {
        /* If we got integer convert it to string. */
        if (is_integer($data)) {
            $data = pack("N", $data);
        };

        $padding = 0;
        if ($modulus = strlen($data) % 4) {
            $padding = 4 - $modulus;
        }
        $data .= str_repeat("\0", $padding);

        $converted = [$this->options["prefix"]];
        foreach (unpack("N*", $data) as $uint32) {
            /* Four spaces exception. */
            if ($this->options["compress.spaces"]) {
                if (0x20202020 === $uint32) {
                    $converted[] = "y";
                    continue;
                }
            }

            /* All zero data exception. */
            if ($this->options["compress.zeroes"]) {
                if (0x00000000 === $uint32) {
                    $converted[] = "z";
                    continue;
                }
            }

            $digits = "";
            $quotient = $uint32;
            foreach ([52200625, 614125, 7225, 85, 1] as $pow) {
                $reminder = $quotient % $pow;
                $quotient = (integer) ($quotient / $pow);
                $digits .= $this->options["characters"][$quotient];
                $quotient = $reminder;
            }

            $converted[] = $digits;
        }

        $last = count($converted) - 1;

        /* The z exception does not apply to the last block. */
        if ("z" === $converted[$last]) {
            $converted[$last] = "!!!!!";
        }

        /* Remove any padding from the returned result. */
        if ($padding) {
            $converted[$last] = substr($converted[$last], 0, 5 - $padding);
        }

        $converted[] = $this->options["suffix"];

        return implode($converted);
    }
}

///////
 class Base85
{
    /* Adobe ASCII85. Only all zero data exception, ignore whitespace. */
    /* https://www.adobe.com/products/postscript/pdfs/PLRM.pdf */
    const ASCII85 = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstu";
    /* https://rfc.zeromq.org/spec:32/Z85/ */
    const Z85 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-:+=^!/*?&<>()[]{}@%$#";
    /* https://tools.ietf.org/html/rfc1924 which is an Aprils fools joke. */
    const RFC1924 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~";
    private $options = [];
    private $encoder;
    public function __construct($options = [])
    {
        $this->options = array_merge($this->options, (array) $options);
        $this->encoder = new PhpEncoder($this->options);
    }
    public function encode($data)
    {
        return $this->encoder->encode($data);
    }
    public function decode($data, $integer = false)
    {
        return $this->encoder->decode($data, $integer);
    }
}


/////////////////////


function base85_encode($buffer) {
    $ascii85 = new Base85([
    "characters" => Base85::RFC1924,
    "compress.spaces" => false,
    "compress.zeroes" => false
]);

return $ascii85->encode($buffer);
    }

function checksum($string) {
    $m = hex2bin(md5($string));
    //print "digest $m\n";
    return base85_encode($m);
}


function create_url( $recipient, $amount, $operation, $openfield) {
    $command = "pay";
    $openfield_b85_encode = base85_encode($openfield);
    $operation_b85_encode = base85_encode($operation);
    $url_partial = "bis://$command/$recipient/$amount/$operation_b85_encode/$openfield_b85_encode/";
    $url_constructed = $url_partial.checksum($url_partial);
    return $url_constructed;
}

//print create_url("address", "10.0", "", "void");

?>
